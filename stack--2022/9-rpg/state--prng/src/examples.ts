import { Immutable, enforce_immutability } from '@offirmo-private/state-utils'

import { State } from './types.js'

/////////////////////////////////////////////////

// a full-featured, non-trivial demo state
// useful for demos and unit tests
const DEMO_STATE: Immutable<State> = enforce_immutability<State>({
	uuid: 'uu1~example~state~PRNG~~',
	schema_version: 4,
	revision: 108,

	prng_state: {
		algorithm_id: 'MT19937',
		call_count: 107,
		seed: -54321,
	},

	recently_encountered_by_id: {
		'item': [ 'axe', 'sword'],
		'adventures': [ 'dragon', 'king'],
		'mystery': [],
	},
})

/////////////////////////////////////////////////

export {
	DEMO_STATE,
}
