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

function getꓽstoryⵧcurrent(state: Immutable<State>): StoryId {
	throw new Error('not implemented')
}

function getꓽstoryⵧby_id(state: Immutable<State>, id: StoryId): Immutable<StoryEntry> {
	const result = state.stories_by_id[id]
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
	getꓽstoryⵧcurrent,
	getꓽstoryⵧby_id,
	//getꓽas_query_parameters,
}
