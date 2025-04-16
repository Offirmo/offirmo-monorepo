import * as path from 'node:path'

import assert from 'tiny-invariant'

import type { AbsolutePath } from '../types.js'
import type { FileEntry } from './types.js'

/////////////////////////////////////////////////

function createꓽfile_entry(path‿abs: AbsolutePath, root‿abspath: AbsolutePath): FileEntry {
	const basename = path.basename(path‿abs)
	const ext = path.extname(basename)
	const extⵧsub = path.extname(path.basename(basename, ext))
	const extⵧextended = (() => {
		const split = basename.split('.')
		split[0] = ''
		return split.join('.')
	})()
	const basename‿noext = path.basename(path‿abs, extⵧextended)

	return {
		path‿abs,
		path‿rel: path.relative(root‿abspath, path‿abs),
		basename,
		ext,
		extⵧsub,
		extⵧextended,
		basename‿noext,
	}
}

// in-place, mutate!
function updateꓽfile_entry(entry: FileEntry, new_path‿abs: AbsolutePath, root‿abspath: AbsolutePath): void {
	const new_entry = createꓽfile_entry(new_path‿abs, root‿abspath)
	Object.keys(entry).forEach(k => {
		// @ts-ignore
		entry[k] = new_entry[k]
	})
}

/////////////////////////////////////////////////

export {
	type FileEntry,

	createꓽfile_entry,
	updateꓽfile_entry,
}
