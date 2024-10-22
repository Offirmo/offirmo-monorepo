import { type URI‿x } from '@offirmo-private/ts-types-web'
import { type Hyperlink } from '@offirmo-private/ts-types-web'

import {
	BaseRenderingOptions,
	OnConcatenateStringParams,
	OnConcatenateSubNodeParams,
	OnTypeParams,
	walk,
	WalkerCallbacks,
	WalkerReducer,
} from '../walk.js'
import { Node, CheckedNode, NodeLike } from '../types.js'

/////////////////////////////////////////////////

interface BaseAction {
	$node: CheckedNode // the node where this action was found
}

interface HyperlinkAction extends BaseAction {
	type: 'hyperlink'
	link: Hyperlink
}

// the data to embed as "hint"
interface EmbeddedReducerAction {
	cta?: string // optional bc should ideally be derived from the action (esp. for i18n) BUT same action could have different CTA following the context (ex. equip best equipment)
	payload: any // the data of the action, could be anything
	href?: URI‿x // optional URL to navigate to following the action
}
// the final action yielded by this renderer
interface ReducerAction extends BaseAction, EmbeddedReducerAction {
	type: 'action' // in the sense of reducer(action)
}

type Action =
	| HyperlinkAction
	| ReducerAction

interface RenderingOptionsⵧToActions extends BaseRenderingOptions {
	getꓽactions: (node: CheckedNode) => Action[] // will be executed on every node
}

const DEFAULT_RENDERING_OPTIONSⵧToActions= Object.freeze<RenderingOptionsⵧToActions>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
	getꓽactions: ($node: CheckedNode): Action[] => {
		const actions: Action[] = []

		if ($node.$hints['href']) {
			actions.push({
				$node,
				type: 'hyperlink',
				link: {
					// TODO default CTA from $node itself?
					href: $node.$hints['href'], // TODO escaping for security? (This is debug, see React renderer which will do)
					rel: [],
				},
			})
		}

		if ($node.$hints['actions']) {
			actions.push(...$node.$hints['actions'].map((action: EmbeddedReducerAction): ReducerAction => {
				return {
					// TODO default CTA from $node itself?
					...action,
					$node,
					type: 'action',
				}
			}))
		}

		if ($node.$hints['links']) {
			actions.push(...Object.values<any>($node.$hints['links']).map((link: Hyperlink): HyperlinkAction => {
				return {
					$node,
					type: 'hyperlink',
					link,
				}
			}))
		}

		return actions
	},
})

type State = {
	actions: Action[],
}


const on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptionsⵧToActions> = ({$type, state, $node, depth}, { getꓽactions }) => {
	//console.log('[on_type]', { $type, state })

	state.actions.push(...getꓽactions($node))

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

function renderⵧto_actions($doc: NodeLike, options: RenderingOptionsⵧToActions = DEFAULT_RENDERING_OPTIONSⵧToActions): Action[] {
	if (typeof $doc !== 'object') {
		return []
	}
	return walk<State, RenderingOptionsⵧToActions>($doc, callbacksⵧto_actions, options).actions
}

/////////////////////////////////////////////////

export {
	type HyperlinkAction,
	type ReducerAction, type EmbeddedReducerAction,
	type Action,
	type RenderingOptionsⵧToActions,

	DEFAULT_RENDERING_OPTIONSⵧToActions,

	renderⵧto_actions,

	callbacksⵧto_actions,
}
