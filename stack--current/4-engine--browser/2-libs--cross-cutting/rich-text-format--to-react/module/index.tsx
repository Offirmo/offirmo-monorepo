import * as React from 'react'
import { type ReactNode } from 'react'
import classNames from 'classnames'

import memoize_one from 'memoize-one'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
	capitalizeⵧfirst,
	normalizeꓽurl,
} from '@offirmo-private/normalize-string'
import {
	type NodeLike,
	type Node,
	type CheckedNode,
	Enum,
	NodeType,
	walk,
	isꓽlist,
	isꓽlistⵧuuid,
	isꓽlistⵧKV,
	type WalkerCallbacks,
	type BaseRenderingOptions,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	SPECIAL_LIST_NODE_CONTENT_KEY,
	promoteꓽto_node,
	isꓽdisplayⵧblock,
} from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

const LIB = 'RichText-to-React'

interface RenderingOptionsⵧToReact extends BaseRenderingOptions {
	key?: string
}
const DEFAULT_RENDERING_OPTIONSⵧToReact: RenderingOptionsⵧToReact = {
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
}

/////////////////////////////////////////////////

const NODE_TYPE_TO_COMPONENT: { [type: string]: React.HTMLElementType | undefined } = {
	// will default to own tag if not in this list (ex. strong => strong)
	[NodeType.weak]: 'span' as React.HTMLElementType,
	[NodeType.heading]: 'h3' as React.HTMLElementType,
	[NodeType.fragmentⵧinline]: 'span' as React.HTMLElementType,
	[NodeType.fragmentⵧblock]: 'div' as React.HTMLElementType,
	[NodeType.emoji]: 'span' as React.HTMLElementType,
	[NodeType._li]: 'li' as React.HTMLElementType,
}

const NODE_TYPE_TO_EXTRA_CLASSES: { [type: string]: string[] | undefined } = {
	[NodeType.weak]: ['o⋄colorꘌsecondary'],
}

const _warn_kvp = memoize_one(() => console.warn(`${LIB} TODO KVP`))

const _load_styles = memoize_one(() => {
	//console.info(`loading RichText styles on-demand`)
	//import('@offirmo-private/rich-text-format/styles.css')
})

function _is_react_element(n: React.ReactNode): n is React.ReactElement {
	const is_renderable = !!n && n !== true
	if (!is_renderable) return false

	const is_primitive = typeof n === 'string' || typeof n === 'number' || typeof n === 'bigint'
	if (is_primitive) return false

	return true
}

// a clever key is critically needed in general, but even more critical
// for lists, the default keys "1, 2, 3" are non-optimal, ex. if the list is re-ordered.
// Thus we attempt to enrich the default key ($id) from various hints.
function _generate_own_react_key({
	$id,
	$node,
}: {
	$id: string
	$node: Immutable<CheckedNode> | Immutable<Node>
}) {
	let key = $id

	if ($node.$type === NodeType._li) {
		// this is a wrapper, go down a level
		$node = promoteꓽto_node($node.$refs![SPECIAL_LIST_NODE_CONTENT_KEY]!)
	}

	if ($node.$hints?.key) key += `.aka:${$node.$hints.key}`
	if ($node.$hints?.['uuid']) key += `.uuid:${$node.$hints['uuid']}`

	//console.log('_generate_own_react_key', {$id, $node, key})

	return key
}

function _get_aggregated_keyed_children({ state }: { state: WalkState }): Array<React.ReactNode> {
	let children: Array<React.ReactNode> = state.children_states
		.map(s => s.element)
		.filter(child => {
			// https://legacy.reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
			// false, null, undefined, and true are valid children. They simply don’t render.
			return !!child && child !== true
		})
		.map(child => {
			if (typeof child === 'string') return normalize_unicode(child)

			return child
		})

	const complex_children_count = children.reduce<number>((acc, child) => {
		if (!_is_react_element(child)) return acc

		return acc + 1
	}, 0)

	if (complex_children_count > 1) {
		// we need to key the children out of safety
		// at their level, children can't ensure that their keys are unique,
		// especially for {br} which may be repeated.
		// We need to assist with that:

		//console.group(`starting rekey for ${$id}...`)
		//console.log({$node, state})
		const key_count = new Map<string, number>()
		children = children.map(child => {
			if (!_is_react_element(child)) return child

			let key = (child! as React.ReactElement).key!

			const count = (key_count.get(key) || 0) + 1
			key_count.set(key, count)

			if (count > 1) {
				key += `+${count}`
				child = React.cloneElement(child, { key })
			}

			return child
		})
		//console.log(key_count)
		//console.groupEnd()
	} else {
		const has_only_str_children = children.every(child => typeof child === 'string')
		if (has_only_str_children) children = [children.join('')] // merge into a single string
	}

	return children
}

function _get_aggregated_classes({ $node }: { $node: Immutable<CheckedNode> }): Set<string> {
	const { $type, $classes, $hints } = $node

	const classes = new Set<string>([...$classes, ...(NODE_TYPE_TO_EXTRA_CLASSES[$type] || [])])

	if (isꓽlist($node)) {
		classes.add('o⋄rich-text⋄list')

		if (isꓽlistⵧuuid($node)) {
			//console.log(`${LIB} seen uuid list`)
			classes.add('o⋄rich-text⋄list--interactive')
		}

		switch ($hints.list__style__type) {
			case '':
				classes.add('o⋄rich-text⋄list--no-bullet')
				break

			default:
				break
		}

		if (isꓽlistⵧKV($node)) {
			// TODO rewrite completely
			_warn_kvp()
			classes.add('o⋄rich-text⋄list--no-bullet')
		}
	}

	return classes
}

