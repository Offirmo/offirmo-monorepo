import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { LIB } from '../consts.js'
import { type Node } from './types.js'

/////////////////////////////////////////////////

const EXPECTED_FIELDS = new Set<string>([
	'$v',
	'$type',
	'$content',
	'$sub',
	'$classes',
	'$hints',
])
function assertꓽisꓽNode(candidate: Immutable<any>): asserts candidate is Node {
	// "Node" is quite loose so we only expect at least 1 param
	const keys = Object.keys(candidate)
	keys.forEach(k => {
		assert(EXPECTED_FIELDS.has(k), `${LIB}: a Node should not contain extraneous fields! ("${k}")`)
	})
	assert(keys.length > 0, `${LIB}: a Node should have at least 1 recognized field!`)
}

function isꓽNode(node: Immutable<any>): node is Node {
	try {
		assertꓽisꓽNode(node)
		return true
	}
	catch (err) {
		return false
	}
}

/////////////////////////////////////////////////

export {
	assertꓽisꓽNode,
	isꓽNode,
}
