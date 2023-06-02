import assert from 'tiny-invariant'
import { Immutable } from '../embedded-deps/immutable.js'

import * as Graph from '../generic/index.js'

import { Path, FileSystem } from './types.js'

/////////////////////////////////////////////////

const SEP = '/'

function create(): Immutable<FileSystem> {
	return {
		options: {
			separator: SEP,
		},
		graph: Graph.create({
			is_arborescence: true,
			//auto_link_id_separator: '→',
		}),
	} as FileSystem
}

function _upsertꓽpath(fs: Immutable<FileSystem>, path: Path, is_file: boolean): Immutable<FileSystem> {
	const path‿split = path.split(SEP)
	assert(path‿split.every(p => !!p), `path should not have a hole! "${path}"`)

	const node_cuids = path‿split
		.map((last_segment, index) => {
			let path = path‿split.slice(0, index + 1).join(SEP)

			const is_last_segment = index === path‿split.length - 1
			if (!is_last_segment || !is_file)
				path += SEP

			return path
		})

	/*console.log({
		is_file,
		path,
		path‿split,
		node_cuids,
	})*/

	fs = {
		...fs,
		graph: Graph.upsertꓽbranch(fs.graph, ...node_cuids),
	}

	return fs
}

function upsertꓽfile(fs: Immutable<FileSystem>, path: Path): Immutable<FileSystem> {
	assert(!path.endsWith(SEP), `file path should not end with a separator! "${path}"`)
	if (path.startsWith(SEP)) path = path.slice(SEP.length)

	return _upsertꓽpath(fs, path, true)
}

function mkdirp(fs: Immutable<FileSystem>, path: Path): Immutable<FileSystem> {
	if (path.startsWith(SEP)) path = path.slice(SEP.length)
	if (path.endsWith(SEP)) path = path.slice(0, -SEP.length)

	return _upsertꓽpath(fs, path, false)
}

/////////////////////////////////////////////////

export {
	create,
	upsertꓽfile,
	mkdirp,
}
