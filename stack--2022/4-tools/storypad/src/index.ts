import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { UserConfig } from './types.js'

import {
	create,
	setꓽconfig,
	registerꓽstoriesⵧfrom_glob,
	enrich_state_from_local_storage,
	enrich_state_from_query_parameters,
	enrich_state_from_env,
} from './state/reducers'
import { render } from './render'

////////////////////////////////////////////////////////////////////////////////////

export function startꓽstorypad(stories_glob: Immutable<any>, config?: Immutable<UserConfig>) {
	console.group(`Starting storypad…`)
	console.log('config =', config)
	console.log('glob =', stories_glob)

	let state = create()
	state = setꓽconfig(state, config)

	state = registerꓽstoriesⵧfrom_glob(state, stories_glob)

	state = enrich_state_from_local_storage(state)
	state = enrich_state_from_query_parameters(state)
	state = enrich_state_from_env(state)

	console.groupEnd()

	setTimeout(() => {
		render(state)
	}, 1)
}
export default startꓽstorypad

////////////////////////////////////////////////////////////////////////////////////
