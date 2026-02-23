import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'
import { Enum } from 'typescript-string-enums'

import type { NodeLike } from '../l1-types/index.ts'
import { NodeType, isꓽNode } from '../l1-types/index.ts'

/////////////////////////////////////////////////
// selectors

function getꓽtype($node: Immutable<NodeLike>): NodeType {
	if (!isꓽNode($node)) {
		// it's a primitive: string or number
		return 'fragmentⵧinline'
	}

	if (Array.isArray($node.$content)) {
		if ($node.$type && $node.$type !== 'auto') {
			assert(
				_NODE_TYPE_to_DISPLAY_MODE[$node.$type] === 'block',
				`getꓽtype: node with array content should be block type!`,
			)
			return $node.$type
		}
		return 'fragmentⵧblock'
	}

	if ($node.$type && $node.$type !== 'auto') {
		return $node.$type
	}

	return 'fragmentⵧinline'
}

const _NODE_TYPE_to_DISPLAY_MODE: Immutable<{ [k: string]: 'inline' | 'block' }> = {

	// classic inlines
	[NodeType.fragmentⵧinline]: 'inline',
	[NodeType.strong]: 'inline',
	[NodeType.weak]: 'inline',
	[NodeType.em]: 'inline',
	[NodeType.emoji]: 'inline',

	// classic blocks
	[NodeType.fragmentⵧblock]: 'block',
	//[NodeType.heading]:         'block',
	[NodeType.ol]: 'block',
	[NodeType.ul]: 'block',
	[NodeType.hr]: 'block',

	// special
	[NodeType.br]: 'inline', // allowed in inline

	// internally used, don't mind
	[NodeType._h]: 'block',
	[NodeType._li]: 'block',
}
assert(
	Enum.keys(NodeType).sort().join(',') === Object.keys(_NODE_TYPE_to_DISPLAY_MODE).sort().join(','),
	`_NODE_TYPE_to_DISPLAY_MODE should be up to date!`
)

function getꓽdisplay_type($node: Immutable<NodeLike>): 'inline' | 'block' {
	const $type = getꓽtype($node)

	const result = _NODE_TYPE_to_DISPLAY_MODE[$type]
	assert(!!result, `getꓽdisplay_type: unknown type "${$type}"!`)

	return result
}

/////////////////////////////////////////////////

function isꓽdisplayⵧinline(node: Immutable<NodeLike>): boolean {
	return getꓽdisplay_type(node) === 'inline'
}
function isꓽdisplayⵧblock(node: Immutable<NodeLike>): boolean {
	return getꓽdisplay_type(node) === 'block'
}

function isꓽlist($node: Immutable<NodeLike>): boolean {
	const $type = getꓽtype($node)

	return $type === 'ol' || $type === 'ul'
}

/////////////////////////////////////////////////

export {
	_NODE_TYPE_to_DISPLAY_MODE, // exported for tests
	getꓽtype,
	isꓽlist,
	getꓽdisplay_type,
	isꓽdisplayⵧinline,
	isꓽdisplayⵧblock,
}
