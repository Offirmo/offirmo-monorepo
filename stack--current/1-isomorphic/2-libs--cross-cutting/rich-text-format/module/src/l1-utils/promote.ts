import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { assertꓽstringⵧnormalized } from '@offirmo-private/normalize-string'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

import { LIB } from '../consts.ts'

import {
	NodeType,
	type NodeLike,
	type Node,
	assertꓽNode
} from '../l1-types/index.ts'

/////////////////////////////////////////////////

function promoteꓽto_string_for_node_content(str: Immutable<Exclude<NodeLike, Node>>): string {
	switch (typeof str) {
		case 'string': {
			// note: can be empty, esp. at node creation
			assertꓽstringⵧnormalized(str)
			break
		}
		case 'number':
			// TODO one day number formatting with locale
			break

		default:
			assert(false, `${LIB}: sugar: pushText(): Unknown pseudo-node type!`)
	}

	return '' + str
}

function promoteꓽto_node($raw: NodeLike): Node
function promoteꓽto_node($raw: Immutable<NodeLike>): Immutable<Node>
function promoteꓽto_node($raw: Immutable<NodeLike>): Immutable<Node> {
	switch (typeof $raw) {
		case 'string':
		case 'number':
			return {
				$type: NodeType.fragmentⵧinline,
				$content: promoteꓽto_string_for_node_content($raw),
			}

		default:
			// we could be passed anything, (ex false, undef...)
			// better check it looks like a Node
			assert(isꓽobjectⵧliteral($raw), `promoteꓽto_node(): passed object should be an object literal!`)
			assertꓽNode($raw)
			return $raw
	}
}

/////////////////////////////////////////////////

export {
	promoteꓽto_string_for_node_content,
	promoteꓽto_node,
}
