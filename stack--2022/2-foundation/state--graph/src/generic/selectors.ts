import assert from 'tiny-invariant'
import { Immutable } from '../embedded-deps/immutable.js'

import { Graph,
	Node, NodeUId, CustomNodeUId,
	CustomLinkUId,
} from './types.js'
import {
	_assert_custom_node_id_is_valid
} from './utils.js'

/////////////////////////////////////////////////

// pre-condition that a node was inserted. Will throw otherwise.
// will NOT work with UPsert!
function getꓽnodeⵧlast_inserted‿cuid(graph: Immutable<Graph>): CustomNodeUId {
	assert(graph.last_inserted_node‿uid, `A node should have previously been inserted!`)

	return graph.nodes_by_uid[graph.last_inserted_node‿uid]!.custom_id
}

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

	Object.values(graph.links_by_uid).forEach(link => {
		nodes_with_links_to.add(link.to)
	})

	return Object.values(graph.nodes_by_uid).filter(node => !nodes_with_links_to.has(node.uid))
}

function getꓽnodesⵧsuccessors_of(graph: Immutable<Graph>, node: Immutable<Node> | 'root'): Immutable<Node>[] {
	return node === 'root'
		? getꓽnodesⵧsource(graph)
		: node.links_from
			.map(link_uid => graph.links_by_uid[link_uid]!)
			.map(link => link.to)
			.map(node_uid => graph.nodes_by_uid[node_uid]!)
}

// arborescences only!
function getꓽnodesⵧby_depth(graph: Immutable<Graph>, depth: number): Immutable<Node>[] {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	return Object.values(graph.nodes_by_uid).filter(node => node.depth === depth)
}


/////////////////////////////////////////////////

// pre-condition that a link was inserted. Will throw otherwise.
// pre-condition that the link was inserted WITH A CUSTOM UID (or else why accessing it?). Will throw otherwise.
// will NOT work with UPsert!
function getꓽlinkⵧlast_inserted‿cuid(graph: Immutable<Graph>): CustomLinkUId {
	assert(graph.last_inserted_link‿uid, `A link should have previously been inserted!`)
	const link = graph.links_by_uid[graph.last_inserted_link‿uid]!
	assert(link.custom_id, `The last inserted link should have a custom id!`)

	return link.custom_id
}

/////////////////////////////////////////////////

function getꓽrepresentationⵧarborescence(graph: Immutable<Graph>): string {
	assert(graph.options.is_arborescence, `Should be an arborescence!`)

	return [
		`[root]`,
		...getꓽnodesⵧsuccessors_of(graph, 'root')
			.map((node, i, a) => _getꓽrepresentationⵧarborescence(
				graph,
				node,
				0,
				i === a.length - 1,
				'',
				)),
	].join('\n')
}

function _getꓽrepresentationⵧarborescence(graph: Immutable<Graph>, node: Immutable<Node>, depth: number, is_last: boolean, padding: string): string {
	return [
		 `${padding}${is_last?'└':'├'} ${node.custom_id}`, // [${node.uid}]  (${node.depth})
		...getꓽnodesⵧsuccessors_of(graph, node)
			.map((child_node, i, a) => _getꓽrepresentationⵧarborescence(
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
	getꓽnodeⵧlast_inserted‿cuid,
	getꓽnodeⵧby_custom_id,
	getꓽnodesⵧall‿cuid,
	getꓽnodesⵧsource,
	getꓽnodesⵧsuccessors_of,
	getꓽnodesⵧby_depth,

	getꓽlinkⵧlast_inserted‿cuid,

	getꓽrepresentationⵧarborescence,
}
