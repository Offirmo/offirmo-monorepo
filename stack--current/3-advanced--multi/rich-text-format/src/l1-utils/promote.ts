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

	// we could be passed anything, (ex false, undef...)
	// better check it looks like a Node
	assertꓽisꓽNode($raw)

	return $raw
}

/////////////////////////////////////////////////

export {
	promoteꓽto_node,
}
