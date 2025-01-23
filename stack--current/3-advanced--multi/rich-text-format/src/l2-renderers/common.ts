import type { Immutable } from '@offirmo-private/ts-types'
import {
	type CheckedNode,
} from '../l1-types/types.ts'

/////////////////////////////////////////////////

const NODE_TYPE_to_DISPLAY_MODE: Immutable<{ [k: string]: 'inline' | 'block' }> = {

	// classic inlines
	'fragmentⵧinline': 'inline',
	'strong':          'inline',
	'weak':            'inline',
	'em':              'inline',
	'emoji':           'inline',

	// classic blocks
	'fragmentⵧblock':  'block',
	'heading':         'block',
	'hr':              'block',
	'ol':              'block',
	'ul':              'block',

	// special
	'br':              'inline',

	// internally used, don't mind
	'li':              'block',
}

function isꓽlink($node: Immutable<CheckedNode>): boolean {
	return !!$node.$hints.href
}

function isꓽlist($node: Immutable<CheckedNode>): boolean {
	return ($node.$type === 'ul' || $node.$type === 'ol')
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
	NODE_TYPE_to_DISPLAY_MODE,
	isꓽlist,
	isꓽlink,
	isꓽlistⵧKV,
	isꓽlistⵧuuid,
}
