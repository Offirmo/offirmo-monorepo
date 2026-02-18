import type { NodeId } from '@devdocs/types'
import type { State } from './types.ts'

/////////////////////////////////////////////////

function create(): State {
	return {
		shared: {
			disabled_nodes: [],
			disabled_statuses: [],
		},
	}
}

function disable_node(state: State, node_id: NodeId): State {
	if (state.shared.disabled_nodes.includes(node_id)) return state

	return {
		...state,
		shared: {
			...state.shared,
			disabled_nodes: [...state.shared.disabled_nodes, node_id],
		},
	}
}

function disable_status(state: State, status: string): State {
	if (state.shared.disabled_statuses.includes(status)) return state

	return {
		...state,
		shared: {
			...state.shared,
			disabled_statuses: [...state.shared.disabled_statuses, status],
		},
	}
}

/////////////////////////////////////////////////

export { create, disable_node, disable_status }
