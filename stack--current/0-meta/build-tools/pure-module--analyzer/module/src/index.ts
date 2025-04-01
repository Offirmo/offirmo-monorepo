import * as path from 'node:path'
import * as fs from 'node:fs'
import { isBuiltin } from 'node:module'

import walk from 'ignore-walk'
import { parse as parseImports } from 'parse-imports-ts'
import JSON5 from 'json5'
import { writeJsonFile as write_json_file } from 'write-json-file'

/////////////////////////////////////////////////

// for readability. Unfortunately this doesn't cause a real additional safety
export type Basename = string
export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string
export type AnyPath = RelativePath | AbsolutePath

interface FileEntry {
	path‿abs: AbsolutePath
	path‿rel: RelativePath
	basename: Basename
	ext: string // . included, ex. .ts
	extⵧsub: string // . included, ex. .tests
	extⵧextended: string
	basename‿noext: Basename
}

function get_file_entry(path‿abs: AbsolutePath, root‿abspath: AbsolutePath): FileEntry {
	const basename = path.basename(path‿abs)
	const ext = path.extname(basename)
	const extⵧsub = path.extname(path.basename(basename, ext))
	const extⵧextended = (() => {
		const split = basename.split('.')
		split[0] = ''
		return split.join('.')
	})()
	const basename‿noext = path.basename(path‿abs, extⵧextended)

	const entry: FileEntry = {
		path‿abs,
		path‿rel: path.relative(root‿abspath, path‿abs),
		basename,
		ext,
		extⵧsub,
		extⵧextended,
		basename‿noext,
	}

	return entry
}

function update_file_entry(entry: FileEntry, new_path‿abs: AbsolutePath, root‿abspath: AbsolutePath): void {
	const new_entry = get_file_entry(new_path‿abs, root‿abspath)
	Object.keys(entry).forEach(k => {
		// @ts-ignore
		entry[k] = new_entry[k]
	})
}

/////////////////////////////////////////////////

type DependencyType =
	| 'normal'
	| 'dev'
	| 'peer'
	| 'optional'
	| 'vendored' // special, TODO

interface Dependency {
	label: string
	type: DependencyType
}

type ProgLang =
	| 'js'
	| 'json'
	| 'ts'
	| 'jsx'
	| 'html'
	| 'css'
	| 'md'


interface PureModuleManifest {
	name?: string // NOT including the namespace
	description?: string
	version?: string // Semver version TODO proper type
	isꓽpublished?: true
	status?: // EXPERIMENTAL rating of modules TODO clarify
		| 'spike'
		| 'tech-demo'
		| 'sandbox'
		| 'stable'
}

interface PureModuleDetails {
	root‿abspath: string

	status: string // EXPERIMENTAL rating of modules spike -> demo -> stable -> core -> critical ?

	// everything needed to build package.json
	namespace: string // namespace + name mandatory (needed at this stage already)
	name: string
	fqname: string // fully qualified

	version: string
	description?: string
	isꓽpublished: boolean
	author: string
	license: undefined | string // TODO SPDX
	source: FileEntry
	demo?: FileEntry
	hasꓽside_effects: boolean
	hasꓽtestsⵧunit: boolean
	hasꓽtestsⵧsmoke: boolean
	extra_entries: {
		[label: string]: FileEntry
	}

	depsⵧnormal: Set<string>
	depsⵧdev: Set<string>
	depsⵧpeer: Set<string>
	depsⵧoptional: Set<string>
	depsⵧvendored: Set<string>

	// needed to build scripts
	languages: Set<ProgLang>
	// TODO bundler reqs, ex. Parcel-specific imports
	// TODO engines ex. node

	// in case of extra info
	manifest: PureModuleManifest
}

const MANIFEST‿basename = 'MANIFEST.json5'

/////////////////////////////////////////////////

function _createꓽresult(root‿abspath: AbsolutePath): PureModuleDetails {
	const name = (() => {
		let _path = path.resolve(root‿abspath).split(path.sep)
		if (_path.at(-1) === 'src')
			_path.pop()
		if (_path.at(-1) === 'module')
			_path.pop()

		return _path.pop()!
	})()

	return {
		root‿abspath,

		status: 'stable',
		namespace: 'unknown',
		name,
		fqname: 'unknown',
		version: '0.0.1',
		//description?: string
		isꓽpublished: false,
		author: 'Offirmo <offirmo.net@gmail.com>',
		license: 'Unlicense',
		source: null as any, // XXX TODO
		hasꓽside_effects: false,
		hasꓽtestsⵧunit: false,
		hasꓽtestsⵧsmoke: false,
		extra_entries: {},
		depsⵧnormal: new Set<string>(),
		depsⵧdev: new Set<string>([
			// implicit deps:

			// common tools
			'npm-run-all',
			// obvious in our monorepo
			'@offirmo-private/monorepo-scripts',
			// encourage unit tests
			'@offirmo/unit-test-toolbox',
		]),
		depsⵧpeer: new Set<string>(),
		depsⵧoptional: new Set<string>(),
		depsⵧvendored: new Set<string>(),
		languages: new Set<ProgLang>(),

		manifest: {},
	}
}

