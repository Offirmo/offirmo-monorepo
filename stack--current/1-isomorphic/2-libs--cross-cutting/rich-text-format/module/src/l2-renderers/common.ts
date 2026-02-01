import type { Immutable } from '@offirmo-private/ts-types'
import type {
	CheckedNode,
} from '../l1-types/types.ts'
import {
	isꓽlist,
} from '../l1-types/guards.ts'


/////////////////////////////////////////////////


function isꓽlink($node: Immutable<CheckedNode>): boolean {
	return !!$node.$hints.href
}

function isꓽlistⵧKV($node: Immutable<CheckedNode>): boolean {
	if (!isꓽlist($node))
		return false

	return Object.values($node.$sub)
		.every($node => ($node as any)?.$content === '⎨⎨key⎬⎬: ⎨⎨value⎬⎬')
}

// TODO what is that already?
function isꓽlistⵧuuid($node: Immutable<CheckedNode>): boolean {
	if (!isꓽlist($node))
		return false

	return Object.values($node.$sub)
		.every($node => !!($node as any)?.$hints?.uuid)
}

/////////////////////////////////////////////////

export {
	isꓽlink,
	isꓽlistⵧKV,
	isꓽlistⵧuuid,
}
