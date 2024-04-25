/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import {
	State,
	StoryId,
	StoryEntry,
	isꓽStoryEntry,
} from './types'
import { MAIN_IFRAME_QUERYPARAMS } from '../consts'

/////////////////////////////////////////////////

function getꓽstoryⵧcurrent‿uid(state: Immutable<State>): StoryId | '[NO-KNOWN-STORIES]' {
	return state.current_story‿uid ?? '[NO-KNOWN-STORIES]'
}

function getꓽstoryⵧby_id(state: Immutable<State>, id: StoryId): Immutable<StoryEntry> {
	const result = state.stories_by_uid[id]
	assert(isꓽStoryEntry(result))
	return result
}

function getꓽas_query_parameters(state: Immutable<State>): URLSearchParams {
	throw new Error('not implemented')
	/*const sp = new URLSearchParams()

	// current story
	sp.set(MAIN_IFRAME_QUERYPARAMS.story_id, getꓽstoryⵧcurrent(state))

	// tree expand/collapse state
	// (current story parents are obviously expanded)

*/
}

/////////////////////////////////////////////////

export {
	getꓽstoryⵧcurrent‿uid,
	getꓽstoryⵧby_id,
	//getꓽas_query_parameters,
}
