import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import { TimestampUTCMs, getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'
import { PRNGEngine, getꓽrandom } from '@offirmo/random'

import * as PRNGState from '@oh-my-rpg/state-prng'
import * as EngagementState from '@oh-my-rpg/state-engagement'

import { type State } from './types.js'
import { get_randomꓽnuclear_family, NuclearFamily } from '../generator--family--nuclear/index.js'
import { Avatar } from '../state--avatar/types.js'
import * as CultivationState from '../state--cultivation/index.js'
import { get_randomꓽsect } from '../generator--sect/src/index.js'

const SCHEMA_VERSION = 0

/////////////////////////////////////////////////

function create(seed: 'unit-test' | 'auto' = 'unit-test'): Immutable<State> {
	const now = new Date()
	const tms = getꓽUTC_timestamp‿ms(now)

	let prng_state = PRNGState.create()
	if (seed === 'auto')
		prng_state = PRNGState.auto_reseed(prng_state)
	const engine = PRNGState.getꓽprng(prng_state)

	const family = get_randomꓽnuclear_family(engine)
	const children_position = getꓽrandom.generator_of.integer.between(1, family.children.length)(engine)

	let state: Immutable<State> = {
		ⵙapp_id: 'xianxia1',
		schema_version: SCHEMA_VERSION,
		last_user_investment_tms: tms,

		u_state: {
			schema_version: SCHEMA_VERSION,
			revision: 0,

			prng: prng_state,
			engagement: EngagementState.create(),

			setting: {
				family,
				children_position,
				sects: {
					nearby: get_randomꓽsect(engine)
				},
			},

			avatar: _getꓽavatar_from_family(family, children_position),

			cultivation: CultivationState.createꓽstate(),
		},
		t_state: {
			schema_version: SCHEMA_VERSION,
			revision: 0,
			timestamp_ms: tms,
		},
	}

	return _updateꓽprng(state, engine)
}
function _getꓽavatar_from_family(family: Immutable<NuclearFamily>, children_position: number): Avatar {
	const child = family.children[children_position - 1]
	return {
		nameⵧlast: family.lastname,
		nameⵧfirst: child.firstname,
		nameⵧdao: undefined,
		ageⵧbiological: 15,
		sex: child.sex,
	} satisfies Avatar
}

function _updateꓽprng(state: Immutable<State>, engine: PRNGEngine): Immutable<State> {
	return {
		...state,
		u_state: {
			...state.u_state,
			prng: PRNGState.update_use_count(state.u_state.prng, engine),
		}
	}
}

function acknowledge_engagement_msg_seen(previous_state: Immutable<State>, uid: number, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms()): Immutable<State> {
	let state = previous_state
	state = {
		...state,
		last_user_investment_tms: now_ms,

		u_state: {
			...state.u_state,
			engagement: EngagementState.acknowledge_seen(state.u_state.engagement, uid),
			revision: previous_state.u_state.revision + 1,
		},
	}

	return state
}

function join_sectꓽfirst(state: Immutable<State>): Immutable<State> {
	const sect = state.u_state.setting.sects['nearby']
	return {
		...state,
		u_state: {
			...state.u_state,
			cultivation: CultivationState.join_sect(state.u_state.cultivation, sect),
			revision: state.u_state.revision + 1,
		}
	}
}

function cultivate(state: Immutable<State>): Immutable<State> {
	// TODO need a method
	// TODO need no bottleneck
	return {
		...state,
		u_state: {
			...state.u_state,
			cultivation: CultivationState.cultivate(state.u_state.cultivation),
			revision: state.u_state.revision + 1,
		}
	}
}

function attempt_breakthrough(state: Immutable<State>): Immutable<State> {
	// TODO
	return {
		...state,
		u_state: {
			...state.u_state,
			cultivation: CultivationState.attempt_breakthrough(state.u_state.cultivation),
			revision: state.u_state.revision + 1,
		}
	}
}

function loot(state: Immutable<State>): Immutable<State> {
	// TODO
	return state
}

function kill_some_enemies(state: Immutable<State>): Immutable<State> {
	// TODO
	return state
}

function win_some_tournament(state: Immutable<State>): Immutable<State> {
	// TODO
	return state
}

/////////////////////////////////////////////////

export {
	create,

	join_sectꓽfirst,

	cultivate,
	attempt_breakthrough,
}
