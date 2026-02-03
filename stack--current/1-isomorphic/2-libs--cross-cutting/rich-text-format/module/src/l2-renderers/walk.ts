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
import { getꓽtype } from '../l1-utils'

/////////////////////////////////////////////////
// base rendering options

interface BaseRenderingOptions {
	// what should happen if a sub-node could not be resolved?
	// (final, after calling resolveꓽunknown_ref())
	shouldꓽrecover_from_unknown_sub_nodes:
		| false // don't recover -> crash (default)
		| 'placeholder' // NOT RECOMMENDED replace with an ugly placeholder. Useful if we can't afford to fail.
}

const DEFAULT_RENDERING_OPTIONSⵧWalk = Object.freeze<BaseRenderingOptions>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
})

/////////////////////////////////////////////////
// Hooks

interface BaseWalkState {
	aggregated_refs: CheckedNode['$refs']

	depthⵧh: number // header depth
	depthⵧlist: number // list depth
	depthⵧnodes: number // overall depth ((no known usage for now / debug only)

	//$parent_node: Immutable<CheckedNode> | null
	//$id: string // ??
	//$root_node: Immutable<CheckedNode> // for sub-node resolution "root" mode
}

interface BaseHookParams<RendererState> {
	// shared generic state, see BaseWalkState for explanations
	$node: Immutable<CheckedNode>

	// base, common state
	bstate: Immutable<BaseWalkState> // hooks can peek, but are not allowed to mutate it

	// custom renderer's state
	xstate: RendererState // hooks can freely mutate or derive
}

// known usages:
// - creating/deriving the new "sub-node" custom renderer state
interface OnNodeEnterParams<RendererState> extends BaseHookParams<RendererState> {
	//$id: string
}

// known usages:
// - perform normalization/linting/autofixes of the node
// - finally collate all the sub-nodes (in some cases)
interface OnNodeExitParams<RendererState> extends BaseHookParams<RendererState> {
	//$id: string
}

// CONCAT STRING
interface OnConcatenateStringParams<RendererState> extends BaseHookParams<RendererState> {
	str: string
}

// CONCAT SUB-NODE
// REMINDER this is done at the PARENT level => node, state, depth all refer to the PARENT node concatenating the child
interface OnConcatenateSubNodeParams<RendererState> extends BaseHookParams<RendererState> {
	xstateⵧsub: RendererState // IMPORTANT: this is an opportunity for the parent node to "consume/reduce" the child state into its own state (depending on how the renderer work)
	row_index: number // if this node is from an array content, its index there; else -1
	//col_index: number // if this node is from an array content, its col index there; else -1
}

/*
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
*/

interface UnknownSubNodeResolver<RendererState, RenderingOptions> {
	(
		$ref_key: string,
		context: BaseHookParams<RendererState>,
		options: RenderingOptions,
	): Node | undefined
}

interface RendererStateCreator<RendererState, RenderingOptions> {
	(options: RenderingOptions, parent_state: RendererState | undefined): RendererState
}

interface WalkerReducer<RendererState, P extends BaseHookParams<RendererState>, RenderingOptions> {
	(params: P, options: RenderingOptions): RendererState
}

interface WalkerCallbacks<RendererState, RenderingOptions extends BaseRenderingOptions> {
	// whatever state the renderer needs
	// usually accumulates the output (at least)
	createꓽstate: RendererStateCreator<RendererState, RenderingOptions>

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
	function identity({ xstate }: { xstate: RendererState }): RendererState {
		return xstate
	}

