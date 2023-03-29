import { Immutable, Integer, Percentage } from '@offirmo-private/ts-types'
import { RNGEngine, Int32, UInt53 } from './types.js'
import { assert } from './utils/assert.js'


// check params!


type RandomValueGenerator<V> = (engine: Immutable<RNGEngine>) => { result: V, next_engine: RNGEngine }


// [-0x80000000, 0x7fffffff]
/*function _get_random_Int32(engine: Immutable<RNGEngine>): ReturnType<RandomValueGenerator<Int32>> {
	throw new Error('NIMP!')
}*/
// [0, 0x1fffffffffffff]
function _get_random_UInt53(engine: Immutable<RNGEngine>): ReturnType<RandomValueGenerator<UInt53>> {
	const high = (() => {
		const { i, next_engine } = engine.get_Int32()
		engine = next_engine
		return i & 0x1fffff
	})()

	const low = (() => {
		const { i, next_engine } = engine.get_Int32()
		engine = next_engine
		return i >>> 0
	})()

	return {
		result: high * 0x100000000 + low,
		next_engine: engine,
	}
}

function _is_last_bitꘌ1(i: Int32) {
	return (i & 1) === 1
}

// between 0…1: i: 0.5 + _next() * 2.3283064365386963e-10, // 2^-32,

export function get_random_generator_ofꓽbool(): RandomValueGenerator<boolean> {
	return function _randomly_generateꓽbool(engine: Immutable<RNGEngine>) {
		const { i, next_engine } = engine.get_Int32()

		const result: boolean = _is_last_bitꘌ1(i)

		return {
			result,
			next_engine
		}
	}
}

function _get_random_generator_ofꓽboolⵧfalse(): RandomValueGenerator<boolean> {
	return function _randomly_generateꓽboolⵧfalse(engine: Immutable<RNGEngine>) {
		return {
			result: false,
			next_engine: engine,
		}
	}
}
function _get_random_generator_ofꓽboolⵧtrue(): RandomValueGenerator<boolean> {
	return function _randomly_generateꓽboolⵧtrue(engine: Immutable<RNGEngine>) {
		return {
			result: true,
			next_engine: engine,
		}
	}
}

export function get_random_generator_ofꓽboolⵧweighted(percentage: Percentage): RandomValueGenerator<boolean> {
	assert(percentage >= 0, 'percentage should be >= 0')
	assert(percentage <= 1, 'percentage should be <= 1')

	if (percentage === 0)
		return _get_random_generator_ofꓽboolⵧfalse()
	if (percentage === 1)
		return _get_random_generator_ofꓽboolⵧtrue()

	const scaled_percentageⵧfast = percentage * 0x100_000_000;
	const is_scaled_percentageⵧfast_good_enough = scaled_percentageⵧfast % 1 === 0 // ===0 means no fractional part = ok
	if (is_scaled_percentageⵧfast_good_enough) {
		const ceil = scaled_percentageⵧfast - 0x80_000_000
		return function _randomly_generateꓽboolⵧfast(engine: Immutable<RNGEngine>) {
			const { i, next_engine } = engine.get_Int32()
			return {
				result: i < ceil,
				next_engine,
			}
		}
	}

	// we need to scale more, at the cost of drawing more randomness
	const ceil = Math.round(percentage * 0x20_000_000_000_000)
	return function _randomly_generateꓽboolⵧslow(engine: Immutable<RNGEngine>) {
		const { result, next_engine } = _get_random_UInt53(engine)
		return {
			result: result < ceil,
			next_engine,
		}
	}
}

export function get_random_generator_ofꓽintegerⵧbetween(min: Integer, max: Integer): RandomValueGenerator<Integer> {
	throw new Error('NIMP!')
}

export function get_random_generator_ofꓽintegerⵧin_interval(interval: [Integer, Integer]): RandomValueGenerator<Integer> {
	// check interval size!
	throw new Error('NIMP!')
}

export function get_random_picker<T>(items: ReadonlyArray<T>): RandomValueGenerator<T> {
	throw new Error('NIMP!')
}
