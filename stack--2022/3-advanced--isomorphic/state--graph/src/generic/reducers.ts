import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import {
	Graph,

	Node, NodeUId, CustomNodeUId,
	Edge, EdgeUId, CustomEdgeUId,

	Options,
} from './types.js'
import {
	getꓽnodeⵧby_custom_id,
} from './selectors.js'

/////////////////////////////////////////////////

const PAD_LENGTH = 3

function create(options: Immutable<Partial<Options>> = {}): Immutable<Graph> {
	return {
		options: {
			is_directed: false, // if not,
			allows_cycles: true,
			allows_duplicate_edges: true,
			auto_edge_id_separator: '→',
			...options,
		},
		uid_generator: 0,
		nodes_by_uid: {},
		edges_by_uid: {},
		nodes_uids_by_custom_id: {},
		edges_uids_by_custom_id: {},
	}
}

////////////////////////////////////

// TODO unicode normalization?

function _assert_custom_id_is_valid(graph: Immutable<Graph>, cuid: CustomNodeUId | CustomEdgeUId) {
	assert(cuid.length > 0)
	assert(cuid.trim() === cuid)
}

function _assert_custom_node_id_is_valid(graph: Immutable<Graph>, node_cuid: CustomNodeUId) {
	_assert_custom_id_is_valid(graph, node_cuid)
	assert(!node_cuid.includes(graph.options.auto_edge_id_separator))
}

function _getꓽedge_internal_uid(graph: Immutable<Graph>, node_uidⵧfrom: NodeUId, node_uidⵧto: NodeUId) {
	return `${node_uidⵧfrom}→${node_uidⵧto}`
}

////////////////////////////////////

function _insertꓽnode(graph: Immutable<Graph>, node_cuid: CustomNodeUId): Immutable<Graph> {
	const uid = `n${String(graph.uid_generator).padStart(PAD_LENGTH, '0')}`
	graph = {
		...graph,
		uid_generator: graph.uid_generator + 1,
	}

	const node = {
		uid,
		custom_id: node_cuid,
		edges_from: [],
	} as Node

	return {
		...graph,

		nodes_by_uid: {
			...graph.nodes_by_uid,
			[uid]: node,
		},

		nodes_uids_by_custom_id: {
			...graph.nodes_uids_by_custom_id,
			[node_cuid]: uid,
		}
	}
}

function insertꓽnode(graph: Immutable<Graph>, node_cuid: CustomNodeUId): Immutable<Graph> {
	_assert_custom_node_id_is_valid(graph, node_cuid)
	assert(!graph.nodes_uids_by_custom_id[node_cuid], `Graph: node "${node_cuid}" should not already exist!`)

	return _insertꓽnode(graph, node_cuid)
}

// same arguments as insert
function upsertꓽnode(graph: Immutable<Graph>, node_cuid: CustomNodeUId): Immutable<Graph> {
	_assert_custom_node_id_is_valid(graph, node_cuid)

	if (graph.nodes_uids_by_custom_id[node_cuid])
		return graph // no change

	return _insertꓽnode(graph, node_cuid)
}

////////////////////////////////////

function _insertꓽedge(graph: Immutable<Graph>, from_uid: NodeUId, to_uid: NodeUId, custom_id?: CustomEdgeUId): Immutable<Graph> {
	let uid = _getꓽedge_internal_uid(graph, from_uid, to_uid)
	if (graph.options.allows_duplicate_edges && custom_id) {
		uid = `${uid}/${String(graph.uid_generator)}`
		graph = {
			...graph,
			uid_generator: graph.uid_generator + 1,
		}
	}

	const edge = {
		uid,
		...(custom_id && { custom_id }),
		from: from_uid,
		to: to_uid,
	} as Edge

	graph = {
		...graph,

		edges_by_uid: {
			...graph.edges_by_uid,
			[uid]: edge,
		},
	}

	if (custom_id) {
		graph = {
			...graph,

			edges_uids_by_custom_id: {
				...graph.edges_uids_by_custom_id,
				[custom_id]: uid,
			},
		}
	}

	// TODO update nodes links
	// TODO update depth

	return graph
}

/*
 * from/to
 * - will be normalized (auto-sorted) if the graph is not "directed"
 * edge_id:
 * - will be auto-generated if not provided
 * - must be unique if provided
 */
function insertꓽedge(graph: Immutable<Graph>, node_cuidⵧfrom: CustomNodeUId, node_cuidⵧto: CustomNodeUId, edge_cuid?: CustomEdgeUId): Immutable<Graph> {
	if (edge_cuid) {
		_assert_custom_id_is_valid(graph, edge_cuid)
		assert(!graph.edges_uids_by_custom_id[edge_cuid], `edge id "${edge_cuid}" should not already exist!`)
	}

	_assert_custom_node_id_is_valid(graph, node_cuidⵧfrom)
	_assert_custom_node_id_is_valid(graph, node_cuidⵧto)

	if (!graph.options.is_directed) {
		// normalize from->to
		if (node_cuidⵧfrom > node_cuidⵧto) {
			const temp = node_cuidⵧfrom
			node_cuidⵧfrom = node_cuidⵧto
			node_cuidⵧto = temp
		}
	}

	const nodeⵧfrom = getꓽnodeⵧby_custom_id(graph, node_cuidⵧfrom)
	const nodeⵧto = getꓽnodeⵧby_custom_id(graph, node_cuidⵧto)

	if (!edge_cuid) {
		let uid = _getꓽedge_internal_uid(graph, nodeⵧfrom.uid, nodeⵧto.uid)
		assert(!graph.edges_by_uid[uid], `edge between "${nodeⵧfrom.custom_id}" and "${nodeⵧto.custom_id}" should not already exist!`)
	}

	return _insertꓽedge(graph, nodeⵧfrom.uid, nodeⵧto.uid, edge_cuid)
}

// same arguments as insert
function upsertꓽedge(graph: Immutable<Graph>, node_cuidⵧfrom: CustomNodeUId, node_cuidⵧto: CustomNodeUId, edge_cuid?: CustomEdgeUId): Immutable<Graph> {
	if (edge_cuid) {
		_assert_custom_id_is_valid(graph, edge_cuid)
		if (graph.edges_uids_by_custom_id[edge_cuid]) return graph
	}

	_assert_custom_node_id_is_valid(graph, node_cuidⵧfrom)
	_assert_custom_node_id_is_valid(graph, node_cuidⵧto)

	if (!graph.options.is_directed) {
		// normalize from->to
		if (node_cuidⵧfrom > node_cuidⵧto) {
			const temp = node_cuidⵧfrom
			node_cuidⵧfrom = node_cuidⵧto
			node_cuidⵧto = temp
		}
	}

	const nodeⵧfrom = getꓽnodeⵧby_custom_id(graph, node_cuidⵧfrom)
	const nodeⵧto = getꓽnodeⵧby_custom_id(graph, node_cuidⵧto)

	if (!edge_cuid) {
		let uid = _getꓽedge_internal_uid(graph, nodeⵧfrom.uid, nodeⵧto.uid)
		if (graph.edges_by_uid[uid]) return graph
	}

	return _insertꓽedge(graph, nodeⵧfrom.uid, nodeⵧto.uid, edge_cuid)
}


/////////////////////////////////////////////////

export {
	create,
	insertꓽnode,
	upsertꓽnode,
	insertꓽedge,
	upsertꓽedge,
}
