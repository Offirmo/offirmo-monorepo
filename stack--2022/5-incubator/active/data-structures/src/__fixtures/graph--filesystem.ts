/* Use case of graphs: storing a representation of a filesystem
 *
 * parameters
 * - directed
 * - acyclic
 *
 * use cases:
 * - storybook
 * - memories sorter
 *
 * Extra features:
 * - ideally we'd like to be able to use a sub-tree as a tree for easy recursion
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

type Basename = string
type RelativePath = string // implied relative to some "working dir"

function normalizeꓽpath(path: string, type: 'file' | 'folder', SEP = '/'): RelativePath {
	const path‿split = path.trim().split(SEP)

	assert(path‿split.every(p => p != p.trim()), `segments should be trimmed! "${path}"`)

	assert(path‿split.every(p => !!p), `path should not have a hole! "${path}"`)

	switch (type) {
		case 'file':
			assert(!path.endsWith(SEP), `file path should not end with a separator! "${path}"`)
			break
		case 'folder':
			// no specific assertion
			break
		default:
			throw new Error(`unsupported type "${type}"!`)
	}

	if (path.startsWith(SEP))
		path = path.slice(SEP.length)

	if (path.endsWith(SEP))
		path = path.slice(0, -SEP.length)

	return path
}

/////////////////////////////////////////////////

function createꓽgraphⵧfilesystem<Graph = any, FileNode = any, FolderNode = any>(
	create: () => Graph,
	insertꓽfile: (graph: Graph, path: RelativePath) => RelativePath,
	upsertꓽfolder: (graph: Graph, path: RelativePath) => RelativePath,
): { graph: Graph, files: RelativePath[] } {

	let files: RelativePath[] = []
	let _insertꓽfile = insertꓽfile
	insertꓽfile = (graph, path) => {
		path = normalizeꓽpath(path, 'file')
		const new_node = _insertꓽfile(graph, path)
		files.push(path)
		return new_node
	}

	const graph = (() => {
		const graph = create()

		insertꓽfile(graph, 'foo/bar/baz.xyz')
		insertꓽfile(graph, 'foo/glop.xyz')
		upsertꓽfolder(graph, 'foo/bar/gnokman/')

		return graph
	})()

	return {
		graph,
		files,
	}
}

/////////////////////////////////////////////////


/////////////////////////////////////////////////


export {
	type Basename,
	type RelativePath,

	createꓽgraphⵧfilesystem,
}
