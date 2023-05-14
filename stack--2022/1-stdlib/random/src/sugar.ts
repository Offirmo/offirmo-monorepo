import {
	get_random_generator_ofꓽbool,
	get_random_generator_ofꓽboolⵧweighted,
	get_random_generator_ofꓽintegerⵧbetween,
	get_random_generator_ofꓽintegerⵧin_interval,
	get_random_picker,
} from './distributions/index.js'
import { get_RNGⵧISAAC32 } from './engines/ISAAC/index.js'
import { get_RNGⵧMathᐧrandom } from './engines/MathRandom/index.js'
import { PRNGEngine, PRNGState } from './types.js'
import { Immutable } from './embedded-deps/types/index.js'

function _get_random_generator_ofꓽbool() {
	return get_random_generator_ofꓽbool()
}
_get_random_generator_ofꓽbool.weighted = get_random_generator_ofꓽboolⵧweighted

export const get_random = {
	generator_of: {
		bool: _get_random_generator_ofꓽbool as {
			(): ReturnType<typeof get_random_generator_ofꓽbool>,
			weighted: typeof get_random_generator_ofꓽboolⵧweighted,
		},
		integer: {
			between: get_random_generator_ofꓽintegerⵧbetween,
			in_interval: get_random_generator_ofꓽintegerⵧin_interval,
		}
	},
	picker: {
		of: get_random_picker,
	},
}

// () => xxx() to hide the custom params
export const get_engine = {
	// direct
	ISAAC32: () => get_RNGⵧISAAC32(),
	Mathᐧrandom: () => get_RNGⵧMathᐧrandom(),

	from_state(state: Immutable<PRNGState>): PRNGEngine {
		const engine: PRNGEngine = (() => {
			switch (state.algorithm_id) {
				case 'ISAAC32':
					return get_RNGⵧISAAC32()
				case 'MT19937':
					throw new Error('Not Implemented')
				case undefined:
					return get_RNGⵧISAAC32()
				default:
					throw new Error(`Unknown PRNG id: "${state.algorithm_id}!`)
			}
		})()

		engine.set_state(state)

		return engine
	},

	// aliases
	good_enough: () => get_RNGⵧISAAC32(),
	for_unit_tests: () => get_RNGⵧISAAC32().seed([-1, 0, 1]) as PRNGEngine, // always PRNG for reproducibility
}
