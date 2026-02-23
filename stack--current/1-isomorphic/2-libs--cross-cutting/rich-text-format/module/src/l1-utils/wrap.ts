import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { NodeLike } from '../l1-types/index.ts'
import { type Node, NodeType, isꓽNode } from '../l1-types/index.ts'
import { promoteꓽto_node } from './promote.ts'
import { _NODE_TYPE_to_DISPLAY_MODE, getꓽtype } from './misc.ts'

/////////////////////////////////////////////////

function wrap($nodeⵧto_wrap: Immutable<NodeLike>, typeⵧwrapper: NodeType): Immutable<NodeLike> {
	assert(typeⵧwrapper !== 'fragmentⵧinline', `should not wrap in a type with no semantic meaning!`)

	const typeⵧwrapped = getꓽtype($nodeⵧto_wrap)
	if (typeⵧwrapped === typeⵧwrapper) {
		// nothing to do
		return $nodeⵧto_wrap
	}

	const display_typeⵧwrapped = _NODE_TYPE_to_DISPLAY_MODE[typeⵧwrapped]
	assert(display_typeⵧwrapped)
	const display_typeⵧwrapper = _NODE_TYPE_to_DISPLAY_MODE[typeⵧwrapper]
	assert(display_typeⵧwrapper)
	if (display_typeⵧwrapped === 'block') {
		assert(display_typeⵧwrapper === 'block', 'wrap(): cannot wrap a block inside an inline!')
	}

	if (typeⵧwrapper === 'fragmentⵧblock' && display_typeⵧwrapped === 'block') {
		// it's already a block,
		// and this type has no semantic meaning
		// = nothing to do
		return $nodeⵧto_wrap
	}

	if (typeⵧwrapped === 'fragmentⵧblock' || typeⵧwrapped === 'fragmentⵧinline') {
		// no semantic meaning = type can be replaced in-place
		const $nodeⵧwrapper: Immutable<Node> = {
			...promoteꓽto_node($nodeⵧto_wrap),
			$type: typeⵧwrapper,
		}
		return $nodeⵧwrapper
	}

	// we need 1 level of indirection

	if (display_typeⵧwrapper === 'block') {
		const $nodeⵧwrapper: Immutable<Node> = {
			$type: typeⵧwrapper,
			$content: isꓽNode($nodeⵧto_wrap) ? [ $nodeⵧto_wrap ] : $nodeⵧto_wrap,
		}
		return $nodeⵧwrapper
	}

	// no known usage so far
	throw new Error('wrap(): unsupported use case!')
}
/////////////////////////////////////////////////

export {
	wrap,
}
