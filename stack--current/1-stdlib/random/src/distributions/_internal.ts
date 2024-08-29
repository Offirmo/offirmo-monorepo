import { type Immutable } from '../embedded-deps/types/index.js'
import { type RNGEngine } from '../types.js'
import { type RandomValueGenerator } from './types.js'

/////////////////////////////////////////////////

function _getꓽgenerator_ofꓽconstant<T>(c: T): RandomValueGenerator<T> {
	return function _generate_constant(engine: Immutable<RNGEngine>) {
		return c
	}
}

/////////////////////////////////////////////////

export {
	_getꓽgenerator_ofꓽconstant,
}
