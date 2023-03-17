// RNG = Random Number Generator
// PRNG = Pseudorandom Number Generator https://en.wikipedia.org/wiki/Pseudorandom_number_generator


import { Integer, Immutable } from '@offirmo-private/ts-types'

export type Int32 = number
export type UInt53 = number


export interface RNGEngine {
	get_Int32(): { i: Int32, next_engine: RNGEngine }
	is_mutating(): boolean // whether this engine will mutate on generation or stay immutable (and keep generating the same value)
}

export type Seed = ReadonlyArray<number> | number | string

export interface PRNGEngine extends RNGEngine{
	seed(seed: Seed): PRNGEngine
	// seedⵧauto(p: unknown) // TODO work out the params

	set_state(seed: Seed, call_count: Integer): PRNGEngine
	get_state(): {seed: Seed, call_count: Integer}
}
