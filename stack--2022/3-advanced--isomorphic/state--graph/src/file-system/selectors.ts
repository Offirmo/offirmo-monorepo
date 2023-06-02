import assert from 'tiny-invariant'
import { Immutable } from '../embedded-deps/immutable.js'

import * as Graph from '../generic/index.js'

import { FileSystem, Path } from './types.js'

/////////////////////////////////////////////////

function getꓽfilesⵧall(fs: Immutable<FileSystem>): Path[] {
	const nodes‿cuid = Graph.getꓽnodesⵧall‿cuid(fs.graph)
	return nodes‿cuid.filter(cuid => !cuid.endsWith(fs.options.separator))
}

function getꓽfoldersⵧall(fs: Immutable<FileSystem>): Path[] {
	const nodes‿cuid = Graph.getꓽnodesⵧall‿cuid(fs.graph)
	return nodes‿cuid.filter(cuid => cuid.endsWith(fs.options.separator))
}

function getꓽchildren_of(fs: Immutable<FileSystem>, folder_path: Path | '/'): Path[] {
	const SEP = fs.options.separator
	if (folder_path.startsWith(SEP)) folder_path = folder_path.slice(SEP.length)
	if (!folder_path.endsWith(SEP)) folder_path = folder_path + SEP

	const nodes = Graph.getꓽnodesⵧsuccessors_of(
		fs.graph,
		folder_path === '/'
			? 'root'
			: Graph.getꓽnodeⵧby_custom_id(fs.graph, folder_path)
	)

	return nodes.map(node => node.custom_id)
}

// TODO get empty folders
// etc.

/////////////////////////////////////////////////

export {
	getꓽfilesⵧall,
	getꓽfoldersⵧall,

	getꓽchildren_of,
}
