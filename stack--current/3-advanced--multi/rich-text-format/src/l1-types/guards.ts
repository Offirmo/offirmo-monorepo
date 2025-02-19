import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { assertꓽshape } from '@offirmo-private/type-detection'

import type { Node, CheckedNode, NodeLike } from './types.ts'

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

const INLINE_NODE_TYPES = new Set([
	'strong',
	'em',
	'weak',
	'emoji',
	'fragmentⵧinline',
])
const BLOCK_NODE_TYPES = new Set([
	'heading',
	'ol',
	'ul',
	'hr',
	'fragmentⵧblock',
	'br',
	'li',
])
// TODO assert completeness and no-intersection of inline and block
function getꓽdisplay_type(node: Immutable<NodeLike>): 'inline' | 'block' {
	if (!isꓽNode(node)) return 'inline'

	if (!node.$type) {
		// default is fragmentⵧinline
		return 'inline'
	}

	switch(true) {
		case INLINE_NODE_TYPES.has(node.$type): return 'inline'
		case BLOCK_NODE_TYPES.has(node.$type): return 'block'
		default:
			throw new Error(`Unknown node type "${node.$type}"`)
	}
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

	getꓽdisplay_type,
	isꓽinline,
	isꓽblock,
}
