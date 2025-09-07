import * as process from 'node:process'
import * as path from 'node:path'
import { homedir } from 'node:os'
import {
	ↆloadꓽfileⵧimport,
	ↆloadꓽfile,
} from '@infinite-monorepo/read-write-any-structured-file/read'

import type { JSONObject, AbsoluteDirPath, AbsoluteFilePath } from '@offirmo-private/ts-types'
import { lsDirsSync, lsFilesSync } from '@offirmo-private/fs--ls'
import { strict as assert } from 'node:assert'

/////////////////////////////////////////////////

interface Result {
	data: JSONObject | null // can be null if no file, ex. just reporting a boundary, also if no defaults provided
	parent_folder_path‿abs: AbsoluteDirPath
	exact_file_path‿abs: AbsoluteFilePath | null // can be null if no file
	boundary?: // is that a boundary?
	| 'git' // parent_folder_path‿abs is a git repo root
		// NOTE could there be more than one? (if git submodules)
		| 'home' // parent_folder_path‿abs is a user folder (home, ~)
		| 'fs' // parent_folder_path‿abs is a fs root
		| 'package' // if has package.json. Lowest priority compared to the other boundaries. will only appear if no other boundary found yet. (won't have package twice in the chain)
}

/////////////////////////////////////////////////

/* get a full chain of configs
 * ordered from top (fs root) to bottom (closest to cwd)
 * This should be only used internally.
 * TODO 1D allow branching to a sibling folder = arch repo / multi mono repo
 */
interface LoadChainOptions {
	defaults?: JSONObject | undefined
}
async function loadꓽconfigⵧchain(
	radix: string,
	options: Partial<LoadChainOptions> = {},
): Promise<Array<Result>> {
	const chain: Array<Result> = []
	const promises: Array<Promise<any>> = []

	const cwd = process.cwd()
	const segments = cwd.split(path.sep)
	const HOME = homedir() + path.sep
	let found_boundary_yet = false

	while (segments.length > 0) {
		const current_path‿abs: AbsoluteDirPath = segments.join(path.sep) + path.sep // trailing sep also handles root

		// TODO 1D handle possible permission issues, esp. close to root
		const child_dirs_pathes‿rel = lsDirsSync(current_path‿abs, { full_path: false })
		// TODO 1D yes we're not very efficient listing all child_dirs_pathes‿rel and child_files_pathes‿rel
		const child_files_pathes‿rel = lsFilesSync(current_path‿abs, { full_path: false })

		const boundary: Result['boundary'] = (() => {
			// order is important!
			if (segments.length === 1) return 'fs' // we're at the root of the fs
			if (current_path‿abs === HOME) return 'home'
			if (child_dirs_pathes‿rel.includes('.git')) return 'git'

			if (!found_boundary_yet) {
				// lowest prio, only if no other boundary found yet = closest to cwd
				if (child_files_pathes‿rel.includes('package.json')) return 'package'
			}

			return undefined
		})()
		found_boundary_yet ||= boundary !== undefined

		if (child_dirs_pathes‿rel.includes(radix)) {
			// to mts / cts = ESM is standard now, module is implicit
			const candidate_file_path‿abs = path.join(current_path‿abs, radix, 'index.ts')
			const ೱdata = ↆloadꓽfileⵧimport(candidate_file_path‿abs)
			const result: Result = {
				data: { loading: '…' },
				parent_folder_path‿abs: current_path‿abs,
				exact_file_path‿abs: candidate_file_path‿abs,
				...(boundary && { boundary }),
			}
			chain.unshift(result)
			promises.push(ೱdata)
			ೱdata.then(data => {
				result.data = data
			})
		} else if (child_files_pathes‿rel.includes(radix)) {
			const candidate_file_path‿abs = path.join(current_path‿abs, radix)
			const ೱdata = ↆloadꓽfile(candidate_file_path‿abs)
			const result: Result = {
				data: { loading: '…' },
				parent_folder_path‿abs: current_path‿abs,
				exact_file_path‿abs: candidate_file_path‿abs,
				...(boundary && { boundary }),
			}
			chain.unshift(result)
			promises.push(ೱdata)
			ೱdata.then(data => {
				result.data = data
			})
		} else if (boundary) {
			// add an empty result to mark the boundary
			// or default if top
			const result: Result = {
				data: boundary === 'fs' ? options.defaults || null : null,
				parent_folder_path‿abs: current_path‿abs,
				exact_file_path‿abs: null,
				boundary,
			}
			chain.unshift(result)
		}

		segments.pop()
	}

	await Promise.all(promises)

	return chain
}

interface LoadTopmostOptions {
	defaults?: JSONObject
	boundary?: Result['boundary']
}
async function loadꓽconfigⵧtopmost(
	radix: string,
	options: LoadTopmostOptions = {},
): Promise<Result> {
	const chain = await loadꓽconfigⵧchain(radix, { defaults: options['defaults'] })

	const start_index =
		options['boundary'] ? chain.findIndex(result => result.boundary === options['boundary']) : 0
	assert(start_index >= 0, `Requested boundary not found!`)

	for (let i = start_index; i < chain.length; i++) {
		if (chain[i]?.data) return chain[i]!
	}

	throw new Error(`No config found within the requested boundary!`)
}

async function loadꓽconfigⵧclosest(
	radix: string,
	options: Options = {},
): Promise<[JSONObject, AbsoluteDirPath, AbsoluteFilePath | null]> {
	throw new Error(`No "${radix}/index.ts" found within the closest git repo!`)
}

/////////////////////////////////////////////////

export { loadꓽconfigⵧchain, loadꓽconfigⵧtopmost, loadꓽconfigⵧclosest }
