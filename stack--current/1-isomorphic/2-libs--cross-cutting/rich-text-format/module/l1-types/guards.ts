import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { assertꓽshape } from '@offirmo-private/type-detection'

import type { Node, CheckedNode, NodeLike } from './types.ts'
import { NodeType } from './types.ts'

/////////////////////////////////////////////////

// full demo with all fields, even optional
const EXAMPLE_COMPLETE_NODE: CheckedNode = {
	$v: 1,
	$type: 'fragmentⵧinline',
	$content: 'Hello, ⎨⎨target⎬⎬!',
	$sub: {
		target: 'World',
	},
	$classes: [], // TODO some?
	$hints: {
		possible_emoji: '👋',
	},
}

function assertꓽisꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node>
function assertꓽisꓽNode(candidate: any): asserts candidate is Node
function assertꓽisꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node> {
	return assertꓽshape(EXAMPLE_COMPLETE_NODE, candidate, {
		// "Node" is quite loose so we only expect at least 1 prop
		match_reference_props: 'some',
		// but no extra prop
		allow_extra_props: false,
	})
}

function isꓽNode(node: Immutable<any>): node is Immutable<Node>
function isꓽNode(node: any): node is Node
function isꓽNode(node: Immutable<any>): node is Immutable<Node> {
	try {
		assertꓽisꓽNode(node)
		return true
	}
	catch (err) {
		return false
	}
}

/////////////////////////////////////////////////
// selectors

const DEFAULT_NODE_TYPE: NodeType = 'fragmentⵧinline'

function getꓽtype(node: Immutable<NodeLike>): NodeType {
	if (!isꓽNode(node)) return DEFAULT_NODE_TYPE

	if (!node.$type) {
		return DEFAULT_NODE_TYPE
	}

	return node.$type
}

function isꓽlist(node: Immutable<NodeLike>): boolean {
	const $type = getꓽtype(node)

	return $type === 'ol' || $type === 'ul'
}


const _NODE_TYPE_to_DISPLAY_MODE: Immutable<{ [k: string]: 'inline' | 'block' }> = {
// TODO assert completeness and no-intersection of inline and block

	// classic inlines
	[NodeType.fragmentⵧinline]: 'inline',
	[NodeType.strong]:          'inline',
	[NodeType.weak]:            'inline',
	[NodeType.em]:              'inline',
	[NodeType.emoji]:           'inline',

	// classic blocks
	[NodeType.fragmentⵧblock]:  'block',
	[NodeType.heading]:         'block',
	[NodeType.ol]:              'block',
	[NodeType.ul]:              'block',
	[NodeType.hr]:              'block',

	// special
	[NodeType.br]:              'inline', // allowed in inline

	// internally used, don't mind
	[NodeType._li]:             'block',
}

function getꓽdisplay_type(node: Immutable<NodeLike>): 'inline' | 'block' {
	const $type = getꓽtype(node)

	const result = _NODE_TYPE_to_DISPLAY_MODE[$type]!
	assert(result, `getꓽdisplay_type: unknown type "${$type}"!`)

	return result
}

function isꓽinline(node: Immutable<NodeLike>): boolean {
	return getꓽdisplay_type(node) === 'inline'
}
function isꓽblock(node: Immutable<NodeLike>): boolean {
	return getꓽdisplay_type(node) === 'block'
}

/////////////////////////////////////////////////

export {
	EXAMPLE_COMPLETE_NODE,

	assertꓽisꓽNode,
	isꓽNode,

	DEFAULT_NODE_TYPE,
	_NODE_TYPE_to_DISPLAY_MODE,
	getꓽtype,
	isꓽlist,

	getꓽdisplay_type,
	isꓽinline,
	isꓽblock,
}
