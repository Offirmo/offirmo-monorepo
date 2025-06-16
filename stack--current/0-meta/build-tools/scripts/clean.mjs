#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import meow from 'meow'
import stylize_string from 'chalk'

/////////////////////

const cli = meow('clean', {
	importMeta: import.meta,
})

/////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PKG_PATH = process.cwd()
const PKG_JSON = JSON.parse(await fs.readFile(path.join(PKG_PATH, 'package.json')))
const PKG_NAME = PKG_JSON.name

const MONOREPO_ROOT_PATH = path.join(__dirname, '../../..')

/////////////////////

//console.log({PKG_PATH, MONOREPO_ROOT_PATH})
console.log(`🧹  🔻 Cleaning ${stylize_string.bold(PKG_NAME)} [${cli.input}]...`)

function rm_folderⵧwith_trace(filepath) {
	console.debug(`     - "↳/${path.relative(MONOREPO_ROOT_PATH, filepath)}/"…`)
	return fs.rm(filepath, { recursive: true, force: true })
}

Promise.all(
		cli.input.map(dir => {
			switch(dir) {

				case '…dist':
					return Promise.all([
						rm_folderⵧwith_trace(path.join(PKG_PATH, 'dist')),
						rm_folderⵧwith_trace(path.join(PKG_PATH, 'public')),
					])

				case '…cache':
					return Promise.all([
						rm_folderⵧwith_trace(path.join(PKG_PATH, '.cache')), // parcel 1 ?
						rm_folderⵧwith_trace(path.join(PKG_PATH, 'node_modules/.cache')),
						rm_folderⵧwith_trace(path.join(PKG_PATH, '.parcel')), // parcel 1
						rm_folderⵧwith_trace(path.join(PKG_PATH, '.parcel-cache')), // parcel 2
						rm_folderⵧwith_trace(path.join(MONOREPO_ROOT_PATH, '.parcel-cache')), // parcel 2 shared cache which causes heaps of troubles in monorepos
					])

				default:
					return rm_folderⵧwith_trace(path.join(PKG_PATH, dir))
			}
		})
	)
	.then(() => console.log(`🧹  🔺 Cleaning ${stylize_string.bold(PKG_NAME)} [${cli.input}] done ✔`))
