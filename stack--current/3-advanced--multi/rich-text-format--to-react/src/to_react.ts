import memoize_one from 'memoize-one'
import * as React from 'react'
import { HTMLElementType, type ReactNode } from 'react'
import classNames from 'classnames'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	type NodeLike, type Node, type CheckedNode,
	Enum, NodeType, walk, isꓽlist, isꓽlistⵧuuid, isꓽlistⵧKV,
	type WalkerCallbacks,
	type BaseRenderingOptions,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	SPECIAL_LIST_NODE_CONTENT_KEY,
} from '@offirmo-private/rich-text-format'
import '@offirmo-private/rich-text-format/styles.css'

/////////////////////////////////////////////////

const LIB = 'rich_text_to_react'

const NODE_TYPE_TO_COMPONENT = {
	// will default to own tag if not in this list (ex. strong => strong)
	[NodeType.weak]: 'span' as React.HTMLElementType,
	[NodeType.heading]: 'h3' as React.HTMLElementType,
	[NodeType.fragmentⵧinline]: 'span' as React.HTMLElementType,
	[NodeType.fragmentⵧblock]: 'div' as React.HTMLElementType,
}

const NODE_TYPE_TO_EXTRA_CLASSES = {
	[NodeType.weak]: [ 'o⋄colorꘌsecondary' ],
}

const warn_kvp = memoize_one(() => console.warn(`${LIB} TODO KVP`))



interface RenderingOptionsⵧToReact extends BaseRenderingOptions {
	key?: string
}
const DEFAULT_RENDERING_OPTIONSⵧToReact: RenderingOptionsⵧToReact = {
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
}

interface WalkState {
	element: React.ReactElement // core result

	// this is where the sub-nodes concatenation happens
	children_states: Array<WalkState>
	$sub_nodes: Array<Node> // we also store the sub-nodes, but no usage yet


	//classes: Array<string>

	//component: keyof typeof NODE_TYPE_TO_COMPONENT

	//wrapper: React.ReactElement // wrapper, needed when children
}

// a clever key is critically needed in general, but even more critical
// for lists, whom default keys "1, 2, 3" is dangerous if the list is re-ordered.
// Thus we attempt to enrich the default key ($id) from various hints.
function _generate_own_react_key({$id, $node}) {
	let key = $id

	if ($node.$type === 'li') {
		// this is a wrapper, go down a level
		$node = $node.$sub[SPECIAL_LIST_NODE_CONTENT_KEY]
	}

	if ($node.$hints?.key)
		key += `.aka:${$node.$hints.key}`
	if ($node.$hints?.uuid)
		key += `.uuid:${$node.$hints.uuid}`

	//console.log('_generate_own_react_key', {$id, $node, key})

	return key
}

function _get_aggregated_keyed_children({state}): Array<React.ReactElement> {
	let children: Array<React.ReactElement> = state.children_states.map(s => s.element)
	const complex_children_count = children.reduce((acc, child) => {
		if (!child || typeof child === 'string')
			return acc

		return acc + 1
	}, 0)
	if (complex_children_count > 1) {
		// we need to key the children out of safety
		// at their level, children can't ensure that their keys are unique,
		// especially for {br} which may be repeated.
		// We need to assist with that:

		//console.group(`starting rekey for ${$id}...`)
		//console.log({$node, state})
		const key_count = {}
		children = children.map(child => {
			if (typeof child === 'string')
				return child

			let key = child.key

			key_count[key] = (key_count[key] || 0) + 1

			if (key_count[key] > 1)
				key += `+${key_count[key]}`

			if (key !== child.key)
				child = React.cloneElement(child, { key })

			return child
		})
		//console.log(key_count)
		//console.groupEnd()
	}

	return children
}

