// RNG = Random Number Generator
// PRNG = Pseudorandom Number Generator https://en.wikipedia.org/wiki/Pseudorandom_number_generator


import { Immutable, PositiveInteger } from './embedded-deps/types/index.js'

export type Int8 = number
export type Int32 = number
export type UInt53 = number // 53bits = MAX_SAFE_INTEGER cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
export type Seed = ReadonlyArray<number> | number | string


export interface RNGEngine {
	get_Int32(): Int32

	is_prng(/*this: RNGEngine | PRNGEngine*/): this is PRNGEngine // whether this engine is a pseudo-RNG
}

export interface PRNGState {
	seed: Seed
	call_count: PositiveInteger
}

// for convenience, the setters return 'this' to allow fluid chaining
export interface PRNGEngine extends RNGEngine {
	seed(seed: Seed): RNGEngine // shortcut for set_state()

	set_state(state: Immutable<PRNGState>): PRNGEngine
	get_state(): PRNGState
}

/*
export interface ImmutableRNGEngine {
	get_Int32(): { i: Int32, next_engine: ImmutableRNGEngine }

	is_prng(): this is ImmutablePRNGEngine // whether this engine is a pseudo-RNG
}
export interface ImmutablePRNGEngine extends ImmutableRNGEngine {
	get_Int32(): { i: Int32, next_engine: ImmutablePRNGEngine }

	seed(seed: Seed): ImmutablePRNGEngine
	// seedⵧauto(p: unknown) // TODO work out the params

	set_state(seed: Seed, call_count: Integer): ImmutablePRNGEngine
	get_state(): {seed: Seed, call_count: Integer}
}
*/
