import { type Immutable } from '../embedded-deps/types/index.js'
import { type RNGEngine } from '../types.js'

/////////////////////////////////////////////////

type RandomValueGenerator<V> = (engine: Immutable<RNGEngine>) => V

/////////////////////////////////////////////////

export {
	type RandomValueGenerator,
}
