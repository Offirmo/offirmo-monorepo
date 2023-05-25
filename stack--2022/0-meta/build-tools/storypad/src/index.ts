import assert from 'tiny-invariant'
import { Immutable } from './deps/immutable'

import { Config } from './types.js'
import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from './consts'

import {
	init,
	set_config,
	register_stories_from_glob,
	set_current_story,
} from './state/reducers'
import { render } from './render'

////////////////////////////////////////////////////////////////////////////////////

export function start_storypad(stories_glob: Immutable<any>, config?: Immutable<Config>) {
	console.group(`Starting storypad…`)
	console.log('config =', config)
	console.log('glob =', stories_glob)

	let state = init()
	if (config)
		state = set_config(state, config)
	state = register_stories_from_glob(state, stories_glob)

	try {
		const id = localStorage.getItem(LS_KEYS.current_story_id)
		if (id)
			state = set_current_story(state, id)
	}
	catch { /* ignore */}

	console.groupEnd()

	setTimeout(() => {
		render(state)
	}, 1)
}
export default start_storypad

////////////////////////////////////////////////////////////////////////////////////
