/**
 * "walk" is the foundation on which all the renderer are based
 */

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { hasꓽshape, isꓽexact_stringified_number } from '@offirmo-private/type-detection'
import { capitalizeⵧfirst } from '@offirmo-private/normalize-string'

import { LIB } from '../consts.ts'
import { getꓽcontent_nodes‿array } from './common.ts'
import { type NodeLike, NodeType, type CheckedNode, type Node } from '../l1-types/index.ts'

import { normalizeꓽnode } from '../l1-utils/normalize.ts'
import { promoteꓽto_node } from '../l1-utils/promote.ts'
import type { BaseState } from '@offirmo-private/state-utils'

/////////////////////////////////////////////////
// base rendering options

interface BaseRenderingOptions {
	// what should happen if a sub-node could not be resolved?
	// (final, after calling resolveꓽunknown_ref())
	shouldꓽrecover_from_unknown_sub_nodes:
		| false // don't recover -> crash (default)
		// XXX upward inheritance is now the default | 'root' // allow looking at the root's sub-nodes, common use case is adding a few extraneous base sub-nodes at the root (beware of infinite loops)
		| 'placeholder' // NOT RECOMMENDED replace with an ugly placeholder. Useful if we can't afford to fail.

	// TODO base h depth if we know we're embedded in bigger content
}

const DEFAULT_RENDERING_OPTIONSⵧWalk = Object.freeze<BaseRenderingOptions>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
})

/////////////////////////////////////////////////
// Hooks

interface BaseWalkState {
	depthⵧh: number // header depth

	//$parent_node: Immutable<CheckedNode> | null
	//$id: string // ??
	//depthⵧnodes: number // overall depth
	//$root_node: Immutable<CheckedNode> // for sub-node resolution "root" mode
}

interface BaseHookParams<RendererState> {
	// shared generic state, see BaseWalkState for explanations
	$node: Immutable<CheckedNode>
	base_state: Immutable<BaseWalkState> // hooks can look, but are not allowed to mutate it

	// custom state
	state: RendererState
}

// known usages:
// - tracking (increasing) depths
interface OnNodeEnterParams<RendererState> extends BaseHookParams<RendererState> {
	$id: string
}

// known usages:
// - perform normalization/linting/autofixes of the node
// - finally collate all the sub-nodes (in some cases)
interface OnNodeExitParams<RendererState> extends BaseHookParams<RendererState> {
	$id: string
}

// CONCAT STRING
interface OnConcatenateStringParams<RendererState> extends BaseHookParams<RendererState> {
	str: string
}
// CONCAT SUB-NODE
// REMINDER this is done at the PARENT level => node, state, depth all refer to the PARENT node concatenating the child
interface OnConcatenateSubNodeParams<RendererState> extends BaseHookParams<RendererState> {
	$sub_node_id: string
	$sub_node: Immutable<Node>
	sub_state: RendererState // IMPORTANT: this is where the parent node can "consume" the child state into its own state
}
// FILTER TODO review
interface OnFilterParams<RendererState> extends BaseHookParams<RendererState> {
	$filter: string
	$filters: string[]
}
// CLASS
interface OnClassParams<RendererState> extends BaseHookParams<RendererState> {
	$class: string
}
// TYPE
interface OnTypeParams<RendererState> extends BaseHookParams<RendererState> {
	$type: NodeType
}

interface UnknownSubNodeResolver<RendererState, RenderingOptions> {
	(
		$sub_node_id: string,
		context: BaseHookParams<RendererState>,
		options: RenderingOptions,
	): Node | undefined
}

interface WalkerStateCreator<RendererState, RenderingOptions> {
	(parent_state: RendererState | undefined, options: RenderingOptions): RendererState
}

interface WalkerReducer<RendererState, P extends BaseHookParams<RendererState>, RenderingOptions> {
	(params: P, options: RenderingOptions): RendererState
}

interface WalkerCallbacks<RendererState, RenderingOptions extends BaseRenderingOptions> {

	// whatever state the renderer needs
	// usually accumulates the output (at least)
	createꓽstate: WalkerStateCreator<RendererState, RenderingOptions>

	onꓽnodeⵧenter: WalkerReducer<RendererState, OnNodeEnterParams<RendererState>, RenderingOptions>
	onꓽnodeⵧexit: WalkerReducer<RendererState, OnNodeExitParams<RendererState>, RenderingOptions>

	onꓽconcatenateⵧstr: WalkerReducer<
		RendererState,
		OnConcatenateStringParams<RendererState>,
		RenderingOptions
	>
	onꓽconcatenateⵧsub_node: WalkerReducer<
		RendererState,
		OnConcatenateSubNodeParams<RendererState>,
		RenderingOptions
	>

