import {
	NodeType,
	NodeLike,
	Node,
} from '../types.js'
import { assertꓽisꓽNode } from '../type-guards.js'

/////////////////////////////////////////////////

function promoteꓽto_node($raw: NodeLike): Node {
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

/////////////////////////////////////////////////

export {
	promoteꓽto_node,
}
