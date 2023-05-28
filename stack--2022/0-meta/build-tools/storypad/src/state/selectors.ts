import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import {
	State,
	StoryId,
	StoryEntry,
	is_story_entry,
} from './types'
import { MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { get_current_url__cleaned } from '../services/env'


export function get_story_by_id(state: Immutable<State>, id: StoryId): Immutable<StoryEntry> {
	const result = state.stories_by_id[id]
	assert(is_story_entry(result))
	return result
}

export function get_as_query_parameters(state: Immutable<State>): URLSearchParams {
	const sp = new URLSearchParams()

	// current story
	sp.set(MAIN_IFRAME_QUERYPARAMS.story_id, state.current_story‿id)

	// tree expand/collapse state
	// (current story parents are obviously expanded)


}
