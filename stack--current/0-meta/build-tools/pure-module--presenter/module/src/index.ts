/* PROMPT
 * ’
 */
import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent

import { getꓽpure_module_details, type PureModuleDetails } from '@offirmo-private/pure-module--analyzer'
import { PkgInfosResolver } from '@offirmo-private/pkg-infos-resolver'
import * as process from 'node:process'

/////////////////////////////////////////////////

function isAncestorDir(parent: string, child: string): boolean {
	const parentDirs = parent.split(path.sep).filter(dir => !!dir);
	const childDirs = child.split(path.sep).filter(dir => !!dir);
	return parentDirs.every((dir, i) => childDirs[i] === dir);
}

/////////////////////////////////////////////////

interface Params {
	pure_module_path: string
	pure_module_details: PureModuleDetails
	dest_dir: string
	git_root: string
	bolt_root: string
	ts__config__path: string
	ts__custom_types__path: string

	indent: string

	pkg_infos_resolver? : PkgInfosResolver
}

async function present({
	indent = '',

	pure_module_path,
	pure_module_details,
	dest_dir,

	git_root,
	bolt_root,
	ts__config__path,
	ts__custom_types__path,

	pkg_infos_resolver = new PkgInfosResolver()
}: Params) {
	const dest_dir‿abspath = path.resolve(dest_dir)
	assert(process.env['HOME'], `$HOME is expected to be set!`)
	const dest_dir__from_HOME‿rel = path.relative(process.env['HOME'], dest_dir‿abspath)
	console.log(`${indent}🗃  exposing pure code module to "${dest_dir‿abspath}"…`)

	if (isAncestorDir(pure_module_details.root‿abspath, dest_dir‿abspath)) {
		throw new Error(`Out-of-source build cannot target inside the pure-module!`)
	}

	if (pure_module_details._manifest?._dontꓽpresent) {
		console.log(`${indent}marked as "do not present", skipping`)
		return
	}

	// TODO one day if public, re-instate pre-build?
	// TODO one day add "size-limit"? to all?
	/*
"clean": "monorepo-script--clean-package …dist",
"_build:dev:watch": "monorepo-script--build-typescript-package --watch",
"_build:prod": "monorepo-script--build-typescript-package",
"dev": "run-s clean _build:dev:watch",
"build": "run-s  clean _build:prod",
"ensure-size": "size-limit",
"prepublishOnly": "run-s build ensure-size"
	*/

	const promises: Array<Promise<void>> = []

	const PURE_MODULE_CONTENT_RELPATH = path.basename(pure_module_path)

	// out-of-source build (NOT working at the moment)
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

	/* TODO only when more content than this
	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, 'README.md'),
		`
# ${pure_module_details.fqname}

${pure_module_details.description || ''}
`.trim() + '\n,
		{ encoding: 'utf-8' },
	))
	*/

	// TODO .tabset with auto color
	//tabset --badge $1 --color "#a4d4dd"

	const SRC_RELPATH = path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.main.path‿rel)
	const SRC_DIR_RELPATH = path.dirname(SRC_RELPATH)

	if (pure_module_details.languages.has('ts')) {
		promises.push(write_json_file(
			path.resolve(dest_dir‿abspath, 'tsconfig.json'),
			{
				"extends": path.relative(dest_dir‿abspath, ts__config__path),
				"compilerOptions": {
					"pretty": true, // placeholder for adding stuff / helping diffs
				},
				"include": [
					path.relative(dest_dir‿abspath, ts__custom_types__path) + '/*.d.ts',
					`${SRC_DIR_RELPATH}/**/*.ts`
				]
			}
		))
	}
	else {
		promises.push(fs.rm(path.resolve(dest_dir‿abspath, 'tsconfig.json'), { force: true }))
	}

	if (pure_module_details.depsⵧvendored.size) {
		throw new Error(`Not implemented!`)
		// TODO link + declare in private entries
	}

	const packageᐧjson = await (async () => {
		const pkg: any = {
			"name": pure_module_details.fqname,
			...(pure_module_details.description && {"description": pure_module_details.description}),
			"version": pure_module_details.version,
			"author": pure_module_details.author,
			"license": pure_module_details.license || 'Unlicense',
			...(pure_module_details.isꓽpublished ? {} : { "private": true}),

			"sideEffects": pure_module_details.hasꓽside_effects,
			"type": "module",
			"exports": {
				".": './' + SRC_RELPATH,
			},
			"source": SRC_RELPATH,
		}

		const all_declared_deps: Set<string> = (new Set<string>())
			.union(pure_module_details.depsⵧnormal)
			.union(pure_module_details.depsⵧdev)
			.union(pure_module_details.depsⵧpeer)
			.union(pure_module_details.depsⵧoptional)
			// vendored are copied, not declared

		Array.from(all_declared_deps.values()).forEach(dep => pkg_infos_resolver.preload(dep))
		await pkg_infos_resolver.all_pending_loaded()

		if (pure_module_details.depsⵧpeer.size) {
			pkg.peerDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧpeer).sort().map(dep => [dep, pkg_infos_resolver.ǃgetꓽversionⵧfor_dep(dep)])
			)
		}

		pkg.dependencies = Object.fromEntries(
			Array.from(pure_module_details.depsⵧnormal).sort().map(dep => [dep, pkg_infos_resolver.ǃgetꓽversionⵧfor_dep(dep)])
		)
		if (pure_module_details.depsⵧoptional.size) {
			throw new Error(`Not implemented!`)
		}

		pkg.scripts = (() => {
			const scripts: Record<string, string> = {}

			// aggregs
			const scriptsⵧclean = Object.keys(scripts).filter(k => k.startsWith('clean'))
			if (scriptsⵧclean.length) {
				scripts['clean'] = `npm-run-all ${scriptsⵧclean.join(' ')}`
			}

			if (pure_module_details.hasꓽtestsⵧunit) {
				scripts['test--unit'] =
					`node --experimental-strip-types ./node_modules/.bin/mocha -- --bail --config ./node_modules/@offirmo/unit-test-toolbox/mocharc.json ./node_modules/@offirmo/unit-test-toolbox/mocha-chai-init-node.mjs './${SRC_DIR_RELPATH}/**/*.tests.ts'`
					//  --experimental-require-module
			}

			if (pure_module_details.languages.has('ts')) {
				scripts['test--ts'] = `echo "${pure_module_details.fqname}" && tsc --noEmit`
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
				const name = pure_module_details.status === 'stable' // TODO improve status check
					? 'test'
					: '_test'

				scripts[name] = `run-s ${scriptsⵧtest.join(' ')}`
			}

			return scripts
		})()

		if (pure_module_details.depsⵧdev.size) {
			pkg.devDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧdev).sort().map(dep => [dep, pkg_infos_resolver.ǃgetꓽversionⵧfor_dep(dep)])
			)
		}

		if (pure_module_details.isꓽpublished) {
			pkg.repository = `https://github.com/Offirmo/offirmo-monorepo/tree/main/` + path.relative(git_root, dest_dir‿abspath)
			pkg.homepage = pkg.repository + '/README.md'
			pkg.bugs = {
				url: 'https://github.com/Offirmo/offirmo-monorepo/issues'
			}
			pkg.files = [ 'dist', 'module' ]
		}

		return pkg
	})()
	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'package.json'), packageᐧjson
	))


	const webstorm__run_configⵧUT = `
<component name="ProjectRunConfigurationManager">
	<configuration default="false" name="${pure_module_details.fqname} -- UT" type="mocha-javascript-test-runner">
		<node-interpreter>$USER_HOME$/.nvm/versions/node/v${process.versions.node}/bin/node</node-interpreter>
		<node-options>--experimental-strip-types</node-options>
		<mocha-package>$USER_HOME$/${path.relative(process.env['HOME'], path.resolve(bolt_root))}/node_modules/mocha</mocha-package>
		<working-directory>$USER_HOME$/${dest_dir__from_HOME‿rel}</working-directory>
		<pass-parent-env>true</pass-parent-env>
		<ui>bdd</ui>
		<extra-mocha-options>--bail</extra-mocha-options>
		<test-kind>PATTERN</test-kind>
		<test-pattern>./module/**/*tests.ts</test-pattern>
		<method v="2" />
	</configuration>
</component>
`
	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, 'webstorm--UT.run.xml'),
		webstorm__run_configⵧUT,
		{ encoding: 'utf-8' }
	))

	if (pure_module_details.demo) {
		// 		nameIsGenerated="false"
		const webstorm__run_configⵧdemo = `
<component name="ProjectRunConfigurationManager">
	<configuration default="false"
		name="${pure_module_details.fqname} -- Demo"
		type="NodeJSConfigurationType"
		path-to-node="$USER_HOME$/.nvm/versions/node/v${process.versions.node}/bin/node"
		node-parameters="--experimental-strip-types"
		path-to-js-file="${path.relative(dest_dir, pure_module_details.demo.path‿abs)}"
		working-dir="$USER_HOME$/${dest_dir__from_HOME‿rel}">
		<method v="2" />
	</configuration>
</component>
`
		promises.push(fs.writeFile(
			path.resolve(dest_dir‿abspath, 'webstorm--demo.run.xml'),
			webstorm__run_configⵧdemo,
			{ encoding: 'utf-8' }
		))
	}
}

/////////////////////////////////////////////////

export {
	present,

	PkgInfosResolver,
}
