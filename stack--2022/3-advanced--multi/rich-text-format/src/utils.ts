import assert from 'tiny-invariant'

import { LIB, SCHEMA_VERSION } from './consts.js'

import {
	NodeType,
	CheckedNode,
	Node,
} from './types.js'

/////////////////////////////////////////////////

function normalizeꓽnode($raw_node: Readonly<Node>): CheckedNode {
	assert(!!$raw_node, `normalize_node(): undefined or null!`)

	const {
		$v = 1,
		$type = NodeType.fragmentⵧinline,
		$classes = [],
		$content = '',
		$sub = {},
		$hints = {},
	} = $raw_node

	// TODO migration
	if ($v !== SCHEMA_VERSION)
		throw new Error(`${LIB}: unknown schema version "${$v}"!`)

	// TODO validation

	const $node: CheckedNode = {
		$v,
		$type,
		$classes,
		$content,
		$sub,
		$hints,
	}

	return $node
}

/////////////////////////////////////////////////

export {
	normalizeꓽnode,
}
