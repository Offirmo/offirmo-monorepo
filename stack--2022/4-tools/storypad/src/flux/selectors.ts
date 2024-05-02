/* Flux selectors for our app
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Config } from '../types/config'
import { _getꓽstateⵧin_mem } from './dispatcher'

import { State, FolderUId, StoryEntry, StoryUId, RenderMode } from './types'

import * as InMemStateSelectors from './state--in-mem/selectors'
import * as EnvStateSelectors from './state--env/selectors'
import * as UrlStateSelectors from './state--url/selectors'
import { RenderParams } from '../types/csf/common'

/////////////////////////////////////////////////

// for rendering the stories tree
function getꓽtree_root(): Immutable<State['tree']> {
	return _getꓽstateⵧin_mem().tree
}

// for rendering a story
function getꓽconfig(): Immutable<Config> {
	return _getꓽstateⵧin_mem().config
}

// initial tree render
function isꓽexpandedⵧinitially(uid: FolderUId): boolean {
	return true // TODO more complex depending on available viewport
	/*const state = getꓽstate()
	const folder = state.folders_by_uid[uid]
	*/
}


function getꓽrender_mode(): RenderMode {
	const explicit_render_mode = UrlStateSelectors.getꓽexplicit_render_mode()
	if (explicit_render_mode)
		return explicit_render_mode

	const is_iframe = EnvStateSelectors.isꓽiframe()
	if (is_iframe) {
		// we're in an iframe -> we're the story
		return 'story'
	}

	return 'full'
}

// for rendering the story
// must only return "undef" if NO stories. Else should pick the 1st one.
function getꓽstoryⵧcurrent(): Immutable<StoryEntry> | undefined {
	const state = _getꓽstateⵧin_mem()

	const candidate_uid = UrlStateSelectors.getꓽexplicit_story_uid()
	if (candidate_uid) {
		const candidate = InMemStateSelectors.getꓽstoryⵧby_uid(state, candidate_uid)
		if (candidate)
			return candidate
	}

	return InMemStateSelectors.getꓽstoryⵧcurrent(state)
}


function getꓽstoryⵧexplicitely_requested‿uid(): StoryUId | undefined {
	const state = _getꓽstateⵧin_mem()
	return state.last_explicitly_activated_story‿uid
}

const getꓽmain_frame_url = UrlStateSelectors.getꓽmain_frame_url
const getꓽstory_frame_url = UrlStateSelectors.getꓽstory_frame_url

function getꓽRenderParamsⵧglobal<StoryType>(): RenderParams<StoryType> {
	return {
		// TODO args from config
		// TODO args from QParams
	}
}

/////////////////////////////////////////////////

export {
	getꓽtree_root,
	getꓽconfig,

	isꓽexpandedⵧinitially,

	getꓽrender_mode,
	getꓽstoryⵧcurrent,
	getꓽstoryⵧexplicitely_requested‿uid,
	getꓽRenderParamsⵧglobal,

	getꓽmain_frame_url,
	getꓽstory_frame_url,
}
