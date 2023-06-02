import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { CustomNodeUId, Graph, Node } from './types.js'
import {
	_assert_custom_node_id_is_valid
} from './utils.js'

/////////////////////////////////////////////////

function getꓽnodeⵧby_custom_id(graph: Immutable<Graph>, node_cuid: CustomNodeUId): Immutable<Node> {
	_assert_custom_node_id_is_valid(graph, node_cuid)

	assert(graph.nodes_uids_by_custom_id[node_cuid], `Node with cuid "${node_cuid}" should exist!`)
	const node_uid = graph.nodes_uids_by_custom_id[node_cuid]!

	assert(graph.nodes_by_uid[node_uid], `A node should exist for the custom id!`)

	return graph.nodes_by_uid[node_uid]!
}

function getꓽnodes‿cuid(graph: Immutable<Graph>): CustomNodeUId[] {
	return Object.keys(graph.nodes_uids_by_custom_id)
}

function getꓽnodeⵧsuccessors(graph: Immutable<Graph>, node: Immutable<Node>): Immutable<Node>[] {
	return node.links_from
		.map(edge_uid => graph.edges_by_uid[edge_uid]!)
		.map(edge => edge.to)
		.map(node_uid => graph.nodes_by_uid[node_uid]!)
}

function getꓽnodesⵧby_depth(graph: Immutable<Graph>, depth: number): Immutable<Node>[] {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	return Object.values(graph.nodes_by_uid).filter(node => node.depth === depth)
}

/////////////////////////////////////////////////

function _temp(graph: Immutable<Graph>, node: Immutable<Node>, depth: number, is_last: boolean, padding: string): string {
	//let padding = Array.from({ length: depth }, () => `│ `).join('')

	return [
		`${padding}${is_last?'└':'├'} ${node.custom_id}`, // [${node.uid}]  (${node.depth})
		...getꓽnodeⵧsuccessors(graph, node)
			.map((node, i, a) => _temp(
				graph,
				node,
				depth + 1,
				i === a.length - 1,
				padding + (is_last ? '  ' : '│ ')
				)),
	].join('\n')
}

function getꓽarborescence_view(graph: Immutable<Graph>): string {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	const root_nodes = getꓽnodesⵧby_depth(graph, 0)

	//console.log(root_nodes)

	return [
		`[root]`,
		...root_nodes
			.map((node, i, a) => _temp(
				graph,
				node,
				0,
				i === a.length - 1,
				'',
				)),
	].join('\n')
}

/////////////////////////////////////////////////

export {
	getꓽnodeⵧby_custom_id,
	getꓽnodes‿cuid,
	getꓽnodesⵧby_depth,

	getꓽarborescence_view,
}
