import assert from 'tiny-invariant'

import { LIB } from '../consts.js'

import {
	NodeType,
	type CheckedNode,
	type Node,
} from '../types/index.js'

import { normalizeꓽnode } from '../utils/normalize.js'
import { promoteꓽto_node } from '../utils/promote.js'

/////////////////////////////////////////////////
// "walk" is the foundation on which all the renderer are based

////////////
// hooks inputs

// common
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

export interface BaseParams<State> {
	state: State
	$node: CheckedNode
	depth: number
}

// NODE ENTER
// Useful for:
// - initialising the state
// (only callback not inheriting from BaseParams)
export interface OnNodeEnterParams {
	$id: string
	$node: CheckedNode
	depth: number
}
// NODE EXIT
export interface OnNodeExitParams<State> extends BaseParams<State> {
	$id: string
}
// ROOT EXIT
export interface OnRootExitParams<State> extends BaseParams<State> {
}
// CONCAT STRING
export interface OnConcatenateStringParams<State> extends BaseParams<State> {
	str: string
}
// CONCAT SUB-NODE
export interface OnConcatenateSubNodeParams<State> extends BaseParams<State> {
	sub_state: State
	$id: string
	$parent_node: CheckedNode
}
// FILTER
export interface OnFilterParams<State> extends BaseParams<State> {
	$filter: string
	$filters: string[]
}
// CLASS
export interface OnClassParams<State> extends BaseParams<State> {
	$class: string
}
// TYPE
export interface OnTypeParams<State> extends BaseParams<State> {
	$type: NodeType
	$parent_node: CheckedNode | null
}
// unknown sub node resolver
export interface UnknownSubNodeResolver<State, RenderingOptions> {
	($sub_node_id: string, context: BaseParams<State>, options: RenderingOptions): Node | undefined
}


interface WalkerReducer<State, P extends BaseParams<State>, RenderingOptions> {
	(params: P, options: RenderingOptions): State
}

interface WalkerCallbacks<State, RenderingOptions extends BaseRenderingOptions> {
	on_rootⵧenter(options: RenderingOptions): void,
	on_rootⵧexit(params: OnRootExitParams<State>, options: RenderingOptions): any,

	on_nodeⵧenter(params: OnNodeEnterParams, options: RenderingOptions): State,
	on_nodeⵧexit: WalkerReducer<State, OnNodeExitParams<State>, RenderingOptions>,

	on_concatenateⵧstr: WalkerReducer<State, OnConcatenateStringParams<State>, RenderingOptions>,
	on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptions>,

	on_classⵧbefore: WalkerReducer<State, OnClassParams<State>, RenderingOptions>,
	on_classⵧafter: WalkerReducer<State, OnClassParams<State>, RenderingOptions>,

	on_filter: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>,
	on_filterꘌCapitalize: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>,
	// extensions
	//[on_filterꘌxyz: string]: WalkerReducer<State, OnFilterParams<State>, RenderingOptions>,

	resolve_unknown_subnode: UnknownSubNodeResolver<State, RenderingOptions>,

	on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>,
	// two known specials
	on_typeꘌhr?: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>,
	on_typeꘌbr?: WalkerReducer<State, OnTypeParams<State>, RenderingOptions>,
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
		on_rootⵧenter: nothing,
		on_rootⵧexit: identity,

		on_nodeⵧenter: () => { throw new Error('Please define on_nodeⵧenter()!') },
		on_nodeⵧexit: identity,

		on_concatenateⵧstr: identity,
		on_concatenateⵧsub_node: identity,

		on_classⵧbefore: identity,
		on_classⵧafter: identity,

