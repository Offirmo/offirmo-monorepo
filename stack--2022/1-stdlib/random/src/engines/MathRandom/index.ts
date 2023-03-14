import { Int32, RNGEngine } from '../../types.js'

// Math.random() is pretty good if no need for crypto
// cf. https://v8.dev/blog/math-random

export function get_RNGⵧMathᐧrandom(): RNGEngine {
	const next_int32: Int32 = Math.random() * 0x100_000_000 | 0
	return {
		get_Int32() {
			return {
				i: next_int32,
				next_engine: get_RNGⵧMathᐧrandom(),
			}
		},
	}
}
