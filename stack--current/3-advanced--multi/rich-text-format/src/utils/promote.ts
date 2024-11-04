import { type Immutable } from '@offirmo-private/ts-types'

import {
	NodeType,
	type NodeLike,
	type Node,
} from '../types.js'
import { assertꓽisꓽNode } from '../type-guards.js'

/////////////////////////////////////////////////

function promoteꓽto_node<Hints>($raw: NodeLike<Hints>): Node<Hints> {
	if (typeof $raw === 'number')
		$raw = String($raw)

	if (typeof $raw === 'string')
		return {
			$type: NodeType.fragmentⵧinline,
			$content: $raw,
		}

	// it could be anything bc Node is very lax, better check
	assertꓽisꓽNode($raw)
	return $raw
}

function promoteꓽto_nodeⵧimmutable<Hints>(
	$raw: Immutable<NodeLike<Hints>>
): Immutable<Node<Hints>> {
	return promoteꓽto_node($raw as any)
}

/////////////////////////////////////////////////

export {
	promoteꓽto_node,
	promoteꓽto_nodeⵧimmutable,
}
