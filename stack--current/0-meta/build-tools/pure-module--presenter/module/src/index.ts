/* PROMPT
 * ’
 */
import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'

import { setꓽpropertyⵧdeep } from '@offirmo-private/set-deep-property'
import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent
import { type Basename, type PureModuleDetails } from '@offirmo-private/pure-module--analyzer'
import { PkgInfosResolver } from '@offirmo-private/pkg-infos-resolver'

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

	/////////////////////////////////////////////////
	const ೱpromises: Array<Promise<void>> = []

	/////////////////////////////////////////////////
	// prepare: clean up

	const PURE_MODULE_CONTENT_RELPATH = path.basename(pure_module_path)
	const SRC_RELPATH = path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.main.path‿rel)
	const SRC_DIR_RELPATH = path.dirname(SRC_RELPATH)

	// out-of-source build (NOT working at the moment)
	if (isAncestorDir(dest_dir‿abspath, pure_module_details.root‿abspath)) {
		// the pure module is inside the target dir
		// do not remove any file
		// TODO one day clear everything except the pure-module
	}
	else {
		await fs.rm(dest_dir‿abspath, { recursive: true, force: true })
		await fs.mkdir(dest_dir‿abspath, { recursive: true })

		ೱpromises.push(
			fs.symlink(
				pure_module_details.root‿abspath,
				path.resolve(dest_dir‿abspath, PURE_MODULE_CONTENT_RELPATH),
				'dir'
			)
		)
	}

	/////////////////////////////////////////////////
	// create files
	function _schedule_root_file_creation(basename: Basename, content: string | object) {
		const target_file‿abspath = path.resolve(dest_dir‿abspath, basename)

		if (typeof content == 'string') {
			content = content.trimStart()
			if (!content.endsWith('\n')) content += '\n'

			ೱpromises.push(
				fs.writeFile(
					target_file‿abspath,
					content,
					{ encoding: 'utf-8' },
				)
			)
			return
		}

		ೱpromises.push(
			write_json_file(
				target_file‿abspath,
				content,
			)
		)
	}

	/* TODO only when more content than this
	_schedule_root_file_creation('README.md', `
# ${pure_module_details.fqname}

${pure_module_details.description || ''}
`.trim() + '\n,
		{ encoding: 'utf-8' },
	))
	*/

	// https://github.com/jonathaneunice/iterm2-tab-set
	// ?? can't find a reference to folder .tabset?
	// and it's set by the shortcut itself?
	// TODO review
	//_schedule_root_file_creation('.tabset', `tabset --badge $1 --color "#a4d4dd"`)
	ೱpromises.push(fs.rm(path.resolve(dest_dir‿abspath, '.tabset'), { force: true }))

	// tsconfig.json
	if (pure_module_details.languages.has('ts')) {
		_schedule_root_file_creation('tsconfig.json', {
			"extends": path.relative(dest_dir‿abspath, ts__config__path),
			"compilerOptions": {
				...(pure_module_details.engines['browser'] && { lib: [ "ES2024", "DOM" ] }),
				"pretty": true, // placeholder for adding stuff / helping diffs
			},
			"include": [
				path.relative(dest_dir‿abspath, ts__custom_types__path) + '/*.d.ts',
				`${PURE_MODULE_CONTENT_RELPATH}/**/*.ts`
			],
			"exclude": [
				'**/~~*/**/*',
			]
		})
	}
	else {
		ೱpromises.push(fs.rm(path.resolve(dest_dir‿abspath, 'tsconfig.json'), { force: true }))
	}

	if (pure_module_details.engines['browser']) {
		_schedule_root_file_creation('.parcelrc', {
			"extends": "@offirmo-private/parcel-config",
		})
	}
	else {
		ೱpromises.push(fs.rm(path.resolve(dest_dir‿abspath, '.parcelrc'), { force: true }))
	}

	if (pure_module_details.depsⵧvendored.size) {
		throw new Error(`Not implemented!`)
		// TODO link + declare in private entries
	}

	const packageᐧjson = await (async () => {
		const enginesⵧcleaned = Object.fromEntries(
			Object.entries(pure_module_details.engines)
				.filter(([k, v]) => {
					if (k === 'browser') {
						// not a formal engine
						// also Parcel complains about it
						return false
					}

					return true
				})
		)
		let pkg: any = {
			"name": pure_module_details.fqname,
			...(pure_module_details.description && {"description": pure_module_details.description}),
			"version": pure_module_details.version,
			"author": pure_module_details.author,
			"license": pure_module_details.license || 'Unlicense',
			...(pure_module_details.isꓽpublished ? {} : { "private": true}),

			...(Object.keys(enginesⵧcleaned).length && { engines: enginesⵧcleaned }),
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
			// ignoring vendored: to be copied, not declared

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
			throw new Error(`Optional deps not implemented!`)
		}

		pkg.scripts = (() => {
			const scripts: Record<string, string> = {}

			/////// order is important

			/////// Clean
			const monorepo_clean_targets = new Set<string>()
			if (pure_module_details.isꓽpublished) {
				monorepo_clean_targets.add('…dist')
			}
			if (pure_module_details.engines['browser']) {
				monorepo_clean_targets.add('…cache') // for Parcel
				monorepo_clean_targets.add('…dist') // as well, parcel outputs stuff in a dist dir when serving locally
			}
			if (monorepo_clean_targets.size) {
				scripts['_clean--pkg'] = `monorepo-script--clean-package ${Array.from(monorepo_clean_targets).join(' ')}`
			}

			const scriptsⵧclean = Object.keys(scripts)
				.filter(k => k.startsWith('clean') || k.startsWith('_clean'))
			if (scriptsⵧclean.length) {
				scripts['clean'] = `npm-run-all ${scriptsⵧclean.join(' ')}`
			}

			/////// Dev
			if (pure_module_details.hasꓽtestsⵧunit) {
				scripts['tests'] = // TODO one day discriminate between test types? --unit
					`node --experimental-strip-types ./node_modules/.bin/mocha -- --bail --config ./node_modules/@offirmo/unit-test-toolbox/module/mocharc.json ./node_modules/@offirmo/unit-test-toolbox/module/mocha-chai-init-node.mjs './${SRC_DIR_RELPATH}/**/*.tests.ts'`
					//  --experimental-require-module
			}

			if (pure_module_details.languages.has('ts')) {
				scripts['check--ts'] = `echo "${pure_module_details.fqname}" && tsc --noEmit`
				scripts['check--ts--watch'] = 'tsc --noEmit --watch'
				scripts['dev'] = scriptsⵧclean.length
					? `run-s clean check--ts--watch`
					: `run-s check--ts--watch`
			}
			else {
				//scripts['dev'] = TODO ??
			}

			if (pure_module_details.isꓽpublished) {
				// TODO one day "check--size" once this feature is resurrected
				scripts["ensure--size"] = "size-limit"
			}

			// TODO smoke tests

			const scriptsⵧchecks = Object.keys(scripts)
				.filter(k => k.startsWith('test') || k.startsWith('check'))
				.filter(k => !k.endsWith('--watch'))
				.sort()
				.reverse() // do that "test" is before "check"
			if (scriptsⵧchecks.length) {
				const name = pure_module_details.status === 'stable' // TODO improve this status check
					? 'check'
					: '_check'

				scripts[name] = `run-s ${scriptsⵧchecks.join(' ')}`
			}

			const PARCEL__COMMON_OPTIONS = [
				'--port 1981', // because parcel caches with bugs, so we can't have several running anyway
				'--lazy', // because faster
				'--no-autoinstall', // we don't want to auto-install anything, if missing = it's on us
				'--no-hmr', // because of bug https://github.com/parcel-bundler/parcel/issues/8181
			].join(' ')

			if (pure_module_details.hasꓽstories || pure_module_details.storypad) {
				assert(pure_module_details.storypad, `Expected storypad to be defined!`)
				scripts["_start:parcel:storypad"] = `parcel serve ${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.storypad.path‿rel)} ${PARCEL__COMMON_OPTIONS}`
				scripts['stories'] = `npm-run-all clean --parallel _start:parcel:storypad`
			}
			if (pure_module_details.demo) {
				switch (pure_module_details.demo.ext) {
					case '.ts': {
						scripts['demo'] = `node --experimental-strip-types ./${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.demo.path‿rel)}`
						break
					}

					case '.html': {
						scripts["_start:parcel:demo"] = `parcel serve ${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.demo.path‿rel)} ${PARCEL__COMMON_OPTIONS}`
						scripts['demo'] = `npm-run-all clean --parallel _start:parcel:demo`
						break
					}

					default:
						throw new Error(`Not implemented: demo with extension "${pure_module_details.demo.ext}"!`)
				}
			}
			if (pure_module_details.sandbox) {
				switch (pure_module_details.sandbox.ext) {
					case '.ts': {
						scripts['sandbox'] = `node --experimental-strip-types ./${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.sandbox.path‿rel)}`
						break
					}

					case '.html': {
						scripts["_start:parcel:sandbox"] = `parcel serve ${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.sandbox.path‿rel)} ${PARCEL__COMMON_OPTIONS}`
						scripts['sandbox'] = `npm-run-all clean --parallel _start:parcel:sandbox`
						break
					}

					default:
						throw new Error(`Not implemented: demo with extension "${pure_module_details.sandbox.ext}"!`)
				}
			}
			if (pure_module_details.main.ext === '.html') {
				scripts["_start:parcel:main"] = `parcel serve ${path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.main.path‿rel)} ${PARCEL__COMMON_OPTIONS}`
				scripts['start'] = `npm-run-all clean --parallel _start:parcel:main`
			}

			// build
			if (pure_module_details.isꓽpublished) {
				if (pure_module_details.languages.has('ts')) {
					scripts["_build:prod"] = "monorepo-script--build-typescript-package"
				}
			}
			const scriptsⵧbuild = Object.keys(scripts)
				.filter(k => k.startsWith('build') || k.startsWith('_build'))
			if (scriptsⵧbuild.length) {
				scripts['build'] = `run-p ${scriptsⵧbuild.join(' ')}`
			}

			// misc
			if (pure_module_details.isꓽpublished) {
				scripts["np"] = "np --no-publish"
				scripts["prepublishOnly"] = "run-s clean build ensure-size"
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

		Object.entries(pure_module_details._manifest._overrides?.files?.packageᐧjson || {}).forEach(([path, value]) => {
			pkg = setꓽpropertyⵧdeep(pkg, path, value)
		})

		return pkg
	})()
	_schedule_root_file_creation('package.json', packageᐧjson)

	if (pure_module_details.hasꓽtestsⵧunit) {
		_schedule_root_file_creation('webstorm--UT.run.xml', `
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
`)
	}

	if (pure_module_details.demo) {

		if (pure_module_details.demo.ext === '.ts') {
			_schedule_root_file_creation('webstorm--demo.run.xml', `
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
`)
		}

		if (pure_module_details.demo.ext === '.html') {
			// no extra file necessary
		}
	}

	await Promise.all(ೱpromises)
}

/////////////////////////////////////////////////

export {
	present,

	PkgInfosResolver,
}
