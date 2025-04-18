import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs'
import { isBuiltin as isBuiltInNodeModule } from 'node:module'

// @ts-ignore
import walk from 'ignore-walk'
// @ts-ignore
import JSON5 from 'json5'

import { parse as parseImports } from 'parse-imports-ts'
import { writeJsonFile as write_json_file } from 'write-json-file'

import { PkgInfosResolver } from '@offirmo-private/pkg-infos-resolver'

import type {
	AbsolutePath,
	AnyPath,
	ProgLang,
	Dependency,
	DependencyType,
} from './types'

import {
	type FileEntry,
	createꓽfile_entry,
	updateꓽfile_entry,
} from './file-entry/index.ts'

import {
	type PureModuleDetails,
	create as _createꓽresult,
	updateⵧfrom_manifest,
} from './pure-module-details/index.ts'

/////////////////////////////////////////////////

const MANIFEST‿basename = 'MANIFEST.json5'

/////////////////////////////////////////////////

function isꓽin_ignored_folder(entry: FileEntry): boolean {
	const { path‿rel } = entry

	if (path‿rel.includes('node_modules/'))
		throw new Error(`A pure module should not contain node_modules!`)

	if (path‿rel.includes('tosort'))
		return true

	// vendored deps are supposed to have no deps
	if (path‿rel.includes('__vendored/'))
		return true

	return false
}

function isꓽin_unstructured_folder(entry: FileEntry): boolean {
	const { path‿rel } = entry

	if (path‿rel.includes('~~')) // means unstructured
		return true

	return false
}


function isꓽignored_file(entry: FileEntry): boolean {
	if (entry.basename === '.DS_Store') {
		// TODO one day load from gitignore
		return true
	}

	if (entry.basename.toUpperCase() === 'LICENSE') {
		// license override for a sub-folder, ignore
		return true
	}

	/*if (entry.basename === '.gitignore') {
		// ???
		return true
	}*/

	if ([
		// BINARY assets = leaf nodes (no deps)
		'.jpg',
		'.mp3',
		'.otf',
		'.png',
		'.ttf',
		'.webp',
		'.woff',
		// do NOT add .svg, this is source code with deps!
		].includes(entry.ext)) {
		return true
	}

	if (entry.ext === '.svg') {
		// technically an SVG can
		// - reference resources
		// - embed HTML itself referencing other resources
		// However for now we consider no deps
		// TODO one day use parcel for such cases
		return true
	}

	if (entry.ext === '.md') {
		// technically a markdown file can reference resources
		// ex. static website
		// However for now we consider no deps
		// TODO one day use parcel for such cases
		return true
	}

	if (entry.ext === '.json') {
		// technically some json files can reference resources
		// ex. website manifest
		// However for now we consider no deps
		// TODO one day use parcel for such cases
		return true
	}

	// no txt -> use another format

	return false
}

function getꓽProgLangs(entry: FileEntry): ProgLang[] {
	const { ext } = entry
	switch(true) {
		case ['.js', '.mjs'].includes(ext): // TODO remove mjs, tolerated for node-typescript-compiler
			return [ 'js' ]

		case ['.jsx'].includes(ext):
			return [ 'js', 'jsx' ]

		case ['.json'].includes(ext):
			return [ 'json' ]

		case ['.ts'].includes(ext): // mts sometimes needed for node scripts
			return [ 'ts' ] // TODO should we add js? Technically true...

		case ['.tsx'].includes(ext):
			return [ 'ts', 'jsx' ]

		case ['.html'].includes(ext):
			return [ 'html' ]

		case ['.css'].includes(ext):
			return [ 'css' ]

		case ['.md'].includes(ext):
			return [ 'md' ]

		case ['.mdx'].includes(ext):
			return [ 'md', 'jsx' ]

		/*case ['.json',].includes(ext):
			return [ 'json' ]*/

		default:
			throw new Error(`Unsupported language for extension "${ext}" (${entry.basename})!`)
	}
}

// examples ? demo?
function inferꓽdeptype_from_caller(entry: FileEntry): DependencyType {
	let { path‿rel, extⵧsub } = entry
	path‿rel = '/' + path‿rel

	if (path‿rel.includes('/__'))
		return 'dev'

	if (path‿rel.includes('/##'))
		return 'dev'

	if (extⵧsub === '.tests')
		return 'dev'
	if (extⵧsub === '.stories')
		return 'dev'
	if (extⵧsub === '.typecheck')
		return 'dev'

	return 'normal'
}

/////////////////////////////////////////////////

