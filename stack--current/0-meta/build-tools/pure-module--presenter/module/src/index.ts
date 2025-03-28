/* PROMPT
 * ’
 */
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent
import packageJson from 'package-json'
import semver from 'semver'

import { getꓽpure_module_details, type PureModuleDetails } from '@offirmo-private/pure-module--analyzer'

import { PkgVersionResolver } from './pkg-version-resolver/index.ts'

/////////////////////////////////////////////////

function isAncestorDir(parent: string, child: string): boolean {
	const parentDirs = parent.split(path.sep).filter(dir => !!dir);
	const childDirs = child.split(path.sep).filter(dir => !!dir);
	return parentDirs.every((dir, i) => childDirs[i] === dir);
}

/////////////////////////////////////////////////

interface Params {
	pure_module_path: string
	pure_module_details?: PureModuleDetails
	dest_dir: string
	ts__config__path: string
	ts__custom_types__path: string

	indent: string

	pkg_version_resolver? : PkgVersionResolver
}
async function present({
	indent = '',

	pure_module_path,
	pure_module_details = getꓽpure_module_details(pure_module_path, { indent }),

	dest_dir,
	ts__config__path,
	ts__custom_types__path,

	pkg_version_resolver = new PkgVersionResolver()
}: Params) {
	const dest_dir‿abspath = path.resolve(dest_dir)
	console.log(`${indent}🗃  exposing pure code module to "${dest_dir‿abspath}"…`)

	if (isAncestorDir(pure_module_details.root‿abspath, dest_dir‿abspath)) {
		throw new Error(`Out-of-source build cannot target inside the pure-module!`)
	}

	// TODO one day if public, pre-build?
	// TODO one day add "size-limit"? to all?
	/*
"_build:prod": "monorepo-script--build-typescript-package",
"ensure-size": "size-limit",
"build": "run-s  clean _build:prod",
"prepublishOnly": "run-s build ensure-size"
	*/

	const promises: Array<Promise<void>> = []

	const PURE_MODULE_CONTENT_RELPATH = path.basename(pure_module_path)

	if (isAncestorDir(dest_dir‿abspath, pure_module_details.root‿abspath)) {
		// the pure module is inside the target dir
		// do not remove any file
		// TODO one day clear everything except the pure-module
	}
	else {
		await fs.rm(dest_dir‿abspath, { recursive: true, force: true })
		await fs.mkdir(dest_dir‿abspath, { recursive: true })

		promises.push(
			fs.symlink(
				pure_module_details.root‿abspath,
				path.resolve(dest_dir‿abspath, PURE_MODULE_CONTENT_RELPATH),
				'dir'
			)
		)
	}

	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, '.npmrc'),
		`
registry=https://registry.npmjs.org/
package-lock=false
`.trimStart(),
		{ encoding: 'utf-8' },
	))

	const npm_module_fqname = pure_module_details.namespace + '/' + pure_module_details.name

	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, 'README.md'),
		`
# ${npm_module_fqname}

${pure_module_details.description || 'TODO description in MANIFEST.json5'}
`.trimStart(),
		{ encoding: 'utf-8' },
	))

	const SRC_RELPATH = path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.source.path‿rel)
	const SRC_DIR_RELPATH = path.dirname(SRC_RELPATH)

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'tsconfig.json'),
		{
			"extends": path.relative(dest_dir‿abspath, ts__config__path),
			"include": [
				path.relative(dest_dir‿abspath, ts__custom_types__path) + '/*.d.ts',
				`${SRC_DIR_RELPATH}/**/*.ts`
			]
		}
	))


	if (pure_module_details.depsⵧvendored.size) {
		throw new Error(`Not implemented!`)
		// TODO link + declare in private entries
	}

	const packageᐧjson = await (async () => {
		const pkg: any = {
			"name": npm_module_fqname,
			...(pure_module_details.description && {"description": pure_module_details.description}),
			"version": pure_module_details.version,
			"author": pure_module_details.author,
			"license": pure_module_details.license,
			...(pure_module_details.isꓽpublished ? {} : { "private": true}),

			"sideEffects": pure_module_details.hasꓽside_effects,
			"type": "module",
			"exports": {
				".": {
					"import": './' + SRC_RELPATH,
				}
			},
				"source": SRC_RELPATH,
			}

		const all_declared_deps: Set<string> = (new Set<string>())
			.union(pure_module_details.depsⵧnormal)
			.union(pure_module_details.depsⵧdev)
			.union(pure_module_details.depsⵧpeer)
			.union(pure_module_details.depsⵧoptional)
			// vendored are copied, not declared

		Array.from(all_declared_deps.values()).forEach(dep => pkg_version_resolver.preload(dep))
		await pkg_version_resolver.all_pending_loaded()

		if (pure_module_details.depsⵧpeer.size) {
			pkg.peerDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧpeer).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
			)
		}

		pkg.dependencies = Object.fromEntries(
			Array.from(pure_module_details.depsⵧnormal).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
		)
		if (pure_module_details.depsⵧoptional.size) {
			throw new Error(`Not implemented!`)
		}

		pkg.scripts = (() => {
			const scripts: Record<string, string> = {}

			// aggregs
			const scriptsⵧclean = Object.keys(scripts).filter(k => k.startsWith('clean'))
			if (scriptsⵧclean.length) {
				scripts.clean = `npm-run-all ${scriptsⵧclean.join(' ')}`
			}

			if (pure_module_details.hasꓽtestsⵧunit) {
				scripts['test--unit'] =
					`node --experimental-strip-types ./node_modules/.bin/mocha -- --bail --config ./node_modules/@offirmo/unit-test-toolbox/mocharc.json ./node_modules/@offirmo/unit-test-toolbox/mocha-chai-init-node.mjs './${SRC_DIR_RELPATH}/**/*.tests.ts'`
					//  --experimental-require-module
			}

			if (pure_module_details.languages.has('ts')) {
				scripts['test--ts'] = 'tsc --noEmit'
				scripts['test--ts--watch'] = 'tsc --noEmit --watch'
				scripts['dev'] = scriptsⵧclean.length
					? `run-s clean test--ts--watch`
					: `run-s test--ts--watch`
			}
			if (pure_module_details.demo) {
				scripts['demo'] = `node --experimental-strip-types ./${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.demo.path‿rel)}`
			}

			const scriptsⵧtest = Object.keys(scripts).filter(k => k.startsWith('test') && !k.endsWith('--watch'))
			if (scriptsⵧtest.length) {
				scripts['test'] = `run-s ${scriptsⵧtest.join(' ')}`
			}

			return scripts
		})()

		if (pure_module_details.depsⵧdev.size) {
			pkg.devDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧdev).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
			)
		}

		return pkg
	})()

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'package.json'), packageᐧjson
	))
}

/////////////////////////////////////////////////

export {
	present,

	PkgVersionResolver,
}
