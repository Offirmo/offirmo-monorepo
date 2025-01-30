/**
 * "walk" is the foundation on which all the renderer are based
 */

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { hasꓽshape, isꓽexact_stringified_number } from '@offirmo-private/type-detection'

import { LIB } from '../consts.ts'

import {
	NodeType,
	type CheckedNode,
	type Node,
} from '../l1-types/index.ts'

import { normalizeꓽnode } from '../l1-utils/normalize.ts'
import { promoteꓽto_node } from '../l1-utils/promote.ts'

/////////////////////////////////////////////////
// base rendering options

export interface BaseRenderingOptions {
	// what should happen if a sub-node could not be resolved?
	// (final, after calling resolve_unknown_subnode())
	shouldꓽrecover_from_unknown_sub_nodes:
		| false // don't
		| 'root' // allow looking at the root's sub-nodes, common use case is adding a few extraneous base sub-nodes at the root (beware of infinite loops)
		| 'placeholder' // NOT RECOMMENDED replace with an ugly placeholder. Useful if we can't afford to fail.
}

const DEFAULT_RENDERING_OPTIONSⵧWalk= Object.freeze<BaseRenderingOptions>({
	shouldꓽrecover_from_unknown_sub_nodes: 'root',
})


/////////////////////////////////////////////////
// Hooks

export interface BaseHookParams<State> {
	state: State
	$node: Immutable<CheckedNode>
	depth: number
}

// NODE -- ENTER
// Useful for:
// - initialising the state
export interface OnNodeEnterParams<State> extends BaseHookParams<State> {
	$id: string
}
// NODE -- EXIT
export interface OnNodeExitParams<State> extends BaseHookParams<State> {
	$id: string
}

// CONCAT STRING
export interface OnConcatenateStringParams<State> extends BaseHookParams<State> {
	str: string
}
// CONCAT SUB-NODE
// REMINDER this is done at the PARENT level => node, state, depth all refer to the parent node concatenating the child
export interface OnConcatenateSubNodeParams<State> extends BaseHookParams<State> {
	$sub_node_id: string
	$sub_node: Immutable<Node>
	sub_state: State // IMPORTANT: this is where the parent node can "consume" the child state into its own state
}
// FILTER
export interface OnFilterParams<State> extends BaseHookParams<State> {
	$filter: string
	$filters: string[]
}
// CLASS
export interface OnClassParams<State> extends BaseHookParams<State> {
	$class: string
}
// TYPE
export interface OnTypeParams<State> extends BaseHookParams<State> {
	$type: NodeType
	$parent_node: Immutable<CheckedNode> | null
}

export interface UnknownSubNodeResolver<State, RenderingOptions> {
	($sub_node_id: string, context: BaseHookParams<State>, options: RenderingOptions): Node | undefined
}


interface WalkerStateCreator<State, RenderingOptions> {
	(parent_state: State | undefined, options: RenderingOptions): State
}

interface WalkerReducer<State, P extends BaseHookParams<State>, RenderingOptions> {
	(params: P, options: RenderingOptions): State
}

interface WalkerCallbacks<State, RenderingOptions extends BaseRenderingOptions> {
	create_state: WalkerStateCreator<State, RenderingOptions>

	on_nodeⵧenter: WalkerReducer<State, OnNodeEnterParams<State>, RenderingOptions>
	on_nodeⵧexit: WalkerReducer<State, OnNodeExitParams<State>, RenderingOptions>

	on_concatenateⵧstr: WalkerReducer<State, OnConcatenateStringParams<State>, RenderingOptions>
	on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptions>

	on_classⵧbefore: WalkerReducer<State, OnClassParams<State>, RenderingOptions>
	on_classⵧafter: WalkerReducer<State, OnClassParams<State>, RenderingOptions>

	on_filter: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>
	on_filterꘌCapitalize: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>
	// extensions
	//[on_filterꘌxyz: string]: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>,

	resolve_unknown_subnode: UnknownSubNodeResolver<State, RenderingOptions>

	on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>
	// select known specials
	on_typeꘌhr?: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>
	on_typeꘌbr?: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>
	// extensions
	//[on_typeꘌxyz: string]: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>,

