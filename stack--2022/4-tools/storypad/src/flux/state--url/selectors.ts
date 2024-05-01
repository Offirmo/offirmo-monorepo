/* PROMPT
 */

import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { QUERYPARAMS } from './consts'
import { StoryUId, RenderMode } from '../types'
import { getꓽstoryⵧexplicitely_requested‿uid } from '../selectors'
import { serializeꓽstory_uid } from './serialization'


/////////////////////////////////////////////////

function _getꓽcurrent_urlⵧup_to_pathname(): string {
	const location = document.location
	return location.origin + location.pathname
}

/** return the normalized, state-enriched URL loading this storypad with the given activated story + misc
 */
function getꓽmain_frame_url(uid = getꓽstoryⵧexplicitely_requested‿uid()): Url‿str {
	const sp = new URLSearchParams()
	if (uid) {
		sp.set(QUERYPARAMS.story_path, serializeꓽstory_uid(uid))
	}

	return _getꓽcurrent_urlⵧup_to_pathname() + '?' + sp.toString()
}


function getꓽstory_frame_url(uid?: StoryUId): Url‿str {
	return getꓽmain_frame_url(uid) // no difference for now
/*
	function getꓽmain_iframe_url(state: Immutable<State>, explicit_uid: StoryUId = getꓽstoryⵧcurrent‿uid(state)): string {
	const sp = new URLSearchParams({
		[QUERYPARAMS.story_uid]: explicit_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()*/
}

function getꓽexplicit_render_mode(): RenderMode | undefined {
	// TODO
	return undefined
}

/////////////////////////////////////////////////

export {
	getꓽmain_frame_url,
	getꓽstory_frame_url,
	getꓽexplicit_render_mode,
}
