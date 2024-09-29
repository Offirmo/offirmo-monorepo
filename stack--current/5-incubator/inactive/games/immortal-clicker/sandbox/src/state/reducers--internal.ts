import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import * as EngagementState from '@oh-my-rpg/state--engagement'

import { type State } from './types.js'

/////////////////////////////////////////////////

function _ack_all_engagements(state: Immutable<State>): Immutable<State> {
	if (!state.u_state.engagement.queue.length)
		return state

	return {
		...state,
		u_state: {
			...state.u_state,
			engagement: EngagementState.acknowledge_all_seen(state.u_state.engagement),
		},
	}
}

/////////////////////////////////////////////////

export {
	_ack_all_engagements,
}