function assertꓽmigrated(entry: FileEntry, { indent = '', root‿abspath }: { indent?: string, root‿abspath: AbsolutePath}): void {
	let migration_target : AbsolutePath | null = null

	const { path‿abs, basename‿noext, ext, extⵧextended } = entry

	if (basename‿noext.endsWith('_spec')) {
		migration_target = path‿abs.replace('_spec', '.tests')
	}
	else if (extⵧextended.startsWith('.spec')) {
		migration_target = path‿abs.replace('.spec', '.tests')
	}

	if (basename‿noext.toUpperCase() === 'LICENSE' && ext) {
		migration_target = path.join(path.dirname(entry.path‿abs), 'LICENSE') // official name is uppercase without extension TODO link
	}

	if ([
		'.cjs', '.cts', '.htm', '.markdown',
	].includes(ext)) {
		console.log(`Please normalize this file:`)
		throw new Error(`Using outdated extension "${ext}"!`)
	}

	if (migration_target) {
		console.log(`Auto normalizing file:`)
		console.log(`mv "${path.relative(root‿abspath, path‿abs)}" "${path.relative(root‿abspath, migration_target)}"`)
		fs.renameSync(path‿abs, migration_target)

		updateꓽfile_entry(entry, migration_target, root‿abspath)
	}
}

function assertꓽnormalized(entry: FileEntry, { indent = ''} = {}): void {
	if (entry.path‿rel.includes(' ')) {
		throw new Error(`Spaces in path!`)
	}
	if (entry.extⵧextended.toLowerCase() !== entry.extⵧextended) {
		throw new Error(`Non-lowercase extension!`)
	}

	// TODO UTF-8 etc
}

/////////////////////////////////////////////////

interface Options {
	indent: string
	getꓽdefault_namespace: (details_so_far: PureModuleDetails) => PureModuleDetails['namespace'],
	pkg_infos_resolver: PkgInfosResolver,
}

