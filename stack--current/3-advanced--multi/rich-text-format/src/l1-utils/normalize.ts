import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'
import { LIB, SCHEMA_VERSION } from '../consts.ts'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node,
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
		$v = 1, // assume oldest format (until we can recognize the version)
		$type = NodeType.fragmentⵧinline,
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
