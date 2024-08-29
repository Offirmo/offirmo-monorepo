import {
	getꓽrandom_generator_ofꓽbool,
	getꓽrandom_generator_ofꓽboolⵧweighted,
	getꓽrandom_generator_ofꓽintegerⵧbetween,
	getꓽrandom_generator_ofꓽintegerⵧin_interval,
	getꓽrandom_picker,
} from './distributions/index.js'
import { getꓽRNGⵧISAAC32 } from './engines/ISAAC/index.js'
import { getꓽRNGⵧMathᐧrandom } from './engines/MathRandom/index.js'
import { PRNGEngine, PRNGState } from './types.js'
import { type Immutable } from './embedded-deps/types/index.js'

/////////////////////////////////////////////////

function _getꓽrandom_generator_ofꓽbool() {
	return getꓽrandom_generator_ofꓽbool()
}
_getꓽrandom_generator_ofꓽbool.weighted = getꓽrandom_generator_ofꓽboolⵧweighted

const getꓽrandom = {
	generator_of: {
		bool: _getꓽrandom_generator_ofꓽbool as {
			(): ReturnType<typeof getꓽrandom_generator_ofꓽbool>,
			weighted: typeof getꓽrandom_generator_ofꓽboolⵧweighted,
		},
		integer: {
			between: getꓽrandom_generator_ofꓽintegerⵧbetween,
			in_interval: getꓽrandom_generator_ofꓽintegerⵧin_interval,
		}
	},
	picker: {
		of: getꓽrandom_picker,
	},
}

const getꓽengine = {
	// () => xxx() to hide the custom params

	// direct
	ISAAC32: () => getꓽRNGⵧISAAC32(),
	Mathᐧrandom: () => getꓽRNGⵧMathᐧrandom(),

	prng: {
		from_state(state: Immutable<Partial<PRNGState>>): PRNGEngine {
			const engine: PRNGEngine = (() => {
				switch (state.algorithm_id) {
					case 'ISAAC32':
						return getꓽRNGⵧISAAC32()
					case 'MT19937':
						throw new Error('Not Implemented')
					case undefined:
						return getꓽRNGⵧISAAC32()
					default:
						throw new Error(`Unknown PRNG algorithm: "${state.algorithm_id}!`)
				}
			})()

			if (state.seed) {
				engine.seed(state.seed)
			}
			if (state.call_count) {
				engine.discard(state.call_count)
			}

			return engine
		},

		// aliases
		good_enough: () => getꓽRNGⵧISAAC32(),
	},


	// aliases
	good_enough: () => getꓽRNGⵧMathᐧrandom(),
	for_unit_tests: () => getꓽRNGⵧISAAC32().seed([-1, 0, 1]) as PRNGEngine, // always PRNG for reproducibility
}

/////////////////////////////////////////////////

export {
	getꓽrandom,
	getꓽengine,
}
