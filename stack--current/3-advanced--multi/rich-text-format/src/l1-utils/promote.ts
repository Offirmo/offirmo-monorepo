import type { Immutable } from '@offirmo-private/ts-types'

import {
	NodeType,
	type NodeLike,
	type Node,
	assertꓽisꓽNode
} from '../l1-types/index.ts'

/////////////////////////////////////////////////

function promoteꓽto_node($raw: NodeLike): Node
function promoteꓽto_node($raw: Immutable<NodeLike>): Immutable<Node>
function promoteꓽto_node($raw: Immutable<NodeLike>): Immutable<Node> {
	if (typeof $raw === 'number')
		$raw = String($raw)

	if (typeof $raw === 'string')
		return {
			$type: NodeType.fragmentⵧinline,
			$content: $raw,
		}

	// it could be anything bc type Node is very lax, better check
	assertꓽisꓽNode($raw)

	return $raw
}

/////////////////////////////////////////////////

export {
	promoteꓽto_node,
}
