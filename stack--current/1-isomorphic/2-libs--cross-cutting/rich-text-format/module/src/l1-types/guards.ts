import assert from '@monorepo-private/assert/v1'
import { Enum } from 'typescript-string-enums'
import type { Immutable } from '@monorepo-private/ts--types'
import { assertꓽshape } from '@monorepo-private/type-detection'

import { NodeType } from './types.ts'
import type { Node, StrictNode, NodeLike } from './types.ts'

/////////////////////////////////////////////////

// with all fields, even optionals
const $EXAMPLE_COMPLETE_NODE: StrictNode = {
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

// Adapt the reference value to match the candidate's type,
// so that assertꓽshape's "simple" type_match doesn't reject valid NodeLike variants (number vs string).
function _adaptꓽNodeLikeꓽref(reference_value: NodeLike, candidate_value: unknown): NodeLike | NodeLike[] {
	if (typeof candidate_value === 'number')
		return 0
	if (Array.isArray(candidate_value))
		return [] as Array<NodeLike>
	return reference_value
}

function assertꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node>
function assertꓽNode(candidate: any): asserts candidate is Node
function assertꓽNode(candidate: Immutable<any>): asserts candidate is Immutable<Node> {
	const reference: Record<string, any> = {
		...$EXAMPLE_COMPLETE_NODE,
	}
	// adapt the reference
	if (!candidate?.$heading)
		reference["$heading"] = null
	else
		reference["$heading"] = _adaptꓽNodeLikeꓽref(reference["$heading"] as NodeLike, candidate?.$heading)
	reference["$content"] = _adaptꓽNodeLikeꓽref(reference["$content"] as NodeLike, candidate?.$content)

	assertꓽshape(reference, candidate, {
		// "Node" is quite loose, so we only expect at least 1 prop
		match_reference_props: 'some',
		// but no extra prop
		allow_extra_props: false,
	})

	// validate $type against the enum if present
	if (candidate["$type"] !== undefined && candidate["$type"] !== 'auto') {
		assert(Enum.isType(NodeType, candidate["$type"]), `Node type should be an allowed value "${candidate["$type"]}"!`)
	}
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
