import { Immutable } from '../embedded-deps/types/index.js'
import { RNGEngine } from '../types.js'

/////////////////////////////////////////////////

type RandomValueGenerator<V> = (engine: Immutable<RNGEngine>) => V

/////////////////////////////////////////////////

export {
	type RandomValueGenerator,
}
