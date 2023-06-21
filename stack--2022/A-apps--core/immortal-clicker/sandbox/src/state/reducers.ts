import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽUTC_timestamp‿ms, getꓽUTC_timestampⵧhuman_readable‿minutes } from '@offirmo-private/timestamps'
import { PRNGEngine, getꓽrandom } from '@offirmo/random'
import * as PRNGState from '@oh-my-rpg/state-prng'

import { State } from './types.js'
import { get_randomꓽnuclear_family, NuclearFamily } from '../generator--family--nuclear/index.js'
import { Avatar } from '../state--avatar/types.js'
import { createꓽCultivation } from '../state--cultivation/index.js'

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

			setting: {
				family,
				children_position
			},

			avatar: _get_avatar_from_family(family, children_position),
		},
		t_state: {
			schema_version: SCHEMA_VERSION,
			revision: 0,
			timestamp_ms: tms,
		},
	}

	return update_prng(state, engine)
}
function _get_avatar_from_family(family: Immutable<NuclearFamily>, children_position: number): Avatar {
	const child = family.children[children_position - 1]
	return {
		nameⵧlast: family.lastname,
		nameⵧfirst: child.firstname,
		nameⵧdao: undefined,
		ageⵧbiological: 15,
		sex: child.sex,
		cultivation: createꓽCultivation(),
	} as Avatar
}

function update_prng(state: Immutable<State>, engine: PRNGEngine): Immutable<State> {
	return {
		...state,
		u_state: {
			...state.u_state,
			prng: PRNGState.update_use_count(state.u_state.prng, engine),
		}
	}
}

function join_sectꓽfirst(state: Immutable<State>): Immutable<State> {
	// TODO
	return state
}

/////////////////////////////////////////////////

export {
	create,

	join_sectꓽfirst,
}
