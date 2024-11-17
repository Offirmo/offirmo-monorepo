import {
	type CheckedNode,
} from '../types/types.js'

/////////////////////////////////////////////////

const NODE_TYPE_to_DISPLAY_MODE: Readonly<{ [k: string]: 'inline' | 'block' }> = {

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
	NODE_TYPE_to_DISPLAY_MODE,
	isꓽlist,
	isꓽlink,
	isꓽlistⵧKV,
	isꓽlistⵧuuid,
}
