import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { assertꓽshape } from '@offirmo-private/type-detection'

import type { Node, CheckedNode, NodeLike } from './types.ts'

/////////////////////////////////////////////////

// with all fields, even optionals
const $EXAMPLE_COMPLETE_NODE: CheckedNode = {
	$v: 1,
	$type: 'fragmentⵧinline',
	$heading: 'title',
	$content: 'Hello, ⎨⎨target⎬⎬!',
	$refs: {
		target: 'World',
	},
	$classes: ['foo'],
	$hints: {
		possible_emoji: '👋',
	},
}

function assertꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node>
function assertꓽNode(candidate: any): asserts candidate is Node
function assertꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node> {
	const reference = {
		...$EXAMPLE_COMPLETE_NODE,
	}
	if (!candidate?.$heading)
		reference.$heading = null
	if (Array.isArray(candidate?.$content))
		reference.$content = []
	return assertꓽshape(reference, candidate, {
		// "Node" is quite loose, so we only expect at least 1 prop
		match_reference_props: 'some',
		// but no extra prop
		allow_extra_props: false,
	})
}

function isꓽNode(node: Immutable<any>): node is Immutable<Node>
function isꓽNode(node: any): node is Node
function isꓽNode(node: Immutable<any>): node is Immutable<Node> {
	try {
		assertꓽNode(node)
		return true
	} catch (err) {
		return false
	}
}

function isꓽNodeLike(node: Immutable<any>): node is Immutable<NodeLike>
function isꓽNodeLike(node: any): node is NodeLike
function isꓽNodeLike(node: Immutable<any>): node is Immutable<NodeLike> {
	const type = typeof node
	switch (type) {
		case 'string':
		case 'number':
			return true
		default:
			return isꓽNode(node)
	}
}

/////////////////////////////////////////////////

export { $EXAMPLE_COMPLETE_NODE, assertꓽNode, isꓽNode, isꓽNodeLike }
