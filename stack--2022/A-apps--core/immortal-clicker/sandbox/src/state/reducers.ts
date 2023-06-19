import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { get_UTC_timestamp_ms, get_human_readable_UTC_timestamp_minutes } from '@offirmo-private/timestamps'
import { PRNGEngine, get_random } from '@offirmo/random'
import * as PRNGState from '@oh-my-rpg/state-prng'

import { State } from './types.js'
import { get_randomꓽnuclear_family, NuclearFamily } from '../generator--family--nuclear/index.js'
import { Avatar } from '../state--avatar/types.js'
import { createꓽCultivation } from '../state--cultivation/index.js'

const SCHEMA_VERSION = 0

/////////////////////////////////////////////////

function create(): Immutable<State> {
	const now = new Date()
	const tms = get_UTC_timestamp_ms(now)

	let prng_state = PRNGState.create()
	const engine = PRNGState.get_prng(prng_state)

	const family = get_randomꓽnuclear_family(engine)
	const children_position = get_random.generator_of.integer.between(1, family.children.length)(engine)

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

			avatar: {} as any, // TODO
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

/////////////////////////////////////////////////

export {
	create,
}
