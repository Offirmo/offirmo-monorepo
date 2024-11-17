import { type Immutable } from '@offirmo-private/ts-types'

import {
	NodeType,
	type NodeLike,
	type Node,
} from '../types/index.js'
import { assertꓽisꓽNode } from '../types/guards.js'

/////////////////////////////////////////////////

function promoteꓽto_node($raw: NodeLike): Node {
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
/*
function promoteꓽto_nodeⵧimmutable(
	$raw: Immutable<NodeLike>
): Immutable<Node> {
	return promoteꓽto_node($raw as any)
}*/

/////////////////////////////////////////////////

export {
	promoteꓽto_node,
	//promoteꓽto_nodeⵧimmutable,
}
