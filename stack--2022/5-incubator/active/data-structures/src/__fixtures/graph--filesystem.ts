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
 * - ideally we'd like to be able to use a subtree as a tree for easy recursion
 */

import assert from 'tiny-invariant'
import { RelativePath } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

function createꓽgraphⵧfilesystem<Graph = any>(
	create: () => Graph,
	insertꓽfile: (graph: Graph, path: RelativePath) => RelativePath,
	upsertꓽfolder: (graph: Graph, path: RelativePath) => RelativePath,
): { graph: Graph, files: RelativePath[] } {

	let files: RelativePath[] = []
	let _insertꓽfile = insertꓽfile
	insertꓽfile = (graph, path) => {
		const normalized_path = _insertꓽfile(graph, path)
		files.push(normalized_path)
		return normalized_path
	}

	const graph = (() => {
		const graph = create()

		insertꓽfile(graph, 'foo/bar/baz.xyz')
		insertꓽfile(graph, 'foo/gloups.xyz')
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
	createꓽgraphⵧfilesystem,
}
