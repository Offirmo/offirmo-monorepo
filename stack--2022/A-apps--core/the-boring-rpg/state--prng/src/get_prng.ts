/////////////////////

import assert from 'tiny-invariant'
import { Immutable, enforce_immutability } from '@offirmo-private/state-utils'
import { get_engine, PRNGEngine } from '@offirmo/random'

import { get_logger } from '@tbrpg/definitions'

import { LIB } from './consts.js'
import { State } from './types.js'

/////////////////////


// since
// 1. we want our app to use a single, repeatable PRNG
// -> it must be stored in the app state
// 1. PRNGs have their own complex state
// -> we store a generic (but inefficient) simplified state
// 1. it's not convenient to update the serialized state everywhere we draw some random values
// -> it will be serialized back in the app state from the root
// 1. PRNGs may need a lot of cycles to de-serialize from a saved state
// -> we don't want to re-create the PRNG at every reducer
// -> we'll store the currently used PRNG in a cache
// Since this put expectations on the usage,
// we'll perform assertions in the code

let cached_prngs: {
	[app_key: string]: PRNGEngine
} = {}

// useful for unit tests
function xxx_internal_reset_prng_cache() {
	cached_prngs = {}
}

// get_prng() is an ideal checkpoint to detect a lot of bugs and misuses.
// WARNING this method has expectations ! (see above)
function get_prng(state: Immutable<State>): PRNGEngine {
	/*console.trace('get PRNG', {
     state,
     cached_prng,
     'cached_prng.getUseCount()': cached_prng.getUseCount(),
 })*/
	const app_key = state.uuid

	const cached_prng = cached_prngs[app_key]

	if (!cached_prng) {
		cached_prngs[app_key] = get_engine.from_state(state.prng_state)
		return cached_prngs[app_key]!
	}

	if (cached_prng.get_state().seed !== state.prng_state.seed) {
		// ok, a reseed happened, allowed
		cached_prng.seed(state.prng_state.seed)
		assert(cached_prng.get_state().call_count === 0, 'freshly re-seeded prng should have call_count reset!')
	}

	if (cached_prng.get_state().call_count !== state.prng_state.call_count) {
		// should never happen, this is the bug we are after
		const msg = `${LIB}: get_prng(): unexpected case: mismatching use_count!`
		get_logger().error(msg, {
			cached_use_count: cached_prng.get_state().call_count,
			required_use_count: state.prng_state.call_count,
		})
		throw new Error(msg)
	}

	return cached_prng
}

/////////////////////

export {
	get_prng,

	// exposed for testability, do not use !
	xxx_internal_reset_prng_cache,
}

/////////////////////