	//onꓽclassⵧbefore: WalkerReducer<RendererState, OnClassParams<RendererState>, RenderingOptions>
	//onꓽclassⵧafter: WalkerReducer<RendererState, OnClassParams<RendererState>, RenderingOptions>

	/* TODO review
	onꓽfilter: WalkerReducer<RendererState, OnFilterParams<RendererState>, RenderingOptions>
	onꓽfilterꘌCapitalize: WalkerReducer<
		RendererState,
		OnFilterParams<RendererState>,
		RenderingOptions
	>
	// extensions
	[onꓽfilterꘌxyz: string]: WalkerReducer<RendererState, OnFilterParams<RendererState>, RenderingOptions>,

	onꓽtype: WalkerReducer<RendererState, OnTypeParams<RendererState>, RenderingOptions>
	// select known specials
	onꓽtypeꘌhr?: WalkerReducer<RendererState, OnTypeParams<RendererState>, RenderingOptions>
	onꓽtypeꘌbr?: WalkerReducer<RendererState, OnTypeParams<RendererState>, RenderingOptions>
	// extensions
	[onꓽtypeꘌxyz: string]: WalkerReducer<RendererState, OnTypeParams<RendererState>, RenderingOptions>,

	// hard to type strictly
	[onꓽfilter_or_type: string]: any
	*/

	// useful for dynamically generated refs
	resolveꓽunknown_ref: UnknownSubNodeResolver<RendererState, RenderingOptions>
}

/////////////////////////////////////////////////

function _getꓽcallbacksⵧdefault<
	RendererState,
	RenderingOptions extends BaseRenderingOptions = any,
