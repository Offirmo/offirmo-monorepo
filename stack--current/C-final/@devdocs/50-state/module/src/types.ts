import type { NodeId } from '@devdocs/types'

/////////////////////////////////////////////////

// shared across tabs
interface SharedState {
	disabled_nodes: Array<NodeId>
	disabled_statuses: Array<string>
}

// tab specific state, not shared across tabs
interface State {
	shared: SharedState
}

/////////////////////////////////////////////////

export { type SharedState, type State }
