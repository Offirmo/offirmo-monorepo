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

interface PureModuleDetails {
	root‿abspath: string

	// everything needed to build package.json
	namespace: string
	name: string
	version?: string
	description?: string
	isꓽprivate?: boolean
	author: string
	license: string // TODO SPDX
	deps: Map<string, DependencyType>
	entries: {
		[label: string]: FileEntry
	}

	// needed to build scripts
	languages: Set<ProgLang>
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
		deps: new Map<string, DependencyType>([
			[ '@offirmo-private/monorepo-scripts', 'dev' ],
			[ '@offirmo/unit-test-toolbox', 'dev' ],
			[ 'npm-run-all', 'dev' ],
		]),
		entries: {},
		languages: new Set<ProgLang>(),
	}
}

function _isꓽin_excluded_folder(entry: FileEntry): boolean {
	const { path‿rel } = entry

	if (path‿rel.includes('/~~gen/'))
		return true

	if (path‿rel.includes('/tosort/'))
		return true

	return false
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

	file_entries.forEach(entry => {
		const { path‿rel } = entry
		const is_excluded = _isꓽin_excluded_folder(entry)
		console.log(`${indent} ↳ 📄`, path‿rel, is_excluded ? '🚫' : '')
		if (is_excluded)
			return

		assertꓽmigrated(entry)
		assertꓽnormalized(entry)

		const { basename } = entry
		if (basename === MANIFEST‿basename) {
			if(entry !== entryⵧmanifest)
				throw new Error(`Multiple MANIFEST files found!`)
			return
		}

		getꓽProgLangs(entry).forEach(lang => result.languages.add(lang))
	})

	/*if(!entryⵧmanifest) {
		throw new Error(`No MANIFEST found!`)
	}*/

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