function _get_final_element_creator({
	$node,
	$id,
	classes,
}: {
	$node: Immutable<CheckedNode>
	$id: string
	classes: Set<string>
}): (children: ReactNode[]) => React.ReactNode {
	const { $type, $hints } = $node

	if (!Enum.isType(NodeType, $type)) {
		throw new Error(`Unknown node type "${$type}"!`)
		/*		wrapper = children => React.createElement(
					'div',
					{
						key: _generate_own_react_key({$id, $node}),
						className: 'o⋄rich-text⋄error',
					},
					[
						`[Unknown type "${$type}"]`, // extra inline text
						children,
					],
				)*/
	}

	const has_classes = classes.size !== 0
	const classProps = {
		...(has_classes && { className: classNames(Array.from(classes.values())) }),
	}

	const key = _generate_own_react_key({ $id, $node })

	if ($hints.href) {
		const props = {
			key,
			...classProps,
			href: normalizeꓽurl($hints.href),
		} as any
		const urlⵧcurrent‿obj = new URL(window.location.href)
		const urlⵧtarget‿obj = new URL(props.href)
		const isꓽexternal = urlⵧcurrent‿obj.origin !== urlⵧtarget‿obj.origin
		if (isꓽexternal) {
			props.target = '_blank'
			props.rel = 'noopener external' // default safe
		}

		return children => React.createElement('a', props, children)
	}

	const element_type: React.HTMLElementType =
		NODE_TYPE_TO_COMPONENT[$type] || ($type as React.HTMLElementType)

	return children => {
		const has_only_str_children = children.every(child => typeof child === 'string')

		if (element_type === 'span' && !has_classes && has_only_str_children) {
			return children.join('') // directly as a string
		}

		let cleaned_children: ReactNode[] | undefined = children
		if (children.length === 0 || (has_only_str_children && children.join('') === '')) {
			// this is equivalent to not having children
			cleaned_children = undefined
		}

		return React.createElement(
			element_type,
			{
				key,
				...classProps,
			},
			cleaned_children,
		)
	}
}

/////////////////////////////////////////////////

interface WalkState {
	element: undefined | React.ReactNode // core result

	// this is where the sub-nodes concatenation happens
	children_states: Array<WalkState>
	$refs_nodes: Array<Immutable<Node>> // we also store the sub-nodes, but no usage yet
}

const create_state: WalkerCallbacks<
	WalkState,
	RenderingOptionsⵧToReact
>['create_state'] = (): WalkState => {
	return {
		element: undefined,
		$refs_nodes: [],
		children_states: [],
	}
}

const on_nodeⵧexit: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_nodeⵧexit'] = ({
	state,
	$node,
	$id,
}) => {
	if ($node.$type === NodeType.br || $node.$type === NodeType.hr) {
		state.children_states = []
	}

	const children = _get_aggregated_keyed_children({ state })
	const classes = _get_aggregated_classes({ $node })
	const create_element = _get_final_element_creator({ $node, $id, classes })

	state.element = create_element(children)

	return state
}

const on_concatenateⵧstr: WalkerCallbacks<
	WalkState,
	RenderingOptionsⵧToReact
>['on_concatenateⵧstr'] = ({ state, str }) => {
	state.children_states.push({
		element: str,
		$refs_nodes: [],
		children_states: [],
	})
	return state
}

const on_concatenateⵧsub_node: WalkerCallbacks<
	WalkState,
	RenderingOptionsⵧToReact
>['on_concatenateⵧsub_node'] = ({ state, sub_state, $node }) => {
	state.$refs_nodes.push($node)
	state.children_states.push(sub_state)

	return state
}

const on_filterꘌCapitalize: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_filter'] = ({
	state,
}) => {
	//console.warn('rich-text-to-react Capitalize', state)

	if (typeof state.element === 'string') state.element = capitalizeⵧfirst(state.element)
	else if (_is_react_element(state.element))
		state.element = React.cloneElement(state.element, {
			// TODO deep capitalize?
			children: React.Children.map(state.element.props.children, child =>
				typeof child === 'string' ? capitalizeⵧfirst(child) : child,
			),
		})

	return state
}

const callbacksⵧto_react: Partial<WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>> = {
	create_state,
	on_nodeⵧexit,
	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
	on_filterꘌCapitalize,
}

/////////////////////////////////////////////////

function renderⵧto_react(
	$doc: Immutable<NodeLike>,
	callback_overrides: Partial<WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>> = {},
	raw_options: Partial<RenderingOptionsⵧToReact> = {},
) {
	console.log(`${LIB} Rendering a rich text:`, $doc)
	_load_styles()

	const callbacks: Partial<WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>> = {
		...callbacksⵧto_react,
		...callback_overrides,
	}

	const options: RenderingOptionsⵧToReact = {
		...DEFAULT_RENDERING_OPTIONSⵧToReact,
		...raw_options,
	}

	$doc = promoteꓽto_node($doc)
	const state = walk<WalkState, RenderingOptionsⵧToReact>($doc, callbacks, options)

	if (_is_react_element(state.element)) {
		// optim to avoid a useless div
		// do not loose infos!
		const key = options.key || state.element.key || 'rich-text-format-to-react--root'
		const props = (state.element.props || {}) as any
		const className = 'o⋄rich-text ' + (props.className || '')
		return React.cloneElement(state.element, {
			...props,
			key,
			className,
		})
	}

	return React.createElement(
		NODE_TYPE_TO_COMPONENT[$doc.$type],
		{
			key: options.key || 'rich-text-format-to-react--root',
			className: 'o⋄rich-text',
		},
		state.element,
	)
}

/////////////////////////////////////////////////

export { type RenderingOptionsⵧToReact, renderⵧto_react }
export default renderⵧto_react
