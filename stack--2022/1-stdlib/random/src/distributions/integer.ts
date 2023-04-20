import { Immutable, Integer, Percentage } from '../embedded-deps/types/index.js'
import { RNGEngine, Int32, UInt53 } from '../types.js'
import { assert } from '../embedded-deps/assert/index.js'
import { RandomValueGenerator } from './types.js'
import { _get_generator_of_a_constant } from './_internal.js'


// TODO validate params!



function _get_generator_adding_to_underlying_generator(generate: RandomValueGenerator<number>, addend: number): RandomValueGenerator<number> {
	if (addend === 0)
		return generate

	return function _add_constant_after_generating(engine) {
		return generate(engine) + addend
	}
}






export function get_random_generator_ofꓽintegerⵧbetween(min: Integer, max: Integer): RandomValueGenerator<Integer> {
	// WARNING properly downscaling into a range is NOT TRIVIAL
	// Cf. https://github.com/ckknight/random-js#how-does-randomjs-alleviate-these-problems
	assert(Number.isInteger(min), `min should be an integer`)
	assert(Number.isInteger(max), `max should be an integer`)
	assert(min >= -0x20000000000000, `Expected min to be at least ${-0x20000000000000}!`)
	assert(max <= 0x20000000000000, `Expected max to be at most ${0x20000000000000}!`)

	const range = max - min;
	assert(range >= 0 && Number.isInteger(range), `range should be a positive integer`)

	if (range === 0)
		return _get_generator_of_a_constant(min)


	const log2 = Math.log2(range)
	if (Number.isInteger(log2)) {
		// power of 2 is easy to derive from Int32
		if (log2 > 16) {
			// note: should be very easy to upscale
			throw new Error('Big ranges are not implemented, sorry!')
		}
		const bits = 1 << log2
		const mask = bits - 1
		return function _randomly_generateꓽintegerⵧcustom_rangeⵧpower_of_2(engine: Immutable<RNGEngine>) {
			return (engine.get_Int32() & mask) + min
		}
	}

	throw new Error('NIMP!')


	/*
	function isPowerOfTwoMinusOne(value: Integer) {
		return ((value + 1) & value) === 0;
	}

	function bitmask(masking: Integer) {
		return function (engine) {
			return engine() & masking;
		};
	}

	function downscaleToLoopCheckedRange(range: Integer) {
		var extendedRange = range + 1;
		var maximum = extendedRange * Math.floor(0x100000000 / extendedRange);
		return function (engine) {
			var value = 0;
			do {
				value = engine() >>> 0;
			} while (value >= maximum);
			return value % extendedRange;
		};
	}

	function downscaleToRange(range: Integer) {
		if (isPowerOfTwoMinusOne(range)) {
			return bitmask(range);
		} else {
			return downscaleToLoopCheckedRange(range);
		}
	}

	function isEvenlyDivisibleByMaxInt32(value: Integer) {
		return (value | 0) === 0;
	}

	function upscaleWithHighMasking(masking: Integer) {
		return function (engine) {
			var high = engine() & masking;
			var low = engine() >>> 0;
			return (high * 0x100000000) + low;
		};
	}

	function upscaleToLoopCheckedRange(extendedRange: Integer) {
		var maximum = extendedRange * Math.floor(0x20000000000000 / extendedRange);
		return function (engine) {
			var ret = 0;
			do {
				var high = engine() & 0x1fffff;
				var low = engine() >>> 0;
				ret = (high * 0x100000000) + low;
			} while (ret >= maximum);
			return ret % extendedRange;
		};
	}

	function upscaleWithinU53(range: Integer) {
		var extendedRange = range + 1;
		if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
			var highRange = ((extendedRange / 0x100000000) | 0) - 1;
			if (isPowerOfTwoMinusOne(highRange)) {
				return upscaleWithHighMasking(highRange);
			}
		}
		return upscaleToLoopCheckedRange(extendedRange);
	}

	function upscaleWithinI53AndLoopCheck(min: Integer, max: Integer) {
		return function (engine) {
			var ret = 0;
			do {
				var high = engine() | 0;
				var low = engine() >>> 0;
				ret = ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
			} while (ret < min || ret > max);
			return ret;
		};
	}



	if (range <= 0 || !isFinite(range)) {
		return _get_generator_of_a_constant(min)
	} else if (range === 0xffffffff) {
		if (min === 0) {
			return get_random_generator_ofꓽintegerⵧ32()
		} else {
			return _get_generator_adding_to_underlying_generator(Random.int32, min + 0x80000000);
		}
	} else if (range < 0xffffffff) {
		return _get_generator_adding_to_underlying_generator(downscaleToRange(range), min);
	} else if (range === 0x1fffffffffffff) {
		return _get_generator_adding_to_underlying_generator(Random.uint53, min);
	} else if (range < 0x1fffffffffffff) {
		return _get_generator_adding_to_underlying_generator(upscaleWithinU53(range), min);
	} else if (max - 1 - min === 0x1fffffffffffff) {
		return _get_generator_adding_to_underlying_generator(Random.uint53Full, min);
	} else if (min === -0x20000000000000 && max === 0x20000000000000) {
		return Random.int53Full;
	} else if (min === -0x20000000000000 && max === 0x1fffffffffffff) {
		return Random.int53;
	} else if (min === -0x1fffffffffffff && max === 0x20000000000000) {
		return _get_generator_adding_to_underlying_generator(Random.int53, 1);
	} else if (max === 0x20000000000000) {
		return _get_generator_adding_to_underlying_generator(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
	} else {
		return upscaleWithinI53AndLoopCheck(min, max);
	}
*/
	/*

*/

}

export function get_random_generator_ofꓽintegerⵧin_interval(interval: [Integer, Integer]): RandomValueGenerator<Integer> {
	return get_random_generator_ofꓽintegerⵧbetween(...interval)
}

export function get_random_picker<T>(items: ReadonlyArray<T>): RandomValueGenerator<T> {
	throw new Error('NIMP!')
}
