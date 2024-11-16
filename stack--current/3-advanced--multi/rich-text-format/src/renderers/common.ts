import {
	type CheckedNode,
} from '../types/index.js'

/////////////////////////////////////////////////

function isꓽlink($node: CheckedNode): boolean {
	return !!$node.$hints.href
}

function isꓽlist($node: CheckedNode): boolean {
	return ($node.$type === 'ul' || $node.$type === 'ol')
}

function isꓽlistⵧKV($node: CheckedNode): boolean {
	if (!isꓽlist($node))
		return false

	return Object.values($node.$sub)
		.every($node => $node.$content === '⎨⎨key⎬⎬: ⎨⎨value⎬⎬')
}

function isꓽlistⵧuuid($node: CheckedNode): boolean {
	if (!isꓽlist($node))
		return false

	return Object.values($node.$sub)
		.every($node => !!$node.$hints?.uuid)
}

/////////////////////////////////////////////////

export {
	isꓽlist,
	isꓽlink,
	isꓽlistⵧKV,
	isꓽlistⵧuuid,
}
