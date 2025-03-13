/* PROMPT
 * ’
 */
import * as path from 'node:path'
import { readFileSync } from 'node:fs'

import { parse } from "parse-imports-ts"

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
	| 'vendored' // special

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
	namespace: string
	name: string
	version: string
	description?: string
	isꓽprivate: boolean
	author: string
	license: string // TODO SPDX
	source: FileEntry
	hasꓽside_effects: boolean
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
}

/////////////////////////////////////////////////

function _createꓽresult(root‿abspath: string): PureModuleDetails {
	const name = (() => {
		let _path = path.resolve(root‿abspath)
		if (_path.endsWith('/src'))
			_path = _path.slice(0, -4)

		return path.basename(_path)
	})()
	return {
		root‿abspath,

		namespace: '@offirmo-private',
		name,
		version: '0.0.1',
		//description?: string
		isꓽprivate: true,
		author: 'Offirmo <offirmo.net@gmail.com>',
		license: 'Unlicense',
		source: null as any, // XXX TODO
		hasꓽside_effects: false,
		extra_entries: {},
		depsⵧnormal: new Set<string>(),
		depsⵧdev: new Set<string>([
			'@offirmo-private/monorepo-scripts',
			'@offirmo/unit-test-toolbox',
			'npm-run-all',
		]),
		depsⵧpeer: new Set<string>(),
		depsⵧoptional: new Set<string>(),
		depsⵧvendored: new Set<string>(),
		languages: new Set<ProgLang>(),
	}
}

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
	if (entry.basename === '.DS_Store')
		return true

	return false
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

function getꓽProgLangs(entry: FileEntry): ProgLang[] {
	const { ext } = entry
	switch(true) {
		case ['.js'].includes(ext):
			return [ 'js' ]

		case ['.jsx'].includes(ext):
			return [ 'js', 'jsx' ]

		case ['.ts'].includes(ext):
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
			throw new Error(`Unsupported language for extension "${ext}"!`)
	}
}

const MANIFEST‿basename = 'MANIFEST.json5'
function getꓽpure_module_details(module_path: string, { indent = ''} = {}) {
	const root‿abspath = path.resolve(module_path)
	console.log(`${indent}🗂  analysing pure code module at "${root‿abspath}"…`)

	const files = lsFilesRecursiveSync(root‿abspath)

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

	const entryⵧmanifest = file_entries.find(({ basename }) => basename === MANIFEST‿basename)

	// start aggregating
	const result = _createꓽresult(root‿abspath)
	const raw_deps: Array<Dependency> = []

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

		const { basename } = entry
		if (basename === MANIFEST‿basename) {
			if(entry !== entryⵧmanifest)
				throw new Error(`Multiple MANIFEST files found!`)
			return
		}

		getꓽProgLangs(entry).forEach(lang => result.languages.add(lang))
	})

	// extras
	if (result.languages.has('ts')) {
		raw_deps.push({ label: 'tslib', type: 'peer' })
		raw_deps.push({ label: 'typescript', type: 'dev' })
	}

	/*if(!entryⵧmanifest) {
		throw new Error(`No MANIFEST found!`)
	}*/

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
	}
	for (const dep of result.depsⵧpeer) {
		result.depsⵧdev.add(dep)
	}

	return result
}

// TODO implicit deps ex. if has tests = mocha
// also always dev deps for runner

// node --experimental-strip-types ./X-spikes/parse-import-ts/index.mjs

/////////////////////////////////////////////////

export {
	type PureModuleDetails,
	getꓽpure_module_details,
}
