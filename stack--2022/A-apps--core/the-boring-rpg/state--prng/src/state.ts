/////////////////////

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import { get_engine, PRNGEngine } from '@offirmo/random'
import { generate_uuid } from '@offirmo-private/uuid'

import { get_logger } from '@tbrpg/definitions'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { State } from './types.js'

/////////////////////

const DEFAULT_SEED = 987

// TODO review seeding!
function create(seed: number = DEFAULT_SEED): Immutable<State> {
	return {
		schema_version: SCHEMA_VERSION,
		uuid: generate_uuid(),
		revision: 0,

		prng_state: {
			...get_engine.good_enough().get_state(),
			seed, // up to the caller to change it
		},

		recently_encountered_by_id: {},
	}
}

/////////////////////

function set_seed(state: Immutable<State>, seed: number): Immutable<State> {
	return {
		...state,

		prng_state: {
			...state.prng_state,
			seed,
			call_count: 0, // back to 0
		},

		revision: state.revision + 1,
	}
}

// This is the method called by the parent state to serialize back the PRNG
// It should only be called when it KNOWS that the PRNG was used to draw random
// TODO review options
function update_use_count(state: Immutable<State>, prng: PRNGEngine, options: any = {}): Immutable<State> {
	const engine_state = prng.get_state()

	assert(
		engine_state.seed === state.prng_state.seed,
		`${LIB}: update PRNG state: different seed (different prng?)!`,
	)

	const new_call_count = engine_state.call_count

	if (new_call_count === state.prng_state.call_count) {
		if (!options.I_swear_I_really_cant_know_whether_the_rng_was_used) {
			const err = new Error(`[Warning] ${LIB}: update PRNG state: count hasn't changed = no random was generated! This is most likely a bug, check your code!`).stack
			get_logger().warn('update_use_count no change!', { err })
		}
		return state
	}

	assert(
		new_call_count > state.prng_state.call_count,
		`${LIB}: update PRNG state: count is <= previous count, this is unexpected! Check your code!`,
	)

	return {
		...state,

		prng_state: {
			...state.prng_state,
			call_count: new_call_count,
		},

		revision: state.revision + 1,
	}
}

function register_recently_used(state: Immutable<State>, id: string, value: number | string, max_memory_size: number): Immutable<State> {
	if (max_memory_size === 0)
		return state

	let recently_encountered = state.recently_encountered_by_id[id] || []
	recently_encountered = recently_encountered.concat(value).slice(-max_memory_size)

	return {
		...state,

		recently_encountered_by_id: {
			...state.recently_encountered_by_id,

			[id]: recently_encountered,
		},

		revision: state.revision + 1,
	}
}

/////////////////////

export {
	type State,
	DEFAULT_SEED,
	create,

	set_seed,
	update_use_count,
	register_recently_used,
}

/////////////////////
