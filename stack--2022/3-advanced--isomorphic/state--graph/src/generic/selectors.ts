import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { CustomNodeUId, Graph, Node } from './types.js'

/////////////////////////////////////////////////

function getꓽnodeⵧby_custom_id(graph: Immutable<Graph>, node_cuid: CustomNodeUId): Immutable<Node> {
	assert(graph.nodes_uids_by_custom_id[node_cuid], `Node with cuid "${node_cuid}" should exist!`)
	const node_uid = graph.nodes_uids_by_custom_id[node_cuid]!

	assert(graph.nodes_by_uid[node_uid])

	return graph.nodes_by_uid[node_uid]!
}

function getꓽnodes‿cuid(graph: Immutable<Graph>): CustomNodeUId[] {
	return Object.keys(graph.nodes_uids_by_custom_id)
}

/////////////////////////////////////////////////

export {
	getꓽnodeⵧby_custom_id,
	getꓽnodes‿cuid,
}
