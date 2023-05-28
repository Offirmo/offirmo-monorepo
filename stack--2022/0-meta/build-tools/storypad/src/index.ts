import assert from 'tiny-invariant'
import { Immutable } from './deps/immutable'

import { UserConfig } from './types.js'
import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from './consts'

import {
	create,
	set_config,
	register_stories_from_glob,
	enrich_state_from_local_storage,
	enrich_state_from_query_parameters,
	enrich_state_from_env,
} from './state/reducers'
import { render } from './render'

////////////////////////////////////////////////////////////////////////////////////

export function start_storypad(stories_glob: Immutable<any>, config?: Immutable<UserConfig>) {
	console.group(`Starting storypad…`)
	console.log('config =', config)
	console.log('glob =', stories_glob)

	let state = create()
	state = set_config(state, config)

	state = register_stories_from_glob(state, stories_glob)

	state = enrich_state_from_local_storage(state)
	state = enrich_state_from_query_parameters(state)
	state = enrich_state_from_env(state)

	console.groupEnd()

	setTimeout(() => {
		render(state)
	}, 1)
}
export default start_storypad

////////////////////////////////////////////////////////////////////////////////////
