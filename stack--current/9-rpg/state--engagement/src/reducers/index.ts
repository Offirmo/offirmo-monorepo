import assert from 'tiny-invariant'
import { type Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import { SCHEMA_VERSION } from '../consts.js'

import {
	type EngagementTemplate,
	type PendingEngagement,
	type PendingEngagementUId,
	type State,
} from '../types.js'

import { type SoftExecutionContext, getꓽSXC } from '../utils/sec.js'

//////////////////////////////////////////////////////////////////////

function create<TextFormat>(SXC?: SoftExecutionContext): Immutable<State<TextFormat>> {
	return getꓽSXC(SXC).xTry('create', () => {
		return enforceꓽimmutable<State<TextFormat>>({
			schema_version: SCHEMA_VERSION,
			revision: 0,

			queue: [],
		})
	})
}

/////////////////////

function enqueue<TextFormat>(state: Immutable<State<TextFormat>>, template: Immutable<EngagementTemplate<TextFormat>>, params: Immutable<PendingEngagement<TextFormat>['params']> = {}): Immutable<State<TextFormat>> {

	// Avoid duplication? Possible bug? No, hard to detect, may have different params.
	// ex. multiple level rises should be ok.
	// ex. multiple new achievements

	const pending: Immutable<PendingEngagement<TextFormat>> = {
		uid: state.revision + 1,
		template,
		params,
	}

	return {
		...state,

		queue: [
			...state.queue,
			pending,
		],

		revision: state.revision + 1,
	}
}

function acknowledge_seen<TextFormat>(state: Immutable<State<TextFormat>>, uids: Immutable<Array<PendingEngagementUId>>): Immutable<State<TextFormat>> {
	const uid_left_to_dequeue = new Set<PendingEngagementUId>(uids) // to dedupe + detect unknowns
	state.queue.forEach(queued => {
		uid_left_to_dequeue.delete(queued.uid)
	})
	assert(uid_left_to_dequeue.size === 0, 'Engagement: all acks should refer to existing pending engagements!')

	return {
		...state,

		queue: state.queue.filter(queued => !uids.includes(queued.uid)),

		revision: state.revision + 1,
	}
}

function acknowledge_seenⵧall<TextFormat>(state: Immutable<State<TextFormat>>): Immutable<State<TextFormat>> {
	if (!state.queue.length) return state

	return {
		...state,

		queue: [],

		revision: state.revision + 1,
	}
}

//////////////////////////////////////////////////////////////////////

export {
	create,
	enqueue,
	acknowledge_seen,
	acknowledge_seenⵧall,
}

//////////////////////////////////////////////////////////////////////
