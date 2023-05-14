#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --experimental-import-meta-resolve "$0" "$@"
'use strict';

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { promises as fs } from 'node:fs'

import meow from 'meow'
import stylize_string from 'chalk'
import assert from 'tiny-invariant'

import tsc from 'node-typescript-compiler'

/////////////////////

const cli = meow('build', {
	importMeta: import.meta,
	flags: {
		module: {
			type: 'string',
			isMultiple: true,
			choices: ['esm', 'cjs'],
			default: ['esm', 'cjs'], // by default this script builds all of those
		},
		watch: {
			// if true, only the first "module" is built and continuously rebuilt
			type: 'boolean',
			default: false,
		},
	},
})

/////////////////////

// [Last updated 2022/11](update marker)
// note: we could object to this info being duplicated here from tsconfig
// but it's better semantic (hard to comment in tsconfig)
const LATEST_ES_OLDEST_ACTIVE_NODE_LTS = 'ES2022' // should be <= LATEST_CONVENIENT_ES
const LATEST_ES_MODULES = 'ES2022'
// "NodeNext" is recommended by https://2ality.com/2021/06/typescript-esm-nodejs.html
// XXX "NodeNext" is an "intelligent" setting that also affects module resolution https://www.typescriptlang.org/tsconfig#node16nodenext-nightly-builds
/////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PKG_PATH = process.cwd()
const DIST_DIR = path.join(PKG_PATH, 'dist')
const PKG_JSON = JSON.parse(await fs.readFile(path.join(PKG_PATH, 'package.json')))
const PKG_NAME = PKG_JSON.name
console.log(`🛠  🔻 building ${stylize_string.bold(PKG_NAME)}…` + (cli.flags.watch ? ' (watch mode)' : ''))

const LOCAL_TSCONFIG_JSON = await (async () => {
	const tsconfig_path = path.join(PKG_PATH, 'tsconfig.json')
	try {
		return JSON.parse(await fs.readFile(tsconfig_path))
	}
	catch (err) {
		console.error('ERROR when loading then parsing PKG tsconfig.json', { tsconfig_path })
		throw err
	}
})()
LOCAL_TSCONFIG_JSON.compilerOptions = LOCAL_TSCONFIG_JSON.compilerOptions || {}
assert(!LOCAL_TSCONFIG_JSON.compilerOptions.target, 'local tsconfig should not override "target"')
assert(!LOCAL_TSCONFIG_JSON.compilerOptions.module, 'local tsconfig should not override "module"')

const ROOT_TSCONFIG_JSON = await (async () => {
	const tsconfig_path = path.join(__dirname, '..', '..', 'tsconfig.json')
	try {
		return JSON.parse(await fs.readFile(tsconfig_path))
	}
	catch (err) {
		console.error('ERROR when loading then parsing ROOT tsconfig.json', { tsconfig_path })
		throw err
	}
})()
const LATEST_CONVENIENT_ES = ROOT_TSCONFIG_JSON.compilerOptions.target
assert(ROOT_TSCONFIG_JSON.compilerOptions.lib.includes(LATEST_CONVENIENT_ES), 'root tsconfig and this script should be in sync: lib')
assert(ROOT_TSCONFIG_JSON.compilerOptions.module === LATEST_ES_MODULES, 'root tsconfig and this script should be in sync: module')

/////////////////////

let compilerOptions = {
	// no need, automatically picked from closest tsconfig.json
	//...ROOT_TSCONFIG_JSON.compilerOptions

	//listFiles: true,
	//listEmittedFiles: true,
}

/////////////////////

function build_cjs() {
	const target = LATEST_ES_OLDEST_ACTIVE_NODE_LTS.toLowerCase()
	const out_dir = `src.${target}.cjs`
	console.log(`      building CJS into ${PKG_NAME}/dist/${stylize_string.bold(out_dir)}`/*, ROOT_TSCONFIG_JSON, LOCAL_TSCONFIG_JSON*/)
	return tsc.compile(
		{
			...compilerOptions,
			target,
			lib: [
				LATEST_ES_OLDEST_ACTIVE_NODE_LTS,
				...[
					...ROOT_TSCONFIG_JSON.compilerOptions.lib,
					...(LOCAL_TSCONFIG_JSON.compilerOptions.lib || []),
				].filter(s => s !== LATEST_CONVENIENT_ES),
			],
			module: 'commonjs', // cf. https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#type-in-package-json-and-new-extensions
			outDir: path.join(DIST_DIR, out_dir),
			project: PKG_PATH,
		},
		null,
		{
			banner: `(from build-typescript.js) node-typescript-compiler compiling ${PKG_NAME} to dist/${out_dir}...`
		},
	)
}

function build_esm() {
	const target = ROOT_TSCONFIG_JSON.compilerOptions.target.toLowerCase()
	const out_dir = `src.${target}.esm` //
	console.log(`      building ESM into ${PKG_NAME}/dist/${stylize_string.bold(out_dir)}`)
	return tsc.compile(
		{
			...compilerOptions,
			outDir: path.join(DIST_DIR, out_dir),
			project: PKG_PATH,
		},
		null,
		{
			banner: `(from build-typescript.js) node-typescript-compiler compiling ${PKG_NAME} to dist/${out_dir}...`
		},
	)
}

/////////////////////

//console.log({PKG_PATH, DIST_DIR, PKG_NAME, flags: cli.flags})

// build sequentially to not duplicate the errors if any.
// CJS is usable in both node and bundled frontend,
// thus we build only this one in watch = dev mode.
// (update marker) as of 2022/05 the ecosystem (typescript) is not ready for pure ESM
Promise.resolve()
	.then(() => {
		if (cli.flags.watch) {
			compilerOptions = {
				...compilerOptions,

				watch: true,

				// it's dev mode, relax a bit:
				noUnusedLocals: false,
				noUnusedParameters: false,
				allowUnreachableCode: true,
				jsx: 'react-jsxdev',
			}

			// watch = single mode
			switch(cli.flags.module[0]) {
				case 'esm':
					return build_esm()
				case 'cjs':
					return build_cjs()
				default:
					throw new Error(`Unknown param --module="${cli.flags.module}"!`)
			}
		}
	})
	.then(() => {
		if (cli.flags.watch) return
		if (!cli.flags.module.includes('esm')) return

		return build_esm()
	})
	.then(() => {
		if (cli.flags.watch) return
		if (!cli.flags.module.includes('cjs')) return

		return build_cjs()
	})
	.then(() => console.log(`🛠  🔺 building ${stylize_string.bold(PKG_NAME)} done ✔`))
	/*.catch(err => {
		process.exit(-1)
	})*/