function _get_aggregated_classes({$node}): Set<string> {
	const { $type, $classes, $hints } = $node

	const classes = new Set<string>([
		...$classes,
		...(NODE_TYPE_TO_EXTRA_CLASSES[$type] || []),
		'o⋄children-spacing⁚flow',
	])

	if (isꓽlist($node)) {
		classes.add('o⋄rich-text⋄list')

		if (isꓽlistⵧuuid($node)) {
			//console.log(`${LIB} seen uuid list`)
			classes.add('o⋄rich-text⋄list--interactive')
		}

		switch($hints.bullets_style) {
			case 'none':
				classes.add('o⋄rich-text⋄list--no-bullet')
				break

			default:
				break
		}

		if (isꓽlistⵧKV($node)) {
			// TODO rewrite completely
			warn_kvp()
			classes.add('o⋄rich-text⋄list--no-bullet')
		}
	}

	return classes
}

function _get_final_element_creator({$node, $id, classes} : { $node: CheckedNode, $id: string, classes: Set<string>}): (children: ReactNode[]) => React.ReactElement | React.ReactElement[] {
	const { $type, $hints } = $node

	const key = _generate_own_react_key({$id, $node})
	const classProps = {
		...(classes.size && { className: classNames(Array.from(classes.values()))}),
	}

	if ($hints.href)
		return (children) => React.createElement(
			'a',
			{
				key,
				...classProps,
				href: $hints.href,
				target: '_blank',
			},
			children,
		)

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

	const component: React.HTMLElementType = NODE_TYPE_TO_COMPONENT[$type] || $type

	return children => React.createElement(
		component,
		{
			key,
			...classProps,
		},
		children,
	)
}

/////////////////////////////////////////////////

const create_state: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['create_state'] = (): WalkState => {
	return {
		element: null,
		$sub_nodes: [],
		children_states: [],
	}
}

const on_nodeⵧexit: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_nodeⵧexit'] = ({state, $node, $id})=> {
	if ($node.$type === 'br' || $node.$type === 'hr') {
		state.children_states = []
	}

	const children = _get_aggregated_keyed_children({state})
	const classes = _get_aggregated_classes({$node})
	const create_element = _get_final_element_creator({$node, $id, classes})

	state.element = create_element(children)

	return state
}

const on_concatenateⵧstr: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_concatenateⵧstr'] = ({state, str}) => {
	state.children_states.push({
		element: str,
	})
	return state
}

const on_concatenateⵧsub_node: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_concatenateⵧsub_node'] = ({state, sub_state, $node}) => {
	state.$sub_nodes.push($node)
	state.children_states.push(sub_state)

	return state
}

const on_filterꘌCapitalize: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>['on_filter'] =  ({state}) => {
	//console.warn('rich-text-to-react Capitalize', state)

	state.element = React.cloneElement(
		state.element,
		{
			children: React.Children.map(
				state.element.props.children,
				(child) => (typeof child === 'string')
					? child[0].toUpperCase() + child.slice(1)
					: child,
			),
		},
	)

	return state
}

const callbacksⵧto_react: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact> = {
	create_state,
	on_nodeⵧexit,
	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
	on_filterꘌCapitalize,
}

/////////////////////////////////////////////////

type Options = {
}

function renderⵧto_react(doc: Immutable<NodeLike>, callback_overrides: Partial<WalkerCallbacks<WalkState, RenderingOptionsⵧToReact>> = {}, options: RenderingOptionsⵧToReact = {}) {
	//console.log(`${LIB} Rendering a rich text:`, doc)

	const callbacks: WalkerCallbacks<WalkState, RenderingOptionsⵧToReact> = {
		...callbacksⵧto_react,
		...callback_overrides,
	}

	options = {
		...DEFAULT_RENDERING_OPTIONSⵧToReact,
		...options,
	}

	const state = walk<WalkState, RenderingOptionsⵧToReact>(
		doc,
		callbacks,
		options,
	)

	return React.createElement('div', {
		key: options.key || 'rich-text-format-to-react--root',
		className: 'o⋄rich-text o⋄children-spacing⁚flow',
	}, state.element)
}

/////////////////////////////////////////////////

export {
	type RenderingOptionsⵧToReact,
	renderⵧto_react,
}
