/* PROMPT
 */

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { getꓽnodeⵧby_pathⵧensure_file } from '@offirmo-private/data-structures'

import type { StoryUId, StoryEntry, StoryFolder } from '../types.ts'
import type { State } from './types.ts'

/////////////////////////////////////////////////

function getꓽstoryⵧby_uid(state: Immutable<State>, uid: StoryUId): Immutable<StoryEntry> | undefined {
	try {
		const node = getꓽnodeⵧby_pathⵧensure_file<StoryEntry, StoryFolder>(state.tree, uid)
		return node.payload
	}
	catch (err) {
		// not found
		return undefined
	}
}

// if no explicit story is requested,
// suggest one from the known stories
function getꓽstoryⵧsuggested(state: Immutable<State>): Immutable<StoryEntry> | undefined {
	let candidate: Immutable<StoryEntry> | undefined = undefined

	if (!candidate) {
		candidate = state.first_encountered_story‿uid ? getꓽstoryⵧby_uid(state, state.first_encountered_story‿uid) : undefined
	}

	return candidate
}

/////////////////////////////////////////////////

export {
	getꓽstoryⵧby_uid,
	getꓽstoryⵧsuggested,
}
