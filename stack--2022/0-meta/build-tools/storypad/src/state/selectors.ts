import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import {
	State,
	StoryId,
	StoryEntry,
	isꓽStoryEntry,
} from './types'
import { MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_url__cleaned } from '../services/env'


export function getꓽstory_by_id(state: Immutable<State>, id: StoryId): Immutable<StoryEntry> {
	const result = state.stories_by_id[id]
	assert(isꓽStoryEntry(result))
	return result
}

export function getꓽas_query_parameters(state: Immutable<State>): URLSearchParams {
	const sp = new URLSearchParams()

	// current story
	sp.set(MAIN_IFRAME_QUERYPARAMS.story_id, state.current_story‿id)

	// tree expand/collapse state
	// (current story parents are obviously expanded)


}
