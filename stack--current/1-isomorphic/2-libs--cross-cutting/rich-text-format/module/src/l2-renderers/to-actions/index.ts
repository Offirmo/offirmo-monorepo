import type { Immutable } from '@offirmo-private/ts-types'
import { type Uri‿x, type Hyperlink, promote_toꓽhyperlink } from '@offirmo-private/ts-types-web'

import {
	type BaseRenderingOptions,
	type WalkerCallbacks,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from '../walk.ts'
import type { CheckedNode, NodeLike } from '../../l1-types/index.ts'

/////////////////////////////////////////////////

interface BaseAction {
	$node: Immutable<CheckedNode> // the node where this action was found

	// TODO add UI options? ex. pretend to work?
	// or an auto engagement? (see state--engagement)
	// should it be embedded in the action or early-returned by the HATEOAS server?
}

interface HyperlinkAction extends BaseAction {
	type: 'hyperlink'
	link: Hyperlink

	// TODO meta data? TODO identify use cases
}

// the data to embed as "hint"
interface EmbeddedReducerAction {
	cta?: string // optional bc should ideally be derived from the action (esp. for i18n) BUT same action could have different CTA following the context (ex. equip best equipment)
	payload: any // the data of the action, could be anything
	href?: Uri‿x // optional URL to navigate to following the action
}
// the final action yielded by this renderer
interface ReducerAction extends BaseAction, EmbeddedReducerAction {
	type: 'reduce' // in the sense of reducer(action)
}

type Action =
	| HyperlinkAction
	| ReducerAction

interface RenderingOptionsⵧToActions extends BaseRenderingOptions {
	getꓽactions: (node: Immutable<CheckedNode>) => Action[] // will be executed on every node
}

const DEFAULT_RENDERING_OPTIONSⵧToActions= Object.freeze<RenderingOptionsⵧToActions>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
	getꓽactions: ($node) => {
		const actions: Action[] = []

		if ($node.$hints['href']) {
			// this node is a hyperlink to something
			const raw_link = $node.$hints['href']
			// TODO promote
			const hyperlink: Hyperlink = promote_toꓽhyperlink(raw_link, {
				// TODO default CTA from $node itself?
			})
			actions.push({
				$node,
				type: 'hyperlink',
				link: hyperlink,
			})
		}

		if ($node.$hints['actions']) {
			actions.push(...$node.$hints['actions'].map((action: EmbeddedReducerAction): ReducerAction => {
				return {
					// TODO default CTA from $node itself
					...action,
					$node,
					type: 'reduce',
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

type WalkState = {
	actions: Action[],
}

const create_state: WalkerCallbacks<WalkState, RenderingOptionsⵧToActions>['create_state'] = () => {
	return {
		actions: [],
	}
}

const on_type: WalkerCallbacks<WalkState, RenderingOptionsⵧToActions>['on_type'] = ({$type, state, $node, depth}, { getꓽactions }) => {
	//console.log('[on_type]', { $type, state })

	state.actions.push(...getꓽactions($node))

	return state
}

const on_concatenateⵧsub_node: WalkerCallbacks<WalkState, RenderingOptionsⵧToActions>['on_concatenateⵧsub_node'] = ({state, sub_state}) => {
	state.actions = state.actions.concat(...sub_state.actions)

	return state
}

const on_concatenateⵧstr: WalkerCallbacks<WalkState, RenderingOptionsⵧToActions>['on_concatenateⵧstr'] = ({state, str}) => {
	// nothing
	return state
}

const callbacksⵧto_actions: Partial<WalkerCallbacks<WalkState, RenderingOptionsⵧToActions>> = {
	create_state,
	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
	on_type,
}

function renderⵧto_actions($doc: Immutable<NodeLike>, options: Partial<RenderingOptionsⵧToActions> = {}): Action[] {
	if (typeof $doc !== 'object') {
		return []
	}
	const full_options: RenderingOptionsⵧToActions = {
		...DEFAULT_RENDERING_OPTIONSⵧToActions,
		...options,
	}
	return walk<WalkState, RenderingOptionsⵧToActions>($doc, callbacksⵧto_actions, full_options).actions
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
