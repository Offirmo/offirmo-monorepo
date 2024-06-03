import {
	BaseRenderingOptions,
	OnConcatenateStringParams,
	OnConcatenateSubNodeParams,
	OnTypeParams,
	walk,
	WalkerCallbacks,
	WalkerReducer,
} from '../walk.js'
import { Node, CheckedNode } from '../types.js'

/////////////////////////////////////////////////

interface Action {
	$node: CheckedNode
	type: 'link' | undefined
	data: any
	// priority ?
	// TODO more
}

interface RenderingOptionsⵧToActions extends BaseRenderingOptions {}
const DEFAULT_RENDERING_OPTIONSⵧToActions= Object.freeze<RenderingOptionsⵧToActions>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
})

type State = {
	actions: Action[],
}

const on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptionsⵧToActions> = ({$type, state, $node, depth}) => {
	//console.log('[on_type]', { $type, state })

	if ($node.$hints.href) {
		state.actions.push({
			$node,
			type: 'link',
			data: $node.$hints.href, // TODO escaping for security? (This is debug, see React renderer which will do)
		})
	}

	return state
}

const on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptionsⵧToActions> = ({state, sub_state, $node, $id, $parent_node}) => {
	state.actions = state.actions.concat(...sub_state.actions)

	return state
}

const callbacksⵧto_actions: Partial<WalkerCallbacks<State, RenderingOptionsⵧToActions>> = {
	on_nodeⵧenter: () => ({
		actions: [],
	}),
	on_concatenateⵧstr: ({state, str}: OnConcatenateStringParams<State>) => {
		// nothing
		return state
	},
	on_concatenateⵧsub_node,
	on_type,
}

function renderⵧto_actions($doc: Node, options: RenderingOptionsⵧToActions = DEFAULT_RENDERING_OPTIONSⵧToActions): Action[] {
	return walk<State, RenderingOptionsⵧToActions>($doc, callbacksⵧto_actions, options).actions
}

/////////////////////////////////////////////////

export {
	type Action,
	type RenderingOptionsⵧToActions,
	DEFAULT_RENDERING_OPTIONSⵧToActions,
	renderⵧto_actions,
	callbacksⵧto_actions,
}
