// RNG = Random Number Generator
// PRNG = Pseudorandom Number Generator https://en.wikipedia.org/wiki/Pseudorandom_number_generator


import { Immutable } from '@offirmo-private/ts-types'

export type Int32 = number
export type UInt53 = number

export interface RNGEngine {
	get_Int32(): { i: Int32, next_engine: RNGEngine }

/*
	get_state(): Immutable<RNGState>
	set_state(s: Immutable<RNGState>): RandomGeneratorEngine<RNGState>

	// variant of set_state XXX only for PRNG??
	seed(s: Immutable<RNGState>): RandomGeneratorEngine<RNGState>
	seedⵧauto(p: unknown) // TODO work out the params
*/
}
