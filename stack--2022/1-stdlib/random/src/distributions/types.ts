import { Immutable } from '../embedded-deps/types/index.js'
import { RNGEngine } from '../types.js'


export type RandomValueGenerator<V> = (engine: Immutable<RNGEngine>) => V