/////////////////////////////////////////////////

function _isꓽin_excluded_folder(entry: FileEntry): boolean {
	const { path‿rel } = entry

	if (path‿rel.includes('node_modules/'))
		throw new Error(`A pure module should not contain node_modules!`)

	if (path‿rel.includes('~~')) // means "unstructured
		return true

	// vendored deps are supposed to have no deps
	if (path‿rel.includes('__vendored/'))
		return true

	return false
}

function _isꓽignored(entry: FileEntry): boolean {
	if (entry.basename === '.DS_Store') {
		// TODO one day load from gitignore
		return true
	}

	if (entry.basename === 'LICENSE') {
		// license override for a sub-folder, ignore
		return true
	}

	if (entry.basename === '.gitignore') {
		// ???
		return true
	}

	return false
}

function getꓽProgLangs(entry: FileEntry): ProgLang[] {
	const { ext } = entry
	switch(true) {
		case ['.js'].includes(ext):
			return [ 'js' ]

		case ['.jsx'].includes(ext):
			return [ 'js', 'jsx' ]

		case ['.json'].includes(ext):
			return [ 'json' ]

		case ['.ts'].includes(ext): // mts sometimes needed for node scripts
			return [ 'ts' ]

		case ['.tsx'].includes(ext):
			return [ 'ts', 'jsx' ]

		case ['.html'].includes(ext):
			return [ 'html' ]

		case ['.css'].includes(ext):
			return [ 'css' ]

		case ['.md'].includes(ext):
			return [ 'md' ]

		/*case ['.json',].includes(ext):
			return [ 'json' ]*/

		default:
			throw new Error(`Unsupported language for extension "${ext}" (${entry.basename})!`)
	}
}

// examples ? demo?
function inferꓽdeptype_from_caller(entry: FileEntry): DependencyType {
	const { path‿rel, extⵧsub } = entry

	if (path‿rel.includes('/__'))
		return 'dev'

	if (path‿rel.includes('/##'))
		return 'dev'

	if (extⵧsub === '.tests')
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

		update_file_entry(entry, migration_target, root‿abspath)
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
}

