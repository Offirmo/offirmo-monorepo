import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import { NodeType } from '../l1-types/types.ts'
import type { Node, CheckedNode, NodeLike } from '../l1-types/types.ts'
import { getꓽdisplay_type, promoteꓽto_node } from '../l1-utils'
import { isꓽNodeLike } from '../l1-types'

/////////////////////////////////////////////////

function isꓽlink($node: Immutable<CheckedNode>): boolean {
	return !!$node.$hints.href
}

function getꓽcontent_nodes‿array($node: Immutable<CheckedNode>): Array<Immutable<NodeLike>> {
	const result: Array<Immutable<NodeLike>> = []

	if ($node.$heading) {
		const $heading = promoteꓽto_node($node.$heading)
		assert(
			getꓽdisplay_type($heading) === 'inline',
			`$heading content should be inline (think markdown)!`,
		)
		result.push({
			...$heading,
			$type: NodeType._h, // swap type to retain the knowledge it was a $heading
		})
	}

	if (isꓽNodeLike($node.$content)) {
		result.push($node.$content)
	} else if (Array.isArray($node.$content)) {
		result.push(...$node.$content)
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
