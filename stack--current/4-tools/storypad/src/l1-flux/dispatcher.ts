/* Flux dispatcher for our app
 */

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { ImportGlob } from '../l0-types/l0-glob'
import { Config } from '../l0-types/l2-config'
import { StoryUId} from './types'
import * as InMemState from './state--in-mem'
import * as UrlState from './state--url'
import { _getꓽstateⵧin_mem, _setꓽstateⵧin_mem } from './in-mem-state-ref.ts'
import {
	getꓽrender_mode,
	getꓽstoryⵧcurrent,
	getꓽRenderParamsⵧglobal,
} from './selectors.ts'


/////////////////////////////////////////////////


async function init(stories_glob: Immutable<ImportGlob>, config?: Immutable<Config>): Promise<void> {
	console.group('Flux init...')

	let stateⵧin_mem = _getꓽstateⵧin_mem()
	stateⵧin_mem = InMemState.setꓽconfig(stateⵧin_mem, config)
	stateⵧin_mem = await InMemState.registerꓽstoriesⵧfrom_glob(stateⵧin_mem, stories_glob)
	_setꓽstateⵧin_mem(stateⵧin_mem)

	// other states don't need an init

	const current_story = getꓽstoryⵧcurrent()
	if (!current_story) {
		console.warn('No stories found!')
	}

	const url_story = UrlState.getꓽexplicit_story_uid()
	if (url_story && current_story?.uid !== url_story) {
		console.warn('URL and in-mem story mismatch!', { current_story, url_story })
	}

	console.log('Flux final state =', {
		'sub-states': {
			'in-mem': stateⵧin_mem,
			'location': {
				'URL': window.location.href,
				'getꓽmain_frame_url': UrlState.getꓽmain_frame_url(),
				'getꓽstory_frame_url': UrlState.getꓽstory_frame_url(),
				'getꓽexplicit_render_mode': UrlState.getꓽexplicit_render_mode(),
				'getꓽexplicit_story_uid': UrlState.getꓽexplicit_story_uid(),
				'_sp': Object.fromEntries([...UrlState._getꓽcurrent_url__search_params()]),
			},
		},
		flux: {
			'getꓽrender_mode': getꓽrender_mode(),
			'getꓽstoryⵧcurrent': getꓽstoryⵧcurrent(),
			'getꓽRenderParamsⵧglobal': getꓽRenderParamsⵧglobal(),
		}
	})

	console.groupEnd()
}

// explicit request on user's click
function requestꓽstory(uid: StoryUId) {
	let stateⵧin_mem = _getꓽstateⵧin_mem()
	stateⵧin_mem = InMemState.requestꓽstory(stateⵧin_mem, uid)
	_setꓽstateⵧin_mem(stateⵧin_mem)

	UrlState.requestꓽstory(uid)
}

/////////////////////////////////////////////////

export {
	init,

	requestꓽstory,
}
