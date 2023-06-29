//////////////////////////////////////////////////////////////////////

import { Immutable } from '@offirmo-private/ts-types'
import { State, EngagementType, PendingEngagement } from './types.js'

//////////////////////////////////////////////////////////////////////

function getꓽoldest_queuedⵧflow(state: Immutable<State>): Immutable<PendingEngagement> | undefined {
	return state.queue
		.find(queued => queued.engagement.type === EngagementType.flow)
}

function getꓽoldest_queuedⵧnon_flow(state: Immutable<State>): Immutable<PendingEngagement> | undefined {
	return state.queue
		.find(queued => queued.engagement.type !== EngagementType.flow)
}

//////////////////////////////////////////////////////////////////////

export {
	getꓽoldest_queuedⵧflow,
	getꓽoldest_queuedⵧnon_flow,
}

//////////////////////////////////////////////////////////////////////
