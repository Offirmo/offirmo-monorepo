import assert from 'tiny-invariant'
import { Immutable } from '../embedded-deps/immutable.js'

import {
	Graph,

	Node, NodeUId, CustomNodeUId,
	Link, LinkUId, CustomLinkUId,

	Options,
} from './types.js'
import {
	_assert_custom_node_id_is_valid,
	_assert_custom_id_is_valid,
} from './utils.js'
import {
	getꓽnodeⵧby_custom_id,
} from './selectors.js'

/////////////////////////////////////////////////

const PAD_LENGTH = 3

function create(options: Immutable<Partial<Options>> = {}): Immutable<Graph> {

	if (options.is_arborescence === true) {
		assert(options.is_directed !== false, `option is_directed and is_arborescence should not clash`) // a tree is always directed
		assert(options.allows_cycles !== true, `option allows_cycles and is_arborescence should not clash`) // a tree is always directed
		assert(options.allows_loops !== true, `option allows_loops and is_arborescence should not clash`) // a tree is always directed
		assert(options.allows_duplicate_links !== true, `option allows_duplicate_links and is_arborescence should not clash`) // a tree is always directed
	}

	return {
		options: {
			// defaults
			is_arborescence: false,
			is_directed: !!options.is_arborescence,
			allows_cycles: !options.is_arborescence,
			allows_loops: !options.is_arborescence,
			allows_duplicate_links: !options.is_arborescence,
			auto_link_id_separator: '→',
			// overrides
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
		links_from: [],
		...(graph.options.is_arborescence && { depth: 0 }),
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

function _insertꓽedge(graph: Immutable<Graph>, nodeⵧfrom: Immutable<Node>, nodeⵧto: Immutable<Node>, custom_id?: CustomLinkUId): Immutable<Graph> {
	let uid = _getꓽedge_internal_uid(graph, nodeⵧfrom.uid, nodeⵧto.uid)
	if (graph.options.allows_duplicate_links && custom_id) {
		uid = `${uid}/${String(graph.uid_generator)}`
		graph = {
			...graph,
			uid_generator: graph.uid_generator + 1,
		}
	}

	const edge = {
		uid,
		...(custom_id && { custom_id }),
		from: nodeⵧfrom.uid,
		to: nodeⵧto.uid,
	} as Link
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

	nodeⵧfrom = {
		...nodeⵧfrom,
		links_from: [
			...nodeⵧfrom.links_from,
			uid,
		].sort(),
	}
	graph = {
		...graph,
		nodes_by_uid: {
			...graph.nodes_by_uid,
			[nodeⵧfrom.uid]: nodeⵧfrom,
		}
	}

	if (graph.options.is_arborescence) {
		assert(nodeⵧto.depth === 0, `When the graph is an arborescence, on link insertion, the target node should have depth = 0!`)
		assert(Object.keys(nodeⵧto.links_from).length === 0, `When the graph is an arborescence, on link insertion, the target node should be freshly created!`) // we could implement differently and recursively increase the depth but no use case for now
		assert(nodeⵧfrom.depth !== undefined, `When the graph is an arborescence, on link insertion, the source node should have a depth!`) // internal error
		nodeⵧto = {
			...nodeⵧto,
			depth: nodeⵧfrom.depth + 1,
		}
		graph = {
			...graph,
			nodes_by_uid: {
				...graph.nodes_by_uid,
				[nodeⵧto.uid]: nodeⵧto,
			}
		}
	}

	return graph
}

/*
 * from/to
 * - will be normalized (auto-sorted) if the graph is not "directed"
 * edge_id:
 * - will be auto-generated if not provided
 * - must be unique if provided
 */
function insertꓽedge(graph: Immutable<Graph>, node_cuidⵧfrom: CustomNodeUId, node_cuidⵧto: CustomNodeUId, edge_cuid?: CustomLinkUId): Immutable<Graph> {
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

	return _insertꓽedge(graph, nodeⵧfrom, nodeⵧto, edge_cuid)
}

// same arguments as insert
function upsertꓽedge(graph: Immutable<Graph>, node_cuidⵧfrom: CustomNodeUId, node_cuidⵧto: CustomNodeUId, edge_cuid?: CustomLinkUId): Immutable<Graph> {
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

	return _insertꓽedge(graph, nodeⵧfrom, nodeⵧto, edge_cuid)
}

/////////////////////////////////////////////////

// insert all the nodes + links between them by index order
function upsertꓽbranch(graph: Immutable<Graph>, ...node_cuids: CustomNodeUId[]): Immutable<Graph> {
	node_cuids.forEach(node_cuid => {
		_assert_custom_node_id_is_valid(graph, node_cuid)
	})

	node_cuids.forEach((node_cuid, index) => {
		graph = upsertꓽnode(graph, node_cuid)

		if (index > 0) {
			// add the edge TO this node
			const node_cuidⵧfrom = node_cuids[index - 1]!
			graph = upsertꓽedge(graph, node_cuidⵧfrom, node_cuid)
		}
	})

	return graph
}

/////////////////////////////////////////////////

export {
	create,
	insertꓽnode,
	upsertꓽnode,
	insertꓽedge,
	upsertꓽedge,
	upsertꓽbranch
}