	return {
		createꓽstate: () => 'YOU NEED TO IMPLEMENT createꓽstate()!' as any, // tricky to get right

		onꓽnodeⵧenter: identity,
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
			$refs_node_id: string,
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

function _walk_StringWithRefs<CustomWalkState, RenderingOptions extends BaseRenderingOptions>(
	callbacks: WalkerCallbacks<CustomWalkState, RenderingOptions>,
	options: RenderingOptions,
	bstate: BaseWalkState,
	xstate: CustomWalkState,
	$node: Immutable<CheckedNode>,
	$content: string,
) {
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
				$node,
				bstate,
				xstate,
				str: initial_str,
			},
			options,
		)
	}

	xstate = splitⵧby_opening_brace.reduce(
		(xstate: CustomWalkState, param_and_text: string, row_index): CustomWalkState => {
			const split_end = param_and_text.split('⎬⎬')
			if (split_end.length !== 2)
				throw new Error(`${LIB}: syntax error in content "${$content}", unmatched ⎨⎨⎬⎬!`)

			// splitting the ⎨⎨place|filter1|filter2⎬⎬ content
			const [$ref_key, ...$filters] = split_end.shift()!.split('|')
			assert($ref_key, `${LIB}: syntax error in content "${$content}", empty ⎨⎨⎬⎬!`)

			let $refs_node = promoteꓽto_node(
				(function _resolve_ref_by_id(): Immutable<CheckedNode>['$refs'][string] {
					if ($ref_key === 'br') {
						assert(
							!bstate.aggregated_refs[$ref_key],
							`${LIB}: error in content "${$content}", having a reserved subnode "${$ref_key}"!`,
						)
						return SUB_NODE_BR
					}

					if ($ref_key === 'hr') {
						assert(
							!bstate.aggregated_refs[$ref_key],
							`${LIB}: error in content "${$content}", having a reserved subnode "${$ref_key}"!`,
						)
						return SUB_NODE_HR
					}

					if (bstate.aggregated_refs[$ref_key] !== undefined) {
						// reminder: can be a falsy node-like 0, ''
						return bstate.aggregated_refs[$ref_key]!
					}

					// sub node is missing on the node or its ancestors, advanced resolution:

					const candidate_from_resolver = callbacks.resolveꓽunknown_ref(
						$ref_key,
						{
							$node,
							bstate,
							xstate,
						},
						options,
					)
					if (candidate_from_resolver) return candidate_from_resolver

					if (options.shouldꓽrecover_from_unknown_sub_nodes === 'placeholder') {
						return { $content: `{{??${$ref_key}??}}` }
					}

					if (true) {
						console.error('shouldꓽrecover_from_unknown_sub_nodes FAILURE')
						console.error($node, { $content, sub_node_id: $ref_key })
					}
					throw new Error(
						`${LIB}: syntax error in content "${$content}", it's referencing an unknown sub-node "${$ref_key}"! (recover mode = ${options.shouldꓽrecover_from_unknown_sub_nodes})`,
					)
				})(),
			)

			let xstateⵧsub = _walk(callbacks, options, bstate, xstate, $refs_node)

			if ($filters.length > 0) {
				throw new Error('TODO review & reimplement filters')
			}
			/* TODO review filters
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
			*/

			xstate = callbacks.onꓽconcatenateⵧsub_node(
				{
					$node,
					bstate,
					xstate,
					xstateⵧsub,
					row_index,
				},
				options,
			)

			if (split_end[0])
				xstate = callbacks.onꓽconcatenateⵧstr(
					{
						$node,
						bstate,
						xstate,
						str: split_end[0],
					},
					options,
				)

			return xstate
		},
		xstate,
	)

	return xstate
}

function _walk_content<CustomWalkState, RenderingOptions extends BaseRenderingOptions>(
	callbacks: WalkerCallbacks<CustomWalkState, RenderingOptions>,
	options: RenderingOptions,
	bstate: BaseWalkState,
	xstate: CustomWalkState,
	$node: Immutable<CheckedNode>,
) {
	const $content_array = getꓽcontent_nodes‿array($node)
	$content_array.forEach(node => {
		if (typeof node === 'string') {
			xstate = _walk_StringWithRefs(callbacks, options, bstate, xstate, $node, node)
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
	callbacks: Immutable<WalkerCallbacks<CustomWalkState, RenderingOptions>>,
	options: RenderingOptions,
	bstateⵧparent: BaseWalkState,
	xstateⵧparent: CustomWalkState,
	$raw_node: Immutable<NodeLike>,
) {
	const $node = normalizeꓽnode(promoteꓽto_node($raw_node))
	const { $heading, $refs, $type } = $node
	assert($type !== 'auto', `${LIB}[walk]: $type should never be "auto" at this stage!`)

	// build child state
	const bstate: BaseWalkState = {
		...bstateⵧparent,
		aggregated_refs: Object.create(
			bstateⵧparent.aggregated_refs,
			Object.fromEntries(Object.entries($refs).map(([k, value]) => [k, { value }])),
		),
		depthⵧnodes: bstateⵧparent.depthⵧnodes + 1,
		...(getꓽtype($node) === NodeType.ol && { depthⵧlist: bstateⵧparent.depthⵧlist + 1 }),
		...(getꓽtype($node) === NodeType.ul && { depthⵧlist: bstateⵧparent.depthⵧlist + 1 }),
		...($heading !== null && { depthⵧh: bstateⵧparent.depthⵧh + 1 }),
	}
	let xstate = callbacks.onꓽnodeⵧenter({ $node, bstate, xstate: xstateⵧparent }, options)

	xstate = _walk_content(callbacks, options, bstate, xstate, $node)

	// IMPORTANT TODO review ???
	// if needed, this is where we "re-absorb" the child state
	// base state = no re-absorption so far
	xstateⵧparent = callbacks.onꓽnodeⵧexit({ $node, bstate, xstate }, options)

	return xstateⵧparent
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
		aggregated_refs: {},

		depthⵧh: -1, // TODO 1D allow starting at different depth through options
		depthⵧnodes: -1,
		depthⵧlist: -1,

		//$parent_node: null,
		//$id: 'root',
		//$root_node,
	}
	const xstate = callbacks.createꓽstate(options, undefined)

	return _walk(callbacks, options, bstate, xstate, $raw_node)
}

/////////////////////////////////////////////////

export {
	type BaseRenderingOptions,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	type WalkerCallbacks,
	walk,
	//SPECIAL_LIST_NODE_CONTENT_KEY,

	// for convenience
	NodeType,
	type CheckedNode,
	type Node,
}