	// hard to type strictly
	[on_filter_or_type: string]: any
}

function _getꓽcallbacksⵧdefault<State, RenderingOptions extends BaseRenderingOptions = any>(): WalkerCallbacks<State, RenderingOptions> {
	function nothing(): void {}
	function identity({state}: {state: State}): State {
		return state
	}

	return {
		create_state: () => 'YOU NEED TO IMPLEMENT create_state()!' as any, // tricky to get right

		on_nodeⵧenter: identity, //() => { throw new Error('Please define on_nodeⵧenter()!') },
		on_nodeⵧexit: identity,

		on_concatenateⵧstr: identity,
		on_concatenateⵧsub_node: identity,

		on_classⵧbefore: identity,
		on_classⵧafter: identity,

		resolve_unknown_subnode($sub_node_id: string, context: BaseHookParams<State>, options: RenderingOptions): Node | undefined {
			// BEWARE OF INFINITE LOOPS!
			// RECOMMENDED TO ONLY RETURN SIMPLE NODES (just text)
			return undefined
		},

		on_filter: identity,
		on_filterꘌCapitalize: ({state}: {state: State}) => {
			// generic processing that works for text, ansi, React...
			const generic_state = state as any
			if (generic_state && typeof generic_state.str === 'string') {
				//console.log(`${LIB} auto capitalizing...`, state)
				const str = '' + generic_state.str
				return {
					...(generic_state as any),
					str: str.slice(0,1).toUpperCase() + str.slice(1),
				} satisfies State
			}

			return state
		},

		on_type: identity,
	}
}

const SUB_NODE_BR: Node = Object.freeze<Node>({
	$type: 'br',
})

const SUB_NODE_HR: Node = Object.freeze<Node>({
	$type: 'hr',
})

// special prop for lists
const SPECIAL_LIST_NODE_CONTENT_KEY = '_content'

interface InternalWalkState {
	$parent_node: Immutable<CheckedNode> | null,
	$id: string,
	depth: number,

	$root_node: Immutable<CheckedNode>, // for sub-node resolution "root" mode
	/*
		const context = parent_state
		? Object.create(parent_state.context)
		: Object.create(null) // NO auto-injections here, let's keep it simple. See core & common

	return {
		context,
	}
	 */
}


