import { Immutable } from '../embedded-deps/types/index.js'
import { RNGEngine, Int32, UInt53 } from '../types.js'
import { RandomValueGenerator } from './types.js'

/////// generators

// 32bits = standard unit of RNG by common RNG (Mersenne, ISAAC...
// [-0x80000000, 0x7fffffff]
export function _randomly_generateꓽintegerⵧInt32(engine: Immutable<RNGEngine>): ReturnType<RandomValueGenerator<Int32>> {
	return engine.get_Int32()
}

// 53bits = limit of
// [0, 0x1f_ffff_ffff_ffff]
/*
export function _randomly_generateꓽintegerⵧUInt53(engine: Immutable<RNGEngine>): ReturnType<RandomValueGenerator<UInt53>> {
	const high = engine.get_Int32()
	const low = engine.get_Int32()

	return high * 0x1_0000_0000 + low
}*/

/////// factories

export function get_random_generator_ofꓽintegerⵧInt32(): RandomValueGenerator<Int32> {
	return _randomly_generateꓽintegerⵧInt32
}

/*
export function get_random_generator_ofꓽintegerⵧUInt53(): RandomValueGenerator<Int32> {
	return _randomly_generateꓽintegerⵧUInt53
}*/