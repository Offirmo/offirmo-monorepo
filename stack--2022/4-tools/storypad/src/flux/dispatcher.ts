/* Flux dispatcher for our app
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { ImportGlob } from '../types/glob'
import { Config } from '../types/config'
import * as InMemState from './state--in-mem'

/////////////////////////////////////////////////

let state: InMemState.State = null as any

async function init(stories_glob: Immutable<ImportGlob>, config?: Immutable<Config>): Promise<void> {
	state = InMemState.create()

	state = InMemState.setꓽconfig(state, config)

	state = await InMemState.registerꓽstoriesⵧfrom_glob(state, stories_glob)

	//state = enrich_state_from_local_storage(state)
	//state = enrich_state_from_query_parameters(state)
	//state = enrich_state_from_env(state)

	console.log('final state =', state)
}

function activateꓽstory(uid: InMemState.StoryUId) {
	state = InMemState.activateꓽstory(state, uid)

	//throw new Error('NIMP propagate on activateꓽstory() !')
	/*try {
		localStorage.setItem(LS_KEYS.current_story_uid, (new URL(href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_uid))
	}
	catch {
	// ignore
	}*/
}


function _getꓽstateⵧin_mem(): Immutable<InMemState.State> {
	assert(state, `init() must be called first!`)
	return state
}

/////////////////////////////////////////////////

export {
	init,

	activateꓽstory,

	// only for selectors
	_getꓽstateⵧin_mem,
}
