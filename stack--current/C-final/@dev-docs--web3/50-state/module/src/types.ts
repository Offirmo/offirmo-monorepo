import type { NodeId } from '@dev-docs--web3/types'

/////////////////////////////////////////////////

interface NodeSettings {
	isꓽdisabled?: boolean // if absent, auto behavior (ex. status filtering). If present, override any other behavior
	isꓽstarred?: boolean
	isꓽread?: boolean
}

// shared across tabs
interface SharedState {
	node_settings: { [id: NodeId]: NodeSettings }
	disabled_statuses: Array<string>
}

// tab specific state, not shared across tabs
interface State {
	shared: SharedState
}

/////////////////////////////////////////////////

export { type NodeSettings, type SharedState, type State }
