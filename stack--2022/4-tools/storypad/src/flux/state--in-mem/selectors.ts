/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽnodeⵧby_pathⵧensure_file } from '@offirmo-private/data-structures'

import {
	State,
	StoryUId,
	StoryEntry,
	StoryFolder,
} from './types'

/////////////////////////////////////////////////

function getꓽstoryⵧby_uid(state: Immutable<State>, uid: StoryUId): Immutable<StoryEntry> | undefined {
	const node = getꓽnodeⵧby_pathⵧensure_file<StoryEntry, StoryFolder>(state.tree, uid)
	return node.payload
}

//function getꓽstoryⵧcurrent‿uid(state: Immutable<State>): StoryUId | '[NO-KNOWN-STORIES]' {
function getꓽstoryⵧcurrent(state: Immutable<State>): Immutable<StoryEntry> | undefined {
	let candidate: Immutable<StoryEntry> | undefined = undefined

	candidate = state.last_explicitly_activated_story‿uid ? getꓽstoryⵧby_uid(state, state.last_explicitly_activated_story‿uid) : undefined

	if (!candidate) {
		candidate = state.first_encountered_story‿uid ? getꓽstoryⵧby_uid(state, state.first_encountered_story‿uid) : undefined
	}

	return candidate
}

/////////////////////////////////////////////////

export {
	getꓽstoryⵧby_uid,
	getꓽstoryⵧcurrent,
}
