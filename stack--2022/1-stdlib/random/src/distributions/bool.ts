import { Int32, RNGEngine } from '../types.js'
import { Immutable, Percentage } from '../embedded-deps/types/index.js'
import { assert } from '../embedded-deps/assert/index.js'
import { RandomValueGenerator } from './types.js'
import { _get_generator_of_a_constant } from './_internal.js'
//import { _randomly_generateꓽintegerⵧUInt53 } from './base.js'


function _is_last_bitꘌ1(i: Int32): boolean {
	return (i & 1) === 1
}


export function get_random_generator_ofꓽbool(): RandomValueGenerator<boolean> {
	return function _randomly_generateꓽbool(engine: Immutable<RNGEngine>) {
		return _is_last_bitꘌ1(engine.get_Int32())
	}
}

export function get_random_generator_ofꓽboolⵧweighted(percentage: Percentage): RandomValueGenerator<boolean> {
	assert(percentage >= 0, 'percentage should be >= 0')
	assert(percentage <= 1, 'percentage should be <= 1')

	if (percentage === 0)
		return _get_generator_of_a_constant(false)
	if (percentage === 1)
		return _get_generator_of_a_constant(true)

	throw new Error('Not Implemented!')
/*	const scaled_percentageⵧfast = percentage * 0x100_000_000;
	const is_scaled_percentageⵧfast_good_enough = Number.isInteger(scaled_percentageⵧfast)
	if (is_scaled_percentageⵧfast_good_enough) {
		const ceil = scaled_percentageⵧfast - 0x80_000_000
		return function _randomly_generateꓽboolⵧweightedⵧfast(engine: Immutable<RNGEngine>) {
			const i = engine.get_Int32()
			return i < ceil
		}
	}

	// we need to scale more, at the cost of drawing more randomness
	const ceil = Math.round(percentage * 0x20_000_000_000_000)
	return function _randomly_generateꓽboolⵧweightedⵧslow(engine: Immutable<RNGEngine>) {
		const i = _get_random_UInt53(engine)
		return i < ceil
	}*/
}
