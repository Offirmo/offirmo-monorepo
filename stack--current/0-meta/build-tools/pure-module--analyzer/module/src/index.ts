/* PROMPT
 * ’
 */
import * as path from 'node:path'
import { readFileSync } from 'node:fs'
import { isBuiltin } from 'node:module'

import walk from 'ignore-walk'
import { parse as parseImports } from 'parse-imports-ts'
import JSON5 from 'json5'
import { writeJsonFile as write_json_file } from 'write-json-file'

import { lsFilesRecursiveSync } from './_vendor/fs_ls.ts'

/////////////////////////////////////////////////

interface FileEntry {
	path‿abs: string
	path‿rel: string
	basename: string
	ext: string // . included, ex. .ts
	extⵧsub: string // . included, ex. .tests
	extⵧextended: string
	basename‿noext: string
}

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
	| 'ts'
	| 'jsx'
	| 'html'
	| 'css'
	| 'md'

interface PureModuleDetails {
	root‿abspath: string

	// everything needed to build package.json
	namespace: string // namespace + name mandatory (needed at this stage already)
	name: string

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
	manifest: object
}

const MANIFEST‿basename = 'MANIFEST.json5'

/////////////////////////////////////////////////

function _createꓽresult(root‿abspath: string): PureModuleDetails {
	const name = (() => {
		let _path = path.resolve(root‿abspath).split(path.sep)
		if (_path.at(-1) === 'src')
			_path.pop()
		if (_path.at(-1) === 'module')
			_path.pop()

		return _path.pop()!
	})()

	// TODO not this tool's job to set defaults:
	// TODO one day: caller to provide defaults

	return {
		root‿abspath,

		namespace: '@offirmo-private',
		name,
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

	if (path‿rel.includes('++gen/'))
		return true

	// vendored deps are supposed to have no deps
	if (path‿rel.includes('__vendored/'))
		return true

	if (path‿rel.includes('~~tosort/'))
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

	return false
}

function getꓽProgLangs(entry: FileEntry): ProgLang[] {
	const { ext } = entry
	switch(true) {
		case ['.js'].includes(ext):
			return [ 'js' ]

		case ['.jsx'].includes(ext):
			return [ 'js', 'jsx' ]

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
function getꓽdeptype(entry: FileEntry): DependencyType {
	const { path‿rel, extⵧsub } = entry

	if (path‿rel.includes('/__fixtures/'))
		return 'dev'

	if (extⵧsub === 'tests')
		return 'dev'

	return 'normal'
}

/////////////////////////////////////////////////

function assertꓽmigrated(entry: FileEntry, { indent = ''} = {}): void {
	let has_pending_migration = false

	const { path‿abs, basename‿noext, ext, extⵧextended } = entry

	if (basename‿noext.endsWith('_spec')) {
		console.log(`Please normalize this file:`)
		console.log(`mv "${path.relative(process.cwd(), path‿abs)}" "${path.relative(process.cwd(), path‿abs.replace('_spec', '.tests'))}"`)
		has_pending_migration = true
	}
	if (extⵧextended.startsWith('.spec')) {
		console.log(`Please normalize this file:`)
		console.log(`mv "${path.relative(process.cwd(), path‿abs)}" "${path.relative(process.cwd(), path‿abs.replace('.spec', '.tests'))}"`)
		has_pending_migration = true
	}

	if ([
		'.cjs', '.cts', '.htm', '.markdown',
	].includes(ext)) {
		console.log(`Please normalize this file:`)
		console.log(`Using outdated extension "${ext}"!`)
		has_pending_migration = true
	}

	if (has_pending_migration) {
		throw new Error(`Pending migration!`)
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

async function getꓽpure_module_details(module_path: string, { indent = ''} = {}) {
	const root‿abspath = path.resolve(module_path)
	console.log(`${indent}🗂  analysing pure code module at "${root‿abspath}"…`)

	const files = walk.sync({ path: root‿abspath })
		.map(p => path.resolve(root‿abspath, p))
		.sort()
	//const files = lsFilesRecursiveSync(root‿abspath)

	const file_entries: Array<FileEntry> = files.map(path‿abs => {
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
	})

	// start aggregating
	const result = _createꓽresult(root‿abspath)
	const raw_deps: Array<Dependency> = []

	const entryⵧmanifest = file_entries.find(({ basename }) => basename === MANIFEST‿basename)
	if(!entryⵧmanifest) {
		// not necessarily needed but good to have
		// NOTE: yes, this is a side effect in a read function, but it's a good one 😅
		write_json_file(
			path.resolve(root‿abspath, MANIFEST‿basename),
			{
				description: 'TODO description in MANIFEST.json5'
			},
		)
	}
	else {
		const data = JSON5.parse(readFileSync(entryⵧmanifest.path‿abs, 'utf8'))
		result.manifest = data

		// overrides from the manifest
		const unprocessed_keys = new Set<string>(Object.keys(data))

		if (unprocessed_keys.has('version')) {
			result.version = data.version
			unprocessed_keys.delete('version')
		}
		if (unprocessed_keys.has('isꓽpublished')) {
			result.isꓽpublished = data.isꓽpublished
			unprocessed_keys.delete('isꓽpublished')
		}
		if (unprocessed_keys.has('description')) {
			result.description = data.description
			unprocessed_keys.delete('description')
		}

		if (unprocessed_keys.size) {
			throw new Error(`Unknown keys in manifest: "${Array.from(unprocessed_keys).join(', ')}"!`)
		}
	}

	// we need the fully qualified name of the module
	result.namespace = result.isꓽpublished ? '@offirmo' : '@offirmo-private' // TODO one day external
	const module_fqname = result.namespace + '/' + result.name

	file_entries.forEach(entry => {
		const is_excluded = _isꓽin_excluded_folder(entry) || _isꓽignored(entry)
		const { path‿rel } = entry
		console.log(`${indent} ↳ 📄`, path‿rel, is_excluded ? '🚫' : '')
		if (is_excluded)
			return

		assertꓽmigrated(entry)
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
			const content = readFileSync(entry.path‿abs, 'utf8')
			const imports = parseImports(content)
			imports.forEach(({name, type}) => {
				console.log(`${indent}    ↘ ${name} ${type}`)

				if (isBuiltin(name)) {
					 // built-in node module
					raw_deps.push({ label: '@types/node', type: 'dev' })
					// TODO one day how to express dependency to a runtime?
					return
				}

				if (name === module_fqname) {
					// self-reference
					// this is allowed, but no need to declare it as dep
					return
				}

				switch (type ?? 1) {
					case 0:
						raw_deps.push({ label: name, type: 'normal' })
						break
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
	raw_deps.push({ label: 'tiny-invariant', type: 'normal'})
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
