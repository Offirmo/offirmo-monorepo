import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import * as Graph from '../generic/index.js'

import { Path, FileSystem } from './types.js'

/////////////////////////////////////////////////

function create(): Immutable<FileSystem> {
	return {
		options: {
			separator: '/',
		},
		graph: Graph.create({
			is_directed: true,
			allows_cycles: false,
			allows_duplicate_edges: false,
		}),
	} as FileSystem
}

function upsertꓽfile(fs: Immutable<FileSystem>, path: Path): Immutable<FileSystem> {

	return fs
}


function mkdirp(fs: Immutable<FileSystem>, path: Path): Immutable<FileSystem> {

	return fs
}


/////////////////////////////////////////////////

export {
	create,
	upsertꓽfile,
	mkdirp,
}
