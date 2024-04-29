/* Flux dispatcher for our app
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { ImportGlob } from '../types/glob'
import { Config } from '../types/config'
import { State, create, setꓽconfig, registerꓽstoriesⵧfrom_glob } from './state--in-mem'

/////////////////////////////////////////////////

let state: State = null as any

async function init(stories_glob: Immutable<ImportGlob>, config?: Immutable<Config>): Promise<State> {
	state = create()

	state = setꓽconfig(state, config)

	state = await registerꓽstoriesⵧfrom_glob(state, stories_glob)

	//state = enrich_state_from_local_storage(state)
	//state = enrich_state_from_query_parameters(state)
	//state = enrich_state_from_env(state)

	console.log('final state =', state)

	return state
}

function activateꓽstory() {
	throw new Error('NIMP activateꓽstory() !')
	/*try {
		localStorage.setItem(LS_KEYS.current_story_uid, (new URL(href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_uid))
	}
	catch {
	// ignore
	}*/
}

function getꓽstate(): Immutable<State> {
	assert(state, `init() must be called first!`)
	return state
}

/////////////////////////////////////////////////

export {
	init,
	getꓽstate,

	activateꓽstory,
}
