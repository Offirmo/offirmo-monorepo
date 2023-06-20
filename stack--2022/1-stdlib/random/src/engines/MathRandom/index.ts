import { RNGEngine } from '../../types.js'


export function getꓽRNGⵧMathᐧrandom(): RNGEngine {
	const engine = {
		is_prng() { return false },
		get_Int32() {
			return Math.random() * 0x100_000_000 | 0
		},
	}
	return engine
}
