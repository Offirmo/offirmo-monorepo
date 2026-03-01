import type { NodeId } from '@dev-docs--web3/types'
import type { State } from './types.ts'

/////////////////////////////////////////////////

function create(): State {
	return {
		shared: {
			node_settings: {

			},
			disabled_statuses: [
				// dev docs for builders,
				// by default we want only stuff we can build on
				'draft',
				//'final',
				//'last call',
				//'living',
				'moved',
				'review',
				'stagnant',
				'withdrawn',
			],
		},
	}
}

function disable_node(state: State, node_id: NodeId): State {
	if (state.shared.node_settings[node_id]?.isꓽdisabled) return state

	return {
		...state,
		shared: {
			...state.shared,
			node_settings: {
				...state.shared.node_settings,
				[node_id]: { ...state.shared.node_settings[node_id], isꓽdisabled: true },
			},
		},
	}
}

function disable_status(state: State, status: string): State {
	if (state.shared.disabled_statuses.includes(status)) return state

	return {
		...state,
		shared: {
			...state.shared,
			// TODO set! XXX bug
			disabled_statuses: [...state.shared.disabled_statuses, status],
		},
	}
}

/////////////////////////////////////////////////

export { create, disable_node, disable_status }
