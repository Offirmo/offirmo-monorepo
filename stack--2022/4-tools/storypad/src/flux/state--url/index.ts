/* PROMPT
 */

import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { MAIN_IFRAME_QUERYPARAMS } from './consts'
import { StoryUId } from '../state--in-mem'
import { getꓽstate,  } from '../dispatcher.ts'

//import {  } from './types.js'

/////////////////////////////////////////////////

function getꓽcurrent_urlⵧup_to_pathname(): string {
	const location = document.location
	return location.origin + location.pathname
}

/** return the normalized, state-enriched URL loading this storypad with the given activated story + misc
 */
function getꓽmain_frame_url(uid?: StoryUId): Url‿str {
	const state = getꓽstate()
	return getꓽcurrent_urlⵧup_to_pathname() // TODO improve
/*
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: explicit_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}
function getꓽmain_iframe_url(state: Immutable<State>, story_uid: StoryUId): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: story_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}
	 */
}


function getꓽstory_frame_url(uid?: StoryUId): Url‿str {
	const state = getꓽstate()
	return getꓽmain_frame_url(uid) // no difference for now
/*
	function getꓽmain_iframe_url(state: Immutable<State>, explicit_uid: StoryUId = getꓽstoryⵧcurrent‿uid(state)): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: explicit_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
 */
}

/////////////////////////////////////////////////

export {
	getꓽmain_frame_url,
	getꓽstory_frame_url,
}
