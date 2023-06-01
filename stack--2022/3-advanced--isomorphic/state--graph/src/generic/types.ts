
/////////////////////////////////////////////////

// since we implement Adjacency List storage through a map, all those ids should be strings
// we allow custom ids while also using smaller auto-generated internal ids under the hood
type NodeUId = string
type EdgeUId = string
type CustomNodeUId = string
type CustomEdgeUId = string

interface Options {
	is_directed: boolean
	allows_cycles: boolean
	allows_duplicate_edges: boolean
	auto_edge_id_separator: string // must not appear in node ids

	//get_unique_id: Function | undefined
}

interface Node {
	custom_id: CustomNodeUId // nodes MUST have a custom id

	uid: NodeUId

	edges_from: EdgeUId[]
}

interface Edge {
	custom_id?: CustomEdgeUId // edges don't always need a custom id

	uid: EdgeUId

	from: NodeUId
	to: NodeUId

	// TODO weight?
}

interface Graph {
	options: Options

	uid_generator: number

	nodes_by_uid: {
		[k: NodeUId]: Node
	}
	edges_by_uid: {
		[k: EdgeUId]: Edge
	}

	nodes_uids_by_custom_id: {
		[k: CustomNodeUId]: NodeUId
	}

	edges_uids_by_custom_id: {
		[k: CustomEdgeUId]: EdgeUId
	}
}

/////////////////////////////////////////////////

export {
	type Graph,

	type Node, type NodeUId, type CustomNodeUId,
	type Edge, type EdgeUId, type CustomEdgeUId,

	type Options,
}
