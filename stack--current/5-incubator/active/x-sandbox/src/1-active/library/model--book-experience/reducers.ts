import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import { type BookCover, type BookPartReference, NODE_REFERENCEꘌROOT, type Text } from '../model--book/index.ts'

import { AccessLevel, type BookExperience, type NodeExperience } from './types.ts'
import { _getꓽnode__experienceⵧexact, isꓽstarredⵧexact } from './selectors.ts'

/////////////////////////////////////////////////

function _createꓽnode_experience(partial: Partial<NodeExperience> = {}): NodeExperience {
	return {
		...partial
	}
}

// many properties are optional bc
// - they have defaults
// - they can be inherited
// We want to clean them ap as much as we can
function _cleanupꓽnode_experience(state: Immutable<NodeExperience>): Immutable<NodeExperience> {
	if (state.access_level === AccessLevel.unaware) {
		assert(!Object.hasOwn(state, 'comprehension_level'), 'unaware should not have comprehension!')
	}

	const temp = {
		...state
	}
	if (temp.starred !== true)
		delete temp.starred

	return temp
}

/////////////////////////////////////////////////

function create(cover: Immutable<BookCover>): Immutable<BookExperience> {
	return {
		book_uid: cover.uid,
		last_user_investment_tms: 0,

		// no init of comprehension level
		// because different applications may have different default access level
	}
}

function setꓽstarred(state: Immutable<BookExperience>, path: Immutable<BookPartReference>, target: boolean): Immutable<BookExperience> {
	const current_value = isꓽstarredⵧexact(state, path)
	if (target === current_value)
		return state

	const node_experienceⵧcurrent = _getꓽnode__experienceⵧexact(state, path)
	const node_experienceⵧtarget = _cleanupꓽnode_experience({
		...(node_experienceⵧcurrent || _createꓽnode_experience()),
		starred: target,
	})

	return {
		...state,
		comprehension_level‿by_path: {
			...state.comprehension_level‿by_path,
			[NODE_REFERENCEꘌROOT]: node_experienceⵧtarget,
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	setꓽstarred,
}
