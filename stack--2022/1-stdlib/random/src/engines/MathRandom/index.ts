import { Int32, RNGEngine } from '../../types.js'


export function get_RNGⵧMathᐧrandomⵧimmutable(): RNGEngine {
	const next_int32: Int32 = Math.random() * 0x100_000_000 | 0
	return {
		is_mutating() { return false },
		is_prng() { return false },
		get_Int32() {
			return {
				i: next_int32,
				next_engine: get_RNGⵧMathᐧrandomⵧimmutable(),
			}
		},
	}
}

export function get_RNGⵧMathᐧrandomⵧmutating(): RNGEngine {
	const engine = {
		is_mutating() { return true },
		is_prng() { return false },
		get_Int32() {
			return {
				i: Math.random() * 0x100_000_000 | 0,
				next_engine: engine,
			}
		},
	}
	return engine
}
