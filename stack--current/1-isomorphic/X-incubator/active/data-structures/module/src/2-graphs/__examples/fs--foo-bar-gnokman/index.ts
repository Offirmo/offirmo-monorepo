import assert from 'tiny-invariant'
import type { RelativePath } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////

function createꓽgraph<Graph = any>(
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

export {
	createꓽgraph,
}
