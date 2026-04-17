import assert from '@monorepo-private/assert/v1'
import { type Immutable } from '@monorepo-private/ts--types'
import type { StrictNode, NodeLike } from '@monorepo-private/rich-text-format'
import { wrap, isꓽlist, isꓽNodeLike } from '@monorepo-private/rich-text-format'

/////////////////////////////////////////////////

function isꓽlink($node: Immutable<StrictNode>): boolean {
	return !!$node.$hints.href
}

// for iterating only
function getꓽcontent‿nodes_list($node: Immutable<StrictNode>): Array<Immutable<NodeLike>> {
	if (isꓽNodeLike($node.$content)) {
		// simply promote to array
		return [ $node.$content ]
	}

	if (Array.isArray($node.$content)) {
		const is_list = isꓽlist($node)

		return $node.$content.map($row_node => {
			// IMPORTANT preserve the info that this node was a "row" with an expected block display
			// if list, also preserve the extra semantic meaning
			return wrap($row_node, is_list ? '_li' : 'fragmentⵧblock')
		})
	}

	throw new Error('Unknown case!')
}

/* this is a table, TODO reimplement
function isꓽlistⵧKV($node: Immutable<CheckedNode>): boolean {
	if (!isꓽlist($node)) return false

	return Object.values($node.$refs).every(
		$node => ($node as any)?.$content === '⎨⎨key⎬⎬: ⎨⎨value⎬⎬',
	)
}
*/

/* TODO what is that already?
function isꓽlistⵧuuid($node: Immutable<CheckedNode>): boolean {
	if (!isꓽlist($node)) return false

	return Object.values($node.$refs).every($node => !!($node as any)?.$hints?.uuid)
}
*/

/////////////////////////////////////////////////

export { isꓽlink, getꓽcontent‿nodes_list }