function _walk_content<ExternalWalkState, RenderingOptions extends BaseRenderingOptions>(
	$node: Immutable<CheckedNode>,
	callbacks: WalkerCallbacks<ExternalWalkState, RenderingOptions>,
	xstate: ExternalWalkState,
	depth: number,
	$root_node:  Immutable<CheckedNode>,
	options: RenderingOptions,
) {
	const { $content, $sub: $sub_nodes } = $node

	// $content looks like "Hello ⎨⎨world⎬⎬, welcome to ⎨⎨place|filter1|filter2⎬⎬
	const splitⵧby_opening_brace = $content.split('⎨⎨')
	const splitⵧby_closing_brace = $content.split('⎬⎬')

	// quick check for matching
	// 1. open and close count should match
	assert(splitⵧby_closing_brace.length === splitⵧby_opening_brace.length, `${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (1)`)
	// 2. should be ordered open - close - open - close...
	assert(splitⵧby_opening_brace.every(s => s.split('⎬⎬').length <= 2), `${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (2a)`)
	assert(splitⵧby_closing_brace.every(s => s.split('⎨⎨').length <= 2), `${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (2b)`)

	const initial_str: string = splitⵧby_opening_brace.shift()!
	if (initial_str) {
		assert(initial_str.split('⎬⎬').length === 1, `${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`)
		xstate = callbacks.on_concatenateⵧstr({
			str: initial_str,
			state: xstate,
			$node,
			depth,
		}, options)
	}

	xstate = splitⵧby_opening_brace.reduce((xstate: ExternalWalkState, param_and_text: string): ExternalWalkState => {
		const split_end = param_and_text.split('⎬⎬')
		if (split_end.length !== 2)
			throw new Error(`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`)

		// splitting the ⎨⎨place|filter1|filter2⎬⎬ content
		const [ $sub_node_id, ...$filters ] = split_end.shift()!.split('|')
		assert($sub_node_id, `${LIB}: syntax error in content "${$content}", empty ⎨⎨⎬⎬!`)

		let $sub_node = promoteꓽto_node((function _resolve_sub_node_by_id(): Immutable<CheckedNode>['$sub'][string] {
			if ($sub_node_id === 'br') {
				assert(!$sub_nodes[$sub_node_id], `${LIB}: error in content "${$content}", having a reserved subnode "${$sub_node_id}"!`)
				return SUB_NODE_BR
			}

			if ($sub_node_id === 'hr') {
				assert(!$sub_nodes[$sub_node_id], `${LIB}: error in content "${$content}", having a reserved subnode "${$sub_node_id}"!`)
				return SUB_NODE_HR
			}

			if ($sub_nodes[$sub_node_id]) {
				return $sub_nodes[$sub_node_id]!
			}

			// sub node is missing on the immediate node, advanced resolution:

			if (options.shouldꓽrecover_from_unknown_sub_nodes === 'root' && $root_node.$sub[$sub_node_id]) {
				return $root_node.$sub[$sub_node_id]!
			}

			const candidate_from_resolver = callbacks.resolve_unknown_subnode(
				$sub_node_id,
				{
					$node,
					depth,
					state: xstate,
				},
				options
			)
			if (candidate_from_resolver)
				return candidate_from_resolver

			if (options.shouldꓽrecover_from_unknown_sub_nodes === 'placeholder') {
				return { $content: `{{??${$sub_node_id}??}}` }
			}

			if (true) {
				console.error('shouldꓽrecover_from_unknown_sub_nodes FAILURE',)
				console.error($node, { $content, sub_node_id: $sub_node_id })
			}
			throw new Error(`${LIB}: syntax error in content "${$content}", it's referencing an unknown sub-node "${$sub_node_id}"! (recover mode = ${options.shouldꓽrecover_from_unknown_sub_nodes})`)
		})())

		let sub_state = _walk($sub_node, callbacks, options, {
			$parent_node: $node,
			$id: $sub_node_id,
			depth: depth + 1,
			$root_node,
		}, xstate)

		//console.log('[filters', $filters, '])
		sub_state = $filters.reduce(
			(state, $filter) => {
				const fine_filter_cb_id = `on_filterꘌ${$filter}`
				//console.log({fine_filter_cb_id})
				const fine_filter_callback = callbacks[fine_filter_cb_id] as WalkerReducer<ExternalWalkState, OnFilterParams<ExternalWalkState>, RenderingOptions>
				if (fine_filter_callback)
					state = fine_filter_callback({
						$filter,
						$filters,
						state,
						$node,
						depth,
					}, options)

				return callbacks.on_filter({
					$filter,
					$filters,
					state,
					$node,
					depth,
				}, options)
			},
			sub_state,
		)

		// Should we detect unused $subnodes?
		// NO it's convenient (ex. Oh-my-rpg) to over-set subnodes
		// and set a content which may or may not use them.

		xstate = callbacks.on_concatenateⵧsub_node({
			state: xstate,
			$node,
			depth,

			$sub_node_id,
			$sub_node,
			sub_state,
		}, options)

		if (split_end[0])
			xstate = callbacks.on_concatenateⵧstr({
				str: split_end[0],
				state: xstate,
				$node,
				depth,
			}, options)

		return xstate
	}, xstate)

	return xstate
}


/**
 * Walk recursively inside a node.
 * Must return a NEW "node" state.
 */
