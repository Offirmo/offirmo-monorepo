import { Immutable, Integer, PositiveInteger } from '../embedded-deps/types/index.js'
import { RNGEngine, UInt53 } from '../types.js'
import { assert } from '../embedded-deps/assert/index.js'
import { RandomValueGenerator } from './types.js'
import { _get_generator_of_a_constant } from './_internal.js'

export function get_random_generator_ofꓽintegerⵧbetween(min: Integer, max: Integer): RandomValueGenerator<Integer> {
	assert(Number.isInteger(min), `min should be an integer!`)
	assert(Number.isInteger(max), `max should be an integer!`)

	const range = max - min;
	assert(range >= 0, `range should be positive!`)
	assert(Number.isInteger(range), `range should be an integer!`)

	if (range === 0)
		return _get_generator_of_a_constant(min)

	// ok we have a range
	// WARNING properly downscaling into a range is NOT TRIVIAL
	// Cf. https://github.com/ckknight/random-js#how-does-randomjs-alleviate-these-problems

	// how many bits do we need at minimum to store this range?
	const bits_needed = Math.ceil(Math.log2(range + 1)) || 1 // log2(1) = 0 https://en.wikipedia.org/wiki/Binary_logarithm
	// Reminder: max = 53 bits = Number.MAX_SAFE_INTEGER
	assert(bits_needed <= 53, `Range error: range should be <= 53 bits!`)

	const mask = Math.pow(2, bits_needed) - 1

	return function _randomly_generateꓽintegerⵧcustom_range(engine: Immutable<RNGEngine>) {
		let available_bits: UInt53 = 0
		let available_bits_count: PositiveInteger = 0

		function _get_candidate_covering_the_range(): number {
			while (available_bits_count < bits_needed) {
				assert(available_bits_count <= 64, `internal error, should never reach > 64, infinite loop?`) // 64 = 2*32 = max to cover 53bits
				const new_bits = (engine.get_Int32() >>> 0) & 0xFFFF_FFFF // turn the bits into positive representation. No change, just easier to follow in the debugger
				available_bits = (available_bits << 32) + new_bits
				available_bits_count += 32
			}

			const result = available_bits & mask
			available_bits >> bits_needed
			available_bits_count -= bits_needed

			return result
		}

		let candidate = 0
		do {
			candidate = _get_candidate_covering_the_range()
			// if the candidate is above the range,
			// we need to re-draw with new bits.
			// otherwise the distribution would not be even.
			// ex. range 0-6 = 3 bits
			// if candidate = 7 we start over with new bits.
		} while(candidate > range)

		return candidate + min
	}
}

export function get_random_generator_ofꓽintegerⵧin_interval(interval: [Integer, Integer]): RandomValueGenerator<Integer> {
	return get_random_generator_ofꓽintegerⵧbetween(...interval)
}

export function get_random_picker<T>(items: ReadonlyArray<T>): RandomValueGenerator<T> {
	throw new Error('NIMP!')
}
