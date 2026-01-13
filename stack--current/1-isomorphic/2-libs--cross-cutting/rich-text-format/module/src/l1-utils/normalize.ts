import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'
import { normalize_unicode } from '@offirmo-private/normalize-string'
import { LIB, SCHEMA_VERSION } from '../consts.ts'

import {
	NodeType,
	type CheckedNode,
	type Node, type NodeLike,
} from '../l1-types/types.ts'

/////////////////////////////////////////////////

/** normalize the given node (not deeply, only 1st level)
 */
function normalizeꓽnode($raw_node: Node): CheckedNode
function normalizeꓽnode($raw_node: Immutable<Node>): Immutable<CheckedNode>
function normalizeꓽnode($raw_node: Immutable<Node>): Immutable<CheckedNode> {
	assert(!!$raw_node, `normalize_node(): param should be defined!`)

	const {
		// extract fields
		$v = 1, // assume the oldest format (until we can recognize the version)
		$type = NodeType.fragmentⵧinline,
		$heading = null,
		$content = '',
		$sub = {},
		$classes = [],
		$hints = {},
		...rest
	} = $raw_node
	assert(Object.keys(rest).length === 0, `${LIB}: node contain extraneous keys! (${Object.keys(rest).join(',')})`)

	if ($v !== SCHEMA_VERSION)
		throw new Error(`${LIB}: unknown schema version "${$v}"!`)

	// validation: not our responsibility

	const $node: Immutable<CheckedNode> = {
		$v,
		$type,
		$classes,
		$heading,
		$content: normalize_unicode($content),
		$sub,
		$hints,
	}

	return $node
}

function simplifyꓽnode($any_node: NodeLike): NodeLike
function simplifyꓽnode($any_node: Immutable<NodeLike>): Immutable<NodeLike> {
	assert(!!$any_node, `simplifyꓽnode(): param should be defined!`)

	if (!isꓽobjectⵧliteral($any_node)) {
		return $any_node // already simplified
	}

	let {
		// extract fields
		$v = 1, // assume the oldest format (until we can recognize the version)
		$type = NodeType.fragmentⵧinline,
		$heading = null,
		$content = '',
		$sub = {},
		$classes = [],
		$hints = {},
	} = $any_node

	let $node: Node = {
		$v,
		$type,
		$heading,
		$content,
		$sub,
		$classes,
		$hints,
	} satisfies CheckedNode

	if ($v === SCHEMA_VERSION) {
		delete $node.$v
	}
	if (Object.keys($sub).length === 0) {
		delete $node.$sub
	}
	if ($classes.filter(c => c?.trim()).length === 0) {
		delete $node.$classes
	}
	if (Object.keys($node.$hints).length === 0) {
		delete $node.$hints
	}

	// content & type are a bit more complicated
	let $content_: Array<NodeLike> = (Array.isArray($content) ? $content : [ $content ])
	$content_ = $content_.map(simplifyꓽnode)

	if ($content_.length <= 1) {
		$node.$content = $content_[0] ?? ''
		if ($type = NodeType.fragmentⵧinline) {
			delete $node.$type
		}
	}
	else {
		if ($type = NodeType.fragmentⵧblock) {
			delete $node.$type
		}
	}

	const non_content_props = Object.keys($node).filter(k => k !== '$content')
	if (non_content_props.length === 0 && $type === NodeType.fragmentⵧinline) {
		if (typeof $node.$content === 'string')
			return $node.$content
		if (typeof $node.$content === 'number')
			return $node.$content
	}

	return $node
}

/////////////////////////////////////////////////

export {
	normalizeꓽnode,
	simplifyꓽnode,
}
