import { get_random, RNGEngine } from '@offirmo/random'

import { BiologicalSex } from './types.js'

/////////////////////////////////////////////////


function get_randomꓽBiologicalSex(engine: RNGEngine): BiologicalSex {
	return get_random.generator_of.bool()(engine) ? 'female' : 'male'
}

/////////////////////////////////////////////////

export * from './types.js'
export {
	get_randomꓽBiologicalSex,
}
