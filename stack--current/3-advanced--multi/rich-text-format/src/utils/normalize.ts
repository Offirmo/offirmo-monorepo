import assert from 'tiny-invariant'
import { normalize_unicode } from '@offirmo-private/normalize-string'
import { LIB, SCHEMA_VERSION } from '../consts.js'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node,
} from '../types/index.js'

/////////////////////////////////////////////////

function normalizeꓽnode($raw_node: Readonly<Node>, default_hints: Hints = {}): CheckedNode {
	assert(!!$raw_node, `normalize_node(): undefined or null!`)

	const {
		$v = 1,
		$type = NodeType.fragmentⵧinline,
		$classes = [],
		$content = '',
		$sub = {},
		$hints = default_hints,
		...rest
	} = $raw_node
	assert(Object.keys(rest).length === 0, `${LIB}: node contain extraneous keys! (${Object.keys(rest).join(',')})`)

	// TODO migration
	if ($v !== SCHEMA_VERSION)
		throw new Error(`${LIB}: unknown schema version "${$v}"!`)

	// TODO validation

	const $node: CheckedNode = {
		$v,
		$type,
		$classes,
		$content: normalize_unicode($content),
		$sub,
		$hints,
	}

	return $node
}

/////////////////////////////////////////////////

export {
	normalizeꓽnode,
}
