/* Flux dispatcher for our app
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { ImportGlob } from '../types/glob'
import { Config } from '../types/config'
import { StoryUId} from './types'
import * as InMemState from './state--in-mem'
import * as UrlState from './state--url'

/////////////////////////////////////////////////

let stateⵧin_mem: InMemState.State = InMemState.create()

async function init(stories_glob: Immutable<ImportGlob>, config?: Immutable<Config>): Promise<void> {
	console.group('Flux init...')
	stateⵧin_mem = InMemState.setꓽconfig(stateⵧin_mem, config)
	stateⵧin_mem = await InMemState.registerꓽstoriesⵧfrom_glob(stateⵧin_mem, stories_glob)

	UrlState.init()

	// other states don't need an init

	console.log('final stateⵧin_mem =', stateⵧin_mem)
	console.groupEnd()
}

// explicit request on user's click
function requestꓽstory(uid: StoryUId) {
	stateⵧin_mem = InMemState.requestꓽstory(stateⵧin_mem, uid)
	UrlState.requestꓽstory(uid)
}

// DO NOT USE, only for the flux selectors
function _getꓽstateⵧin_mem(): Immutable<InMemState.State> {
	assert(stateⵧin_mem, `init() must be called first!`)
	return stateⵧin_mem
}

/////////////////////////////////////////////////

export {
	init,

	requestꓽstory,

	// only for selectors
	_getꓽstateⵧin_mem,
}