>(): WalkerCallbacks<RendererState, RenderingOptions> {
	function nothing(): void {}
	function identity({ state }: { state: RendererState }): RendererState {
		return state
	}

	return {
		createꓽstate: () => 'YOU NEED TO IMPLEMENT createꓽstate()!' as any, // tricky to get right

		onꓽnodeⵧenter: identity, //() => { throw new Error('Please define onꓽnodeⵧenter()!') },
		onꓽnodeⵧexit: identity,

		onꓽconcatenateⵧstr: identity,
		onꓽconcatenateⵧsub_node: identity,

		/*
		onꓽclassⵧbefore: identity,
		onꓽclassⵧafter: identity,

		onꓽfilter: identity,
		onꓽfilterꘌCapitalize: ({ state }: { state: RendererState }) => {
			// TODO review many capitalize!
			// generic processing that works for text, ansi, React...
			const generic_state = state as any
			if (generic_state && typeof generic_state.str === 'string') {
				//console.log(`${LIB} auto capitalizing...`, state)
				return {
					...(generic_state as any),
					str: capitalizeⵧfirst(generic_state.str),
				} satisfies RendererState
			}

			return state
		},

		onꓽtype: identity,
		*/

		resolveꓽunknown_ref(
			$sub_node_id: string,
			context: BaseHookParams<RendererState>,
			options: RenderingOptions,
		): Node | undefined {
			// BEWARE OF INFINITE LOOPS!
			// RECOMMENDED TO ONLY RETURN SIMPLE NODES (just text)
			return undefined
		},
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

function _walk_content<CustomWalkState, RenderingOptions extends BaseRenderingOptions>(
	$node: Immutable<CheckedNode>,
	callbacks: WalkerCallbacks<CustomWalkState, RenderingOptions>,
	xstate: CustomWalkState,
	depth: number,
	$root_node: Immutable<CheckedNode>,
	options: RenderingOptions,
) {
	const { $content, $sub: $sub_nodes } = $node

	const $content_array = getꓽcontent_nodes‿array($node)
	$content_array.forEach(node => {
		if (typeof node === 'string') {
			const $content = node
			// $content looks like "Hello ⎨⎨world⎬⎬, welcome to ⎨⎨place|filter1|filter2⎬⎬
			const splitⵧby_opening_brace = $content.split('⎨⎨')
			const splitⵧby_closing_brace = $content.split('⎬⎬')

			// quick check for matching
			// 1. open and close count should match
			assert(
				splitⵧby_closing_brace.length === splitⵧby_opening_brace.length,
				`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (1)`,
			)
			// 2. should be ordered open - close - open - close...
			assert(
				splitⵧby_opening_brace.every(s => s.split('⎬⎬').length <= 2),
				`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (2a)`,
			)
			assert(
				splitⵧby_closing_brace.every(s => s.split('⎨⎨').length <= 2),
				`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬! (2b)`,
			)

			const initial_str: string = splitⵧby_opening_brace.shift()!
			if (initial_str) {
				assert(
					initial_str.split('⎬⎬').length === 1,
					`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`,
				)
				xstate = callbacks.onꓽconcatenateⵧstr(
					{
						str: initial_str,
						state: xstate,
						$node,
						depth,
					},
					options,
				)
			}

			xstate = splitⵧby_opening_brace.reduce(
				(xstate: CustomWalkState, param_and_text: string): CustomWalkState => {
					const split_end = param_and_text.split('⎬⎬')
					if (split_end.length !== 2)
						throw new Error(`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`)

					// splitting the ⎨⎨place|filter1|filter2⎬⎬ content
					const [$sub_node_id, ...$filters] = split_end.shift()!.split('|')
					assert($sub_node_id, `${LIB}: syntax error in content "${$content}", empty ⎨⎨⎬⎬!`)

					let $sub_node = promoteꓽto_node(
						(function _resolve_sub_node_by_id(): Immutable<CheckedNode>['$sub'][string] {
							if ($sub_node_id === 'br') {
								assert(
									!$sub_nodes[$sub_node_id],
									`${LIB}: error in content "${$content}", having a reserved subnode "${$sub_node_id}"!`,
								)
								return SUB_NODE_BR
							}

							if ($sub_node_id === 'hr') {
								assert(
									!$sub_nodes[$sub_node_id],
									`${LIB}: error in content "${$content}", having a reserved subnode "${$sub_node_id}"!`,
								)
								return SUB_NODE_HR
							}

							if ($sub_nodes[$sub_node_id] !== undefined) {
								// reminder: can be a falsy node-like 0, ''
								return $sub_nodes[$sub_node_id]!
							}

							// sub node is missing on the immediate node, advanced resolution:

							if (
								options.shouldꓽrecover_from_unknown_sub_nodes === 'root'
								&& $root_node.$sub[$sub_node_id]
							) {
								return $root_node.$sub[$sub_node_id]!
							}

							const candidate_from_resolver = callbacks.resolveꓽunknown_ref(
								$sub_node_id,
								{
									$node,
									depth,
									state: xstate,
								},
								options,
							)
							if (candidate_from_resolver) return candidate_from_resolver

							if (options.shouldꓽrecover_from_unknown_sub_nodes === 'placeholder') {
								return { $content: `{{??${$sub_node_id}??}}` }
							}

							if (true) {
								console.error('shouldꓽrecover_from_unknown_sub_nodes FAILURE')
								console.error($node, { $content, sub_node_id: $sub_node_id })
							}
							throw new Error(
								`${LIB}: syntax error in content "${$content}", it's referencing an unknown sub-node "${$sub_node_id}"! (recover mode = ${options.shouldꓽrecover_from_unknown_sub_nodes})`,
							)
						})(),
					)

					let sub_state = _walk(
						$sub_node,
						callbacks,
						options,
						{
							$parent_node: $node,
							$id: $sub_node_id,
							depth: depth + 1,
							$root_node,
						},
						xstate,
					)

					//console.log('[filters', $filters, '])
					sub_state = $filters.reduce((state, $filter) => {
						const fine_filter_cb_id = `onꓽfilterꘌ${$filter}`
						//console.log({fine_filter_cb_id})
						const fine_filter_callback = callbacks[fine_filter_cb_id] as WalkerReducer<
							CustomWalkState,
							OnFilterParams<CustomWalkState>,
							RenderingOptions
						>
						if (fine_filter_callback)
							state = fine_filter_callback(
								{
									$filter,
									$filters,
									state,
									$node,
									depth,
								},
								options,
							)

						return callbacks.onꓽfilter(
							{
								$filter,
								$filters,
								state,
								$node,
								depth,
							},
							options,
						)
					}, sub_state)

					// Should we detect unused $subnodes?
					// NO it's convenient (ex. Oh-my-rpg) to over-set subnodes
					// and set a content which may or may not use them.

					xstate = callbacks.onꓽconcatenateⵧsub_node(
						{
							state: xstate,
							$node,
							depth,

							$sub_node_id,
							$sub_node,
							sub_state,
						},
						options,
					)

					if (split_end[0])
						xstate = callbacks.onꓽconcatenateⵧstr(
							{
								str: split_end[0],
								state: xstate,
								$node,
								depth,
							},
							options,
						)

					return xstate
				},
				xstate,
			)
		} else {
			throw new Error('NIMP array of non strings')
		}
	})

	return xstate
}

/**
 * Walk recursively inside a node.
 * Must return a NEW "node" state.
 */
function _walk<CustomWalkState, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Immutable<NodeLike>,
	callbacks: Immutable<WalkerCallbacks<CustomWalkState, RenderingOptions>>,
	options: RenderingOptions,
	bstate: BaseWalkState,
	xstate: CustomWalkState | undefined,
) {
	const $node = normalizeꓽnode(promoteꓽto_node($raw_node))

	let xstate = callbacks.createꓽstate(xstate, options)
	xstate = callbacks.onꓽnodeⵧenter({ state: xstate, $node }, options)

	// TODO one day if needed: class begin / start

	const { $type, $classes, $sub: $refs } = $node


	xstate = $classes.reduce(
		(state, $class) =>
			callbacks.onꓽclassⵧbefore(
				{
					$class,
					state,
					$node,
				},
				options,
			),
		xstate,
	)

	// walk down the content
	if ($type === 'ul' || $type === 'ol') {
		// special walk of sub-content for those
		xxx NO changed
		const sorted_keys = Object.keys($refs).sort()
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
				$type: NodeType._li,
				$content: `⎨⎨${SPECIAL_LIST_NODE_CONTENT_KEY}⎬⎬`,
				$sub: {
					[SPECIAL_LIST_NODE_CONTENT_KEY]: $refs[key]!,
				},
			}
			const sub_xstate = _walk(
				$sub_node,
				callbacks,
				options,
				{
					$parent_node: $node,
					depth: depth + 1,
					$id: key,
					$root_node,
				},
				xstate,
			)
			xstate = callbacks.onꓽconcatenateⵧsub_node(
				{
					state: xstate,
					$node,
					depth,

					$sub_node,
					sub_state: sub_xstate,
					$sub_node_id: key,
				},
				options,
			)
		})
	} else xstate = _walk_content($node, callbacks, xstate, options)

	xstate = $classes.reduce(
		(state, $class) => callbacks.onꓽclassⵧafter({ $class, state, $node }, options),
		xstate,
	)

	const fine_type_cb_id = `onꓽtypeꘌ${$type}`
	const fine_type_callback = callbacks[fine_type_cb_id] as WalkerReducer<
		CustomWalkState,
		OnTypeParams<CustomWalkState>,
		RenderingOptions
	>
	if (fine_type_callback)
		xstate = fine_type_callback({ $type, state: xstate, $node }, options)
	xstate = callbacks.onꓽtype({ $type, state: xstate, $node }, options)

	xstate = callbacks.onꓽnodeⵧexit({ state: xstate, $node }, options)

	return xstate
}

