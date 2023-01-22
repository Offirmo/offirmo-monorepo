import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import {
	State,
	StoryId,
	StoryAndNotes,
	is_story_and_notes,
} from './types.js'


export function get_story_by_id(state: Immutable<State>, id: StoryId): Immutable<StoryAndNotes> {
	const result = state.stories_by_id[id]
	assert(is_story_and_notes(result))
	return result
}
