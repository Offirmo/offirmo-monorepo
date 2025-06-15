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
	const basename‿noext = path.basename(path‿abs, ext)
	const basename‿noxext = path.basename(path‿abs, extⵧextended)

	const path‿rel = path.relative(root‿abspath, path‿abs)

	const basenameⵧsemantic‿noext = ((): string => {
		if (basename‿noext === 'index') {
			// low info, try better
			const last_segment = path.basename(path‿rel)
			if (last_segment) {
				return last_segment + extⵧsub
			}
		}

		return basename‿noext
	})()

	return {
		path‿abs,
		path‿rel,
		basename,
		ext,
		extⵧsub,
		extⵧextended,
		basename‿noext,
		basename‿noxext,

		basenameⵧsemantic‿noext,
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
