import { Immutable } from '../embedded-deps/types/index.js'
import { RNGEngine } from '../types.js'
import { RandomValueGenerator } from './types.js'


export function _get_generator_of_a_constant<T>(c: T): RandomValueGenerator<T> {
	return function _generate_constant(engine: Immutable<RNGEngine>) {
		return c
	}
}