/////////////////////////////////////////////////

function walk<CustomWalkState, RenderingOptions extends BaseRenderingOptions>(
	$raw_node: Immutable<NodeLike>,
	raw_callbacks: Immutable<Partial<WalkerCallbacks<CustomWalkState, RenderingOptions>>>,
	options: RenderingOptions, // this internal fn can't default unknown type, so we expect the caller to give us full options
) {
	const callbacksⵧdefault = _getꓽcallbacksⵧdefault<CustomWalkState, RenderingOptions>()
	assert(
		hasꓽshape(callbacksⵧdefault, raw_callbacks, {
			allow_extra_props: false,
			match_reference_props: 'some',
		}),
		`${LIB}[walk]: custom callbacks should match the expected format, check the API!`,
	)

	const callbacks: WalkerCallbacks<CustomWalkState, RenderingOptions> = {
		...callbacksⵧdefault,
		...(raw_callbacks as any as WalkerCallbacks<CustomWalkState, RenderingOptions>),
	}

	assert(
		hasꓽshape(options, DEFAULT_RENDERING_OPTIONSⵧWalk, {
			allow_extra_props: true,
			match_reference_props: 'some',
		}),
		`${LIB}[walk]: options should match the expected format, check the API!`,
	)

	const bstate: BaseWalkState = {
		//$parent_node: null,
		//$id: 'root',
		//depthⵧnodes: 0,
		depthⵧh: 0, // TODO 1D allow starting at different depth through options
		//$root_node,
	}
	const xstate = undefined // simpler than having a special creation

	return _walk($raw_node, callbacks, options, bstate, xstate)
}

/////////////////////////////////////////////////

export {
	type BaseRenderingOptions,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	type WalkerCallbacks,
	walk,
	SPECIAL_LIST_NODE_CONTENT_KEY,

	// for convenience
	NodeType,
	type CheckedNode,
	type Node,
}
