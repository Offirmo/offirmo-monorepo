import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { CustomNodeUId, Graph, Node, NodeUId } from './types.js'
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

function getꓽnodesⵧall‿cuid(graph: Immutable<Graph>): CustomNodeUId[] {
	return Object.keys(graph.nodes_uids_by_custom_id)
}

// a source vertex is a vertex with indegree zero https://en.wikipedia.org/wiki/Vertex_(graph_theory)#Types_of_vertices
function getꓽnodesⵧsource(graph: Immutable<Graph>): Immutable<Node>[] {
	const nodes_with_links_to = new Set<NodeUId>()

	Object.values(graph.edges_by_uid).forEach(edge => {
		nodes_with_links_to.add(edge.to)
	})

	return Object.values(graph.nodes_by_uid).filter(node => !nodes_with_links_to.has(node.uid))
}

function getꓽnodesⵧsuccessors_of(graph: Immutable<Graph>, node: Immutable<Node> | 'root'): Immutable<Node>[] {
	return node === 'root'
		? getꓽnodesⵧsource(graph)
		: node.links_from
			.map(edge_uid => graph.edges_by_uid[edge_uid]!)
			.map(edge => edge.to)
			.map(node_uid => graph.nodes_by_uid[node_uid]!)
}

function getꓽnodesⵧby_depth(graph: Immutable<Graph>, depth: number): Immutable<Node>[] {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	return Object.values(graph.nodes_by_uid).filter(node => node.depth === depth)
}

/////////////////////////////////////////////////

function getꓽarborescence_view(graph: Immutable<Graph>): string {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	return [
		`[root]`,
		...getꓽnodesⵧsuccessors_of(graph, 'root')
			.map((node, i, a) => _getꓽarborescence_view(
				graph,
				node,
				0,
				i === a.length - 1,
				'',
				)),
	].join('\n')
}

function _getꓽarborescence_view(graph: Immutable<Graph>, node: Immutable<Node>, depth: number, is_last: boolean, padding: string): string {
	return [
		 `${padding}${is_last?'└':'├'} ${node.custom_id}`, // [${node.uid}]  (${node.depth})
		...getꓽnodesⵧsuccessors_of(graph, node)
			.map((child_node, i, a) => _getꓽarborescence_view(
				graph,
				child_node,
				depth + 1,
				i === a.length - 1,
				padding + (is_last ? '  ' : '│ ')
			)),
	].join('\n')
}

/////////////////////////////////////////////////

export {
	getꓽnodeⵧby_custom_id,
	getꓽnodesⵧall‿cuid,
	getꓽnodesⵧsource,
	getꓽnodesⵧsuccessors_of,
	getꓽnodesⵧby_depth,

	getꓽarborescence_view,
}