function _walk<ExternalWalkState, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Immutable<Node>,
	callbacks: Immutable<WalkerCallbacks<ExternalWalkState, RenderingOptions>>,
	options: RenderingOptions = {} as any,
	istate: InternalWalkState,
	parent_xstate: ExternalWalkState | undefined,
) {
	const {
		$parent_node,
		$id,
		depth,
		$root_node,
	} = istate
	const $node = normalizeꓽnode($raw_node)
	const {
		$type,
		$classes,
		$sub: $sub_nodes,
	} = $node

	let xstate = callbacks.create_state(parent_xstate, options)
	xstate = callbacks.on_nodeⵧenter({ state: xstate, $node, depth, $id }, options)

	// TODO one day if needed: class begin / start

	xstate = $classes.reduce(
		(state, $class) => callbacks.on_classⵧbefore({
			$class,
			state,
			$node,
			depth,
		}, options),
		xstate,
	)

	// walk down the content
	if ($type === 'ul' || $type === 'ol') {
		// special walk of sub-content for those
		const sorted_keys = Object.keys($sub_nodes).sort()
		//console.log('walk ul/ol', sorted_keys)
		sorted_keys.forEach(key => {
			if (isꓽexact_stringified_number(key)) {
				console.warn(
					`in sub-node '${$id}', the ul/ol key '${key}' suspiciously looks like a number: Beware of auto sorting!`,
					{
						$node,
						sorted_keys,
					},
				)
			}
		})
		sorted_keys.forEach(key => {
			const $sub_node: Immutable<Node> = {
				$type: NodeType.li,
				$content: `⎨⎨${SPECIAL_LIST_NODE_CONTENT_KEY}⎬⎬`,
				$sub: {
					[SPECIAL_LIST_NODE_CONTENT_KEY]: $sub_nodes[key]!,
				},
			}
			const sub_xstate = _walk( $sub_node, callbacks, options, {
				$parent_node: $node,
				depth: depth + 1,
				$id: key,
				$root_node,
			}, xstate)
			xstate = callbacks.on_concatenateⵧsub_node({
				state: xstate,
				$node,
				depth,

				$sub_node,
				sub_state: sub_xstate,
				$sub_node_id: key,
			}, options)
		})
	}
	else
		xstate = _walk_content($node, callbacks, xstate, depth, $root_node, options)

	xstate = $classes.reduce(
		(state, $class) => callbacks.on_classⵧafter({ $class, state, $node, depth }, options),
		xstate,
	)

	const fine_type_cb_id = `on_typeꘌ${$type}`
	const fine_type_callback = callbacks[fine_type_cb_id] as WalkerReducer<ExternalWalkState, OnTypeParams<ExternalWalkState>, RenderingOptions>
	if (fine_type_callback)
		xstate = fine_type_callback({ $type, $parent_node, state: xstate, $node, depth }, options)
	xstate = callbacks.on_type({ $type, $parent_node, state: xstate, $node, depth }, options)

	xstate = callbacks.on_nodeⵧexit({ state: xstate, $node, depth, $id }, options)

	return xstate
}


function walk<ExternalWalkState, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Immutable<Node>,
	raw_callbacks: Immutable<Partial<WalkerCallbacks<ExternalWalkState, RenderingOptions>>>,
	options: RenderingOptions, // this internal fn can't default unknown type, so we expect the caller to give us full options
) {
	const callbacksⵧdefault = _getꓽcallbacksⵧdefault<ExternalWalkState, RenderingOptions>()
	assert(
		hasꓽshape(callbacksⵧdefault, raw_callbacks, { allow_extra_props: false, match_reference_props: 'some' }),
		`${LIB}[walk]: custom callbacks should match the expected format, check the API!`
	)

	const callbacks: WalkerCallbacks<ExternalWalkState, RenderingOptions> = {
		...callbacksⵧdefault,
		...raw_callbacks as any as WalkerCallbacks<ExternalWalkState, RenderingOptions>,
	}

	assert(
		// detect incorrectly built options (actual issue before rewrite in 2024)
		options.shouldꓽrecover_from_unknown_sub_nodes !== undefined,
		`${LIB}[walk]: options should be a fully initialized options object!`
	)

	const $root_node = normalizeꓽnode($raw_node)

	const istate = {
		$parent_node: null,
		$id: 'root',
		depth: 0,
		$root_node,
	}
	const xstate = undefined

	return _walk($root_node, callbacks, options, istate, xstate)
}

/////////////////////////////////////////////////

export {
	SPECIAL_LIST_NODE_CONTENT_KEY,

	NodeType,
	type CheckedNode,
	type Node,
	type WalkerStateCreator,
	type WalkerReducer,
	type WalkerCallbacks,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	walk,
}
