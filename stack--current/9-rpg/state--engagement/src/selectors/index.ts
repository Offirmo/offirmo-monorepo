import { type Immutable } from '@offirmo-private/ts-types'

import {
	type State,
	type PendingEngagement,
} from '../types.js'

//////////////////////////////////////////////////////////////////////

function getꓽpending_engagements<TextFormat>(state: Immutable<State<TextFormat>>): Immutable<Array<PendingEngagement<TextFormat>>> {
	return state.queue
}

/*
function getꓽoldest_queuedⵧflow(state: Immutable<State>): Immutable<PendingEngagement> | undefined {
	return state.queue
		.find(queued => queued.engagement.type === EngagementType.flow)
}

function getꓽoldest_queuedⵧnon_flow(state: Immutable<State>): Immutable<PendingEngagement> | undefined {
	return state.queue
		.find(queued => queued.engagement.type !== EngagementType.flow)
}*/

//////////////////////////////////////////////////////////////////////

export {
	getꓽpending_engagements,

	/*getꓽoldest_queuedⵧflow,
	getꓽoldest_queuedⵧnon_flow,*/
}

//////////////////////////////////////////////////////////////////////
