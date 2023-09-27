//////////////////////////////////////////////////////////////////////

import { Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import {
	EngagementType,
	State,
} from './types.js'

//////////////////////////////////////////////////////////////////////

// a full-featured, non-trivial demo state
// useful for demos and unit tests
const DEMO_STATE: Immutable<State> = enforceꓽimmutable<State>({
	schema_version: 1,
	revision: 42,

	queue: [
		{
			uid: 42,
			engagement: {
				key: 'hello_world--flow',
				type: EngagementType.flow,
			},
			params: {},
		},
	],
})

/////////////////////

export {
	DEMO_STATE,
}
