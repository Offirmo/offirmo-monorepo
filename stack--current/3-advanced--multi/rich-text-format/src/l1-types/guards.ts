import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { assertꓽshape } from '@offirmo-private/type-detection'

import { LIB } from '../consts.ts'
import type { Node, CheckedNode } from './types.ts'

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

export {
	EXAMPLE_COMPLETE_NODE,

	assertꓽisꓽNode,
	isꓽNode,
}
