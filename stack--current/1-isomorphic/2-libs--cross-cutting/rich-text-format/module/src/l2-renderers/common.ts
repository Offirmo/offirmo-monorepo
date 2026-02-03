import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import { NodeType } from '../l1-types/types.ts'
import type { Node, CheckedNode, NodeLike } from '../l1-types/types.ts'
import { getꓽdisplay_type, promoteꓽto_node } from '../l1-utils'
import { isꓽNode, isꓽNodeLike } from '../l1-types'
import { LIB } from '../consts.ts'

/////////////////////////////////////////////////

function isꓽlink($node: Immutable<CheckedNode>): boolean {
	return !!$node.$hints.href
}

function getꓽcontent_nodes‿array($node: Immutable<CheckedNode>): Array<Immutable<NodeLike>> {
	const result: Array<Immutable<NodeLike>> = []

	if (isꓽNodeLike($node.$content)) {
		result.push($node.$content)
	} else if (Array.isArray($node.$content)) {

		result.push(...$node.$content.map($row_node => {
			if (isꓽNode($row_node)) {
				assert(getꓽdisplay_type($row_node) === 'block', `${LIB}[walk]: row should be a block!`)
				return $row_node
			}

			// preserve the info that this node was a "row"
			return {
				$type: 'fragmentⵧblock',
				$content: $row_node,
			} satisfies Node
		}))
	} else {
		assert('$content type should match expected structure!')
	}

	return result
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

export { isꓽlink, getꓽcontent_nodes‿array }