async function getꓽpure_module_details(module_path: AnyPath, options: Options) {
	const { indent = '', getꓽdefault_namespace } = options

	const root‿abspath = path.resolve(module_path)
	console.log(`${indent}🗂  analysing pure code module at "${root‿abspath}"…`)

	const files = (walk.sync({
			path: root‿abspath,
			ignoreFiles: [ '.gitignore' ],
		}) as Array<string>)
		.map(p => path.resolve(root‿abspath, p))
		.sort()
	//const files = lsFilesRecursiveSync(root‿abspath) old version

	const file_entries: Array<FileEntry> = files
		.map(path‿abs => get_file_entry(path‿abs, root‿abspath))

	// start aggregating
	const result = _createꓽresult(root‿abspath)
	const raw_deps: Array<Dependency> = []

	const entryⵧmanifest: FileEntry = await (async () => {
		const candidate = file_entries.find(({basename}) => basename === MANIFEST‿basename)
		if (candidate)
			return candidate

		// MIGRATION
		// NOTE: yes, this is a side effect in a read function, but it's a good one 😅
		// needed. build it from existing package.json

		const package_json_path = path.dirname(root‿abspath) + '/package.json'
		const packageᐧjson: any = JSON.parse(fs.readFileSync(package_json_path, { encoding: 'utf-8' }))

		const status = packageᐧjson.name.includes('sandbox')
			? 'sandbox'
			: packageᐧjson.scripts?.hasOwn?.('test')
				? 'stable'
				: 'tech-demo'

		const [ namespace, name ] = packageᐧjson.name.split('/')

		const data: any = {
			...(name !== result.name && { name }),
			...(packageᐧjson.version !== '0.0.1' && { version: packageᐧjson.version}),
			description: packageᐧjson.description || 'TODO description in MANIFEST.json5',
			...(!packageᐧjson.private && { isꓽpublished: true }),
			...(status !== 'stable' && { status }),
		}

		const target_path = path.resolve(root‿abspath, MANIFEST‿basename)
		await write_json_file(target_path, data)
		return get_file_entry(target_path, root‿abspath)
	})()

	// overrides from the manifest
	result.manifest = JSON5.parse(fs.readFileSync(entryⵧmanifest.path‿abs, 'utf8'))
	const unprocessed_keys = new Set<string>(Object.keys(result.manifest))
	if (unprocessed_keys.has('version')) {
		result.version = result.manifest.version
		unprocessed_keys.delete('version')
	}
	if (unprocessed_keys.has('isꓽpublished')) {
		result.isꓽpublished = result.manifest.isꓽpublished
		unprocessed_keys.delete('isꓽpublished')
	}
	if (unprocessed_keys.has('description')) {
		result.description = result.manifest.description
		unprocessed_keys.delete('description')
	}
	if (unprocessed_keys.has('status')) {
		result.status = result.manifest.status
		unprocessed_keys.delete('status')
	}
	if (unprocessed_keys.has('name')) {
		result.name = result.manifest.name
		unprocessed_keys.delete('name')
	}
	if (unprocessed_keys.size) {
			throw new Error(`Unknown keys in manifest: "${Array.from(unprocessed_keys).join(', ')}"!`)
	}

	// we need the fully qualified name of the module
	result.namespace = getꓽdefault_namespace(result)
	result.fqname = result.namespace + '/' + result.name

	file_entries.forEach(entry => {
		const is_excluded = _isꓽin_excluded_folder(entry) || _isꓽignored(entry)
		const { path‿rel } = entry
		console.log(
			`${indent} ↳ 📄`, path‿rel,
			is_excluded ? '🚫' : '',
			//entry.extⵧsub, entry.ext, entry.extⵧextended,
		)
		if (is_excluded)
			return

		assertꓽmigrated(entry, { indent, root‿abspath })
		assertꓽnormalized(entry)

		if (!result.source) {
			result.source = entry
		}
		else if (entry.basename‿noext === 'index') {
			if (entry.path‿rel.length < result.source.path‿rel.length) {
				result.source = entry
			}
		}
		if (path.basename(path.dirname(path‿rel)) === '##demo') {
			if (entry.basename‿noext === 'index') {
				result.demo = entry
			}
		}

		const { basename } = entry
		if (basename === MANIFEST‿basename) {
			if(entry !== entryⵧmanifest)
				throw new Error(`Multiple MANIFEST files found!`)
			return
		}

		const langs = getꓽProgLangs(entry)
		langs.forEach(lang => result.languages.add(lang))
		if (langs.includes('ts')) {
			const content = fs.readFileSync(entry.path‿abs, 'utf8')
			const dep_type = inferꓽdeptype_from_caller(entry)
			console.log(`${indent}      inferred as: ${dep_type}`)

			const imports = parseImports(content)
			imports.forEach(({name, type}) => {
				console.log(`${indent}    ↘ import ${type === 1 ? 'type ' : ''}${name}`)

				if (isBuiltin(name)) {
					 // built-in node module
					raw_deps.push({ label: '@types/node', type: 'dev' })
					// TODO one day how to express dependency to a runtime?
					return
				}

				if (name === result.fqname) {
					// self-reference
					// this is allowed, but no need to declare it as dep
					return
				}

				switch (type ?? 1) {
					case 0: {
						if ((name === 'chai' || name === 'sinon') && dep_type !== 'dev') {
							throw new Error('Unexpected chai/sinon NON-DEV dependency! Please review the file name/folder!')
						}

						raw_deps.push({ label: name, type: dep_type })
						break
					}

					case 1:
						// types ar for dev
						raw_deps.push({ label: name, type: 'dev' })
						break

					default:
						throw new Error(`Unknown import type "${type}"!`)
				}
			})
		}

		if (entry.extⵧsub === '.tests') {
			result.hasꓽtestsⵧunit = true
		}
	})

	// extras
	if (result.languages.has('ts')) {
		raw_deps.push({ label: 'tslib', type: 'peer' })
		raw_deps.push({ label: 'typescript', type: 'dev' })
	}

	// encourage safe practices
	if (!result.isꓽpublished) {
		raw_deps.push({ label: 'tiny-invariant', type: 'normal'})
	}
	// TODO add extended error types

	if(!result.source) {
		throw new Error(`No "source" candidate found!`)
	}

	// consolidate
	raw_deps.forEach(({label, type}) => {
		switch (type) {
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

	for (const dep of result.depsⵧdev) {
		if (result.depsⵧnormal.has(dep)) {
			result.depsⵧdev.delete(dep)
		}
		else if (dep === 'chai' || dep === 'sinon') {
			result.depsⵧdev.add('@offirmo/unit-test-toolbox')
			result.depsⵧdev.delete(dep)
		}
	}
	for (const dep of result.depsⵧpeer) {
		result.depsⵧdev.add(dep)
	}

	return result
}

/////////////////////////////////////////////////

export {
	type PureModuleDetails,
	getꓽpure_module_details,
}