async function getꓽpure_module_details(module_path: AnyPath, options: Partial<Options> = {}): Promise<PureModuleDetails> {
	const {
		indent = '',
		getꓽdefault_namespace = () => { throw new Error(`getꓽdefault_namespace() not provided!`) },
		pkg_infos_resolver = new PkgInfosResolver(),
	} = options

	const root‿abspath = path.resolve(module_path)
	console.log(`${indent}🗂  analysing pure code module at "${root‿abspath}"…`)

	const files = (walk.sync({
			path: root‿abspath,
			ignoreFiles: [ '.gitignore' ],
		}) as Array<string>)
		.map(p => path.resolve(root‿abspath, p))
		.sort()
	//const files = lsFilesRecursiveSync(root‿abspath) <- old version

	const file_entries: Array<FileEntry> = files
		.map(path‿abs => createꓽfile_entry(path‿abs, root‿abspath))
	console.log(`${indent}   found #${file_entries.length} file(s)…`)

	const result = _createꓽresult(root‿abspath)

	// init from the manifest
	// must be done as early as possible
	const entryⵧmanifest: FileEntry = await (async () => {
		const candidate = file_entries.find(({basename}) => basename === MANIFEST‿basename)
		if (candidate)
			return candidate

		// MIGRATION
		// NOTE: yes, this is a side effect in a read function, but it's a good one 😅
		// needed. build it from existing package.json

		const package_json_path = path.dirname(root‿abspath) + '/package.json'
		let packageᐧjson: any = '{}'
		try {
			packageᐧjson = fs.readFileSync(package_json_path, { encoding: 'utf-8' })
		}
		catch (err) {
			// it's totally ok to not have a package.json
			// ex. brand new package
		}
		packageᐧjson = JSON.parse(packageᐧjson)

		const data: any = (() => {
			if (Object.keys(packageᐧjson).length === 0)
				return {}

			const status = packageᐧjson.name?.includes('sandbox')
				? 'sandbox'
				: 'stable'

			const [ namespace = undefined, name = undefined ] = packageᐧjson.name?.split('/') || []

			return {
				...(namespace !== getꓽdefault_namespace({
					...result,
					isꓽpublished: !packageᐧjson.private,
				}) && { namespace }),
				...(name !== result.name && { name }),
				...(packageᐧjson.license !== result.license && { license: packageᐧjson.license}),
				...(packageᐧjson.version !== '0.0.1' && { version: packageᐧjson.version}),
				description: packageᐧjson.description || 'TODO description in MANIFEST.json5',
				...(!packageᐧjson.private && { isꓽpublished: true }),
				...(packageᐧjson.sideEffects && { hasꓽside_effects: true }),
				...(status !== 'stable' && { status }),
				...(packageᐧjson.engines && { engines: packageᐧjson.engines }),
			}
		})()

		const target_path = path.resolve(root‿abspath, MANIFEST‿basename)
		await write_json_file(target_path, data)
		return createꓽfile_entry(target_path, root‿abspath)
	})()
	const _manifest = JSON5.parse(fs.readFileSync(entryⵧmanifest.path‿abs, 'utf8'))
	updateⵧfrom_manifest(result, _manifest)

	/////////////////////////////////////////////////

	// start aggregating
	// we need the fully qualified name of the module
	result.namespace = getꓽdefault_namespace(result)
	result.fqname = result.namespace + '/' + result.name

	const pending_promises: Array<Promise<void>> = []
	const raw_deps: Array<Dependency> = []

	// HERE MAIN LOOP
	file_entries.forEach(entry => {
		let isꓽignored = isꓽin_ignored_folder(entry) || isꓽignored_file(entry)
		const { path‿rel } = entry
		console.log(
			`${indent} ↳ 📄`, path‿rel,
			isꓽignored ? '🚫' : '',
			//entry.extⵧsub, entry.ext, entry.extⵧextended,
		)

		if (!isꓽignored) {
			assertꓽmigrated(entry, { indent, root‿abspath })
			isꓽignored = isꓽignored_file(entry) // update bc can become ignored after migration
			if (isꓽignored) console.log(`${indent}      migrated, now 🚫`)
		}

		if (isꓽignored) {
			return
		}
		else if (isꓽin_unstructured_folder(entry)) {
			// we'll ignore as well but still eligible for a restricted set of things

			if (!result.demo) {
				if (entry.basename‿noext === 'demo'
					|| (path.basename(path.dirname(path‿rel)).includes('demo') && entry.basename‿noext === 'index')) {
					assertꓽnormalized(entry)
					console.log(`${indent}    ⭐️new candidate for: demo`)
					result.demo = entry
				}
			}

			if (!result.sandbox) {
				if (entry.basename‿noext === 'sandbox'
				|| (path.basename(path.dirname(path‿rel)).includes('sandbox') && entry.basename‿noext === 'index')) {
					assertꓽnormalized(entry)
					console.log(`${indent}    ⭐️new candidate for: sandbox`)
					result.sandbox = entry
				}
			}

			return
		}

		assertꓽnormalized(entry)

		// main
		if (entry.basename‿noext !== 'MANIFEST') {
			// manifest is a false positive (short and at the root) and should be ignored
			// priority order:
			// - shortest / top file has priority
			// - index has priority over not index
			result.main ||= entry
			const current_is_index = result.main.basename‿noext === 'index'
			const candidate_is_index = entry.basename‿noext === 'index'
			if (candidate_is_index !== current_is_index) {
				if (candidate_is_index) {
					result.main = entry
					console.log(`${indent}    ⭐️new candidate for: main`)
				}
			}
			else {
				// both are index or both are not
				if (entry.path‿rel.length < result.main.path‿rel.length) {
					console.log(`${indent}    ⭐️new candidate for: main`)
					result.main = entry
				}
			}
		}

		if (entry.basename‿noext === 'demo') {
			console.log(`${indent}    ⭐️new candidate for: demo`)
			result.demo = entry
		}
		if (path.basename(path.dirname(path‿rel)).includes('demo')
			&& entry.basename‿noext === 'index') {
			if (!result.demo) {
				console.log(`${indent}    ⭐️new candidate for: demo`)
				result.demo = entry
			}
		}

		if (entry.basename‿noext === 'sandbox') {
			console.log(`${indent}    ⭐️new candidate for: sandbox`)
			result.sandbox = entry
		}
		if (path.basename(path.dirname(path‿rel)).includes('sandbox')
			&& entry.basename‿noext === 'index') {
			if (!result.sandbox) {
				console.log(`${indent}    ⭐️new candidate for: sandbox`)
				result.sandbox = entry
			}
		}

		if (entry.basename‿noext === 'storypad') {
			console.log(`${indent}    ⭐️new candidate for: storypad`)
			result.storypad = entry
		}
		if (path.basename(path.dirname(path‿rel)).includes('storypad')
			&& entry.basename‿noext === 'index') {
			if (!result.storypad) {
				console.log(`${indent}    ⭐️new candidate for: storypad`)
				result.storypad = entry
			}
		}

		const { basename } = entry
		if (basename === MANIFEST‿basename) {
			if(entry !== entryⵧmanifest)
				throw new Error(`Multiple MANIFEST files found!`)
			return
		}

		const langs = getꓽProgLangs(entry)
		console.log(`${indent}    langs: ${langs.join(', ')}`)
		langs.forEach(lang => result.languages.add(lang))

		const unprocessed_langs = new Set(langs)
		if (langs.includes('js') || langs.includes('ts')) {
			unprocessed_langs.delete('js')
			unprocessed_langs.delete('ts')
			const content = fs.readFileSync(entry.path‿abs, 'utf8')
			const dep_type = inferꓽdeptype_from_caller(entry)
			console.log(`${indent}      inferred as: ${dep_type}`)

			const imports = parseImports(content)
			imports.forEach(({name: dependency_name, type}) => {
				console.log(`${indent}    ↘ import ${type === 1 ? 'type ' : ''}${dependency_name}`)
				assert(!dependency_name.startsWith('npm:'), `Unexpected "npm:" URL scheme in import!`)

				if (isBuiltInNodeModule(dependency_name)) {
					if (langs.includes('ts')) raw_deps.push({ label: '@types/node', type: 'dev' })
					// TODO one day how to express dependency to a runtime?
					return
				}

				if (dependency_name === result.fqname) {
					// self-reference
					// this is allowed, no need to declare it as dep
					return
				}

				// intercept aggregations
				if (dependency_name === 'chai' || dependency_name === 'sinon') {
					if (dep_type !== 'dev' && ![
							'@offirmo-private/state-migration-tester',
							'@offirmo/unit-test-toolbox',
						].includes(result.fqname)
					) {
						throw new Error('Unexpected chai/sinon NON-DEV dependency! Please review the module structure!')
					}

					console.log(`${indent}    ↘ converted to @offirmo/unit-test-toolbox`)
					raw_deps.push({ label: '@offirmo/unit-test-toolbox', type: 'dev' })
					return
				}

				switch (type ?? 1) {
					case 0: {
						raw_deps.push({ label: dependency_name, type: dep_type })
						break
					}

					case 1:
						// types are needed in dev only
						// even if published as pure TS module, node type stripping will remove those deps in prod
						raw_deps.push({ label: dependency_name, type: 'dev' })
						break

					default:
						throw new Error(`Unknown import type "${type}"!`)
				}

				if (langs.includes('ts')) {
					console.log(`${indent}      ↳ Checking for potential @types/ package for "${dependency_name}"…`)
					pending_promises.push(
						pkg_infos_resolver.ↆgetꓽextra_typings_pkg_name_for(dependency_name)
							.then(name => {
								if (name) raw_deps.push({ label: name, type: 'dev' })
							})
					)
				}
			})
		}
		if (langs.includes('html')) {
			unprocessed_langs.delete('html')
			//throw new Error(`HTML imports detection not implemented!`)
			// TODO one day use parcel to track deps
			console.log(`${indent}    ↘ auto-dep to @offirmo-private/toolbox--parcel`)
			raw_deps.push({ label: '@offirmo-private/toolbox--parcel', type: 'dev'})
		}
		if (langs.includes('css')) {
			unprocessed_langs.delete('css')
			//throw new Error(`CSS imports detection not implemented!`)
			// TODO one day use parcel
		}
		if (langs.includes('jsx')) {
			unprocessed_langs.delete('jsx')
			// need a jsx transform.
			// Parcel does it for us.
		}
		if (unprocessed_langs.size) {
			throw new Error(`Unknown language(s) "${Array.from(unprocessed_langs).join(', ')}" for "${basename}"!`)
		}

		if (entry.extⵧsub === '.tests') {
			result.hasꓽtestsⵧunit = true
		}
		if (entry.extⵧsub === '.stories') {
			result.hasꓽstories = true
		}
	})

	await Promise.all(pending_promises)
	assert(result.main, 'No main file found?')

	result.isꓽapp = result._manifest.isꓽapp ?? (
		module_path.includes('sandbox')
		|| result.main.ext === '.html'
	)

	// migrations
	if (result.hasꓽstories && !result.storypad) {
		// auto-create storypad in the right place
		const storypad__path = path.resolve(root‿abspath, '__fixtures', 'storypad')
		const storypad__content = `
<!DOCTYPE html>

<script type="module">
	import startꓽstorypad from '@offirmo-private/storypad'
	import decoratorⵧdiagnostics from '@offirmo-private/storypad/decorators/diagnostics'
	import nearest_pkg from '~/package.json'

	const DEBUG = false

	// important to load async so that the stories don't pollute the global scope too early (ex. before SXC)
	const stories = import('../../**/*.stories.@(js|jsx|ts|tsx|mdx)')
	if (DEBUG) console.log('BOOTSTRAP stories', {
		stories,
	})

	startꓽstorypad(
		{
			'own': stories,
		},
		{
			root_title: nearest_pkg?.name,
			decorators: [
				/*(story) => {
					import('npm:@offirmo-private/css--foundation')
					return story
				},*/
				decoratorⵧdiagnostics
			]
		}
	)
</script>
`
		fs.mkdirSync(storypad__path, { recursive: true })
		fs.writeFileSync(
			path.resolve(storypad__path, 'index.html'),
			storypad__content,
			{encoding: 'utf-8'}
		)
		result.storypad = createꓽfile_entry(path.resolve(storypad__path, 'index.html'), root‿abspath)
	}

	// extras
	if (result.languages.has('ts')) {
		raw_deps.push({ label: 'tslib', type: 'peer' })
		raw_deps.push({ label: 'typescript', type: 'dev' })
	}

	// encourage safe practices
	if (!result.isꓽpublished && (result.languages.has('js') || result.languages.has('ts'))) {
		raw_deps.push({ label: 'tiny-invariant', type: 'normal'})
	}
	// TODO add extended error types?

	// consolidate
	Object.entries(result._manifest._overrides?.dependencies || {}).forEach(([label, details]) => {
		if (details === 'ignore') return

		raw_deps.push({label, type: details.type || 'normal'})
	})
	const hasꓽdependency_onꓽReact = raw_deps.some(({label}) => label === 'react')
	if (hasꓽdependency_onꓽReact) {
		// indirect dependency
		if (result.isꓽapp) {
			result.depsⵧnormal.add('react-dom')
		}
		else {
			result.depsⵧdev.add('react-dom')
		}
	}

	const targets_runtimeꓽbrowser = result.engines['browser']
		|| hasꓽdependency_onꓽReact
		|| result.languages.has('html')
		|| result.languages.has('css')
		|| result.languages.has('jsx')
		|| result.languages.has('tsx')
		|| result.hasꓽstories
		|| result.storypad
	if (targets_runtimeꓽbrowser)
		result.engines['browser'] = '*'

	if (targets_runtimeꓽbrowser) {
		raw_deps.push({ label: '@offirmo-private/storypad', type: 'dev'})
		raw_deps.push({ label: '@offirmo-private/toolbox--parcel', type: 'dev'})
	}

	raw_deps.forEach(({label, type}) => {
		if (label === result.fqname)
			return // self-reference, not a real dep

		const overrides = result._manifest._overrides?.dependencies?.[label]
		if (overrides === 'ignore') {
			// currently use to allow using optional "cross-cutting" libs
			// which may not be available if resurrecting bolt workspace 1-by-1
			// thus should not appear in package.json
			return
		}

		switch (overrides?.type || type) {
			case 'normal':
				result.depsⵧnormal.add(label)
				break
			case 'dev':
				result.depsⵧdev.add(label)
				break
			case 'peer':
				result.depsⵧpeer.add(label)
				break
			case 'optional':
				result.depsⵧoptional.add(label)
				break
			case 'vendored':
				result.depsⵧvendored.add(label)
				break
			default:
				throw new Error(`Unknown dep type "${type}"!`)
		}
	})

	// move some deps around
	for (const dep of result.depsⵧnormal) {
		// small control
		if ([
			'@offirmo-private/monorepo-scripts',
			'@offirmo-private/storypad',
			'@offirmo-private/toolbox--parcel',
			'@offirmo/unit-test-toolbox',
			'npm-run-all',
			'tslib',
			'typescript',
		].includes(dep))
			throw new Error(`Unexpected dep "${dep}" in normal deps! (should be dev)`)

		const is_peer_candidate = [
			'tslib',
			'react',
			'@offirmo-private/soft-execution-context',
		].includes(dep)
		if (is_peer_candidate) {
			// note: will be moved back to normal if not a lib, see below
			result.depsⵧpeer.add(dep)
			result.depsⵧnormal.delete(dep)
		}
	}
	for (const dep of result.depsⵧdev) {
		if (result.depsⵧnormal.has(dep)) {
			result.depsⵧdev.delete(dep)
		}
	}
	for (const dep of result.depsⵧpeer) {
		if (result.isꓽapp) {
			// move them all to normal
			result.depsⵧnormal.add(dep)
			result.depsⵧpeer.delete(dep)
		}
		else {
			// also move to dev
			result.depsⵧdev.add(dep)
		}
	}

	return result
}

/////////////////////////////////////////////////

export * from './types.ts'
export {
	type PureModuleDetails,
	getꓽpure_module_details,
}