		resolve_unknown_subnode($sub_node_id: string, context: BaseParams<State>, options: RenderingOptions): Node | undefined {
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

interface InternalWalkState {
	$parent_node: Readonly<CheckedNode> | null,
	$id: string,
	depth: number,

	$root_node: Readonly<CheckedNode>, // for sub-node resolution "root" mode
	/*
		const context = parent_state
		? Object.create(parent_state.context)
		: Object.create(null) // NO auto-injections here, let's keep it simple. See core & common

	return {
		context,
	}
	 */
}

function _walk_content<State, RenderingOptions extends BaseRenderingOptions>(
	$node: CheckedNode,
	callbacks: WalkerCallbacks<State, RenderingOptions>,
	state: State,
	depth: number,
	$root_node: CheckedNode,
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
		state = callbacks.on_concatenateⵧstr({
			str: initial_str,
			state,
			$node,
			depth,
		}, options)
	}

	state = splitⵧby_opening_brace.reduce((state: State, param_and_text: string): State => {
		const split_end = param_and_text.split('⎬⎬')
		if (split_end.length !== 2)
			throw new Error(`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`)

		// splitting the ⎨⎨place|filter1|filter2⎬⎬ content
		const [ sub_node_id, ...$filters ] = split_end.shift()!.split('|')
		assert(sub_node_id, `${LIB}: syntax error in content "${$content}", empty ⎨⎨⎬⎬!`)

		let $sub_node = promoteꓽto_node((function _resolve_sub_node_by_id(): CheckedNode['$sub'][string] {
			if (sub_node_id === 'br') {
				assert(!$sub_nodes[sub_node_id], `${LIB}: error in content "${$content}", having a reserved subnode "${sub_node_id}"!`)
				return SUB_NODE_BR
			}

			if (sub_node_id === 'hr') {
				assert(!$sub_nodes[sub_node_id], `${LIB}: error in content "${$content}", having a reserved subnode "${sub_node_id}"!`)
				return SUB_NODE_HR
			}

			if ($sub_nodes[sub_node_id]) {
				return $sub_nodes[sub_node_id]!
			}

			// sub node is missing on the immediate node, advanced resolution:

			if (options.shouldꓽrecover_from_unknown_sub_nodes === 'root' && $root_node.$sub[sub_node_id]) {
				return $root_node.$sub[sub_node_id]!
			}

			const candidate_from_resolver = callbacks.resolve_unknown_subnode(
				sub_node_id,
				{
					$node,
					depth,
					state,
				},
				options
			)
			if (candidate_from_resolver)
				return candidate_from_resolver

			if (options.shouldꓽrecover_from_unknown_sub_nodes === 'placeholder') {
				return { $content: `{{??${sub_node_id}??}}` }
			}

			if (true) {
				console.error('shouldꓽrecover_from_unknown_sub_nodes FAILURE',)
				console.error($node, { $content, sub_node_id })
			}
			throw new Error(`${LIB}: syntax error in content "${$content}", it's referencing an unknown sub-node "${sub_node_id}"! (recover mode = ${options.shouldꓽrecover_from_unknown_sub_nodes})`)
		})())

		let sub_state = _walk($sub_node, callbacks, options, {
			$parent_node: $node,
			$id: sub_node_id,
			depth: depth + 1,
			$root_node,
		})

		//console.log('[filters', $filters, '])
		sub_state = $filters.reduce(
			(state, $filter) => {
				const fine_filter_cb_id = `on_filterꘌ${$filter}`
				//console.log({fine_filter_cb_id})
				const fine_filter_callback = callbacks[fine_filter_cb_id] as WalkerReducer<State, OnFilterParams<State>, RenderingOptions>
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

		state = callbacks.on_concatenateⵧsub_node({
			sub_state,
			$id: sub_node_id,
			$parent_node: $node,
			state,
			$node: normalizeꓽnode($sub_node),
			depth,
		}, options)

		if (split_end[0])
			state = callbacks.on_concatenateⵧstr({
				str: split_end[0],
				state,
				$node,
				depth,
			}, options)

		return state
	}, state)

	return state
}


function _walk<State, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Readonly<Node>,
	callbacks: Readonly<WalkerCallbacks<State, RenderingOptions>>,
	options: Readonly<RenderingOptions> = {} as any,
	{
		$parent_node,
		$id,
		depth,
		$root_node,
	}: InternalWalkState,
) {
	const $node = normalizeꓽnode($raw_node)
	const {
		$type,
		$classes,
		$sub: $sub_nodes,
	} = $node

	const isRoot = !$parent_node
	if (isRoot) {
		callbacks.on_rootⵧenter(options)
	}

	let state = callbacks.on_nodeⵧenter({ $node, $id, depth }, options)

	// TODO one day if needed: class begin / start

	state = $classes.reduce(
		(state, $class) => callbacks.on_classⵧbefore({
			$class,
			state,
			$node,
			depth,
		}, options),
		state,
	)

	if ($type === 'ul' || $type === 'ol') {
		// special case of sub-content
		const sorted_keys = Object.keys($sub_nodes).sort()
		//console.log('walk ul/ol', sorted_keys)
		sorted_keys.forEach(key => {
			// I've been bitten by that...
			const number = Number(key)
			if (key === number.toString()) {
				console.warn(
					`in sub-node '${$id}', the ul/ol key '${key}' suspiciously looks like a number. Beware of auto sorting!`,
					{
						$node,
						sorted_keys,
					},
				)
			}
		})
		sorted_keys.forEach(key => {
			const $sub_node: Node = {
				$type: NodeType.li,
				$content: '⎨⎨content⎬⎬',
				$sub: {
					content: $sub_nodes[key]!,
				},
			}
			const sub_state = _walk( $sub_node, callbacks, options, {
				$parent_node: $node,
				depth: depth +1,
				$id: key,
				$root_node,
			})
			state = callbacks.on_concatenateⵧsub_node({
				state,
				sub_state,
				$id: key,
				$node: normalizeꓽnode($sub_node),
				$parent_node: $node,
				depth,
			}, options)
		})
	}
	else
		state = _walk_content($node, callbacks, state, depth, $root_node, options)

	state = $classes.reduce(
		(state, $class) => callbacks.on_classⵧafter({ $class, state, $node, depth }, options),
		state,
	)

	const fine_type_cb_id = `on_typeꘌ${$type}`
	const fine_type_callback = callbacks[fine_type_cb_id] as WalkerReducer<State, OnTypeParams<State>, RenderingOptions>
	if (fine_type_callback)
		state = fine_type_callback({ $type, $parent_node, state, $node, depth }, options)
	state = callbacks.on_type({ $type, $parent_node, state, $node, depth }, options)

	state = callbacks.on_nodeⵧexit({$node, $id, state, depth}, options)

	if (!$parent_node)
		state = callbacks.on_rootⵧexit({state, $node, depth: 0}, options)

	return state
}


function walk<State, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Readonly<Node>,
	raw_callbacks: Readonly<Partial<WalkerCallbacks<State, RenderingOptions>>>,
	options: RenderingOptions, // this internal fn can't default unknown type, so we expect the caller to give us full options
) {
	assert(
		Object.keys(raw_callbacks).every(k => k === 'resolve_unknown_subnode' || k.startsWith('on_')),
		`${LIB}[walk]: custom callbacks should match the expected format, check the API!`
	)

	const callbacks: WalkerCallbacks<State, RenderingOptions> = {
		..._getꓽcallbacksⵧdefault<State, RenderingOptions>(),
		...raw_callbacks as any as WalkerCallbacks<State, RenderingOptions>,
	}

	assert(
		// detect incorrectly built options (actual issue before rewrite in 2024)
		options.shouldꓽrecover_from_unknown_sub_nodes !== undefined,
		`${LIB}[walk]: options should be a fully initialized options object!`
	)

	const $root_node = normalizeꓽnode($raw_node)

	return _walk($root_node, callbacks, options, {
		$parent_node: null,
		$id: 'root',
		depth: 0,
		$root_node,
	})
}
/////////////////////////////////////////////////

export {
	NodeType,
	type CheckedNode,
	type Node,
	type WalkerReducer,
	type WalkerCallbacks,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	walk,
}
