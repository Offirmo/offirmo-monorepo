/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable } from '../deps/@offirmo-private/ts-types/immutable'

import {
	State,
	StoryId,
	StoryEntry,
	isꓽStoryEntry,
} from './types'
import { MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_urlⵧcleaned } from '../services/env'

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
	const sp = new URLSearchParams()

	// current story
	sp.set(MAIN_IFRAME_QUERYPARAMS.story_id, getꓽstoryⵧcurrent(state))

	// tree expand/collapse state
	// (current story parents are obviously expanded)


}

/////////////////////////////////////////////////

export {
	getꓽstoryⵧcurrent,
	getꓽstoryⵧby_id,
	//getꓽas_query_parameters,
}
