
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽrandom, RNGEngine } from '@offirmo/random'

import { get_randomꓽBiologicalSex, BiologicalSex } from '../torefine/index.js'
import {
	get_randomꓽfirstname,
	get_randomꓽlastname,
} from '../generator--name/src/index.js'

/////////////////////////////////////////////////

interface Children {
	sex: BiologicalSex
	age_diff: number // difference from the age of the FIRST child. Useful to retro-compute from oneself if one of the child
	firstname: string
}

interface NuclearFamily {
	//occupation: 'scholar' | 'farmer' | 'artisan' | 'merchant' | 'lower' // https://en.wikipedia.org/wiki/Four_occupations

	lastname: string

	father: {
		firstname: string
	}

	mother: {
		firstname: string
		lastname: string
	}

	// father's parents are living at his home
	grandfather: {
		firstname: string
	}
	grandmother: {
		firstname: string
		lastname: string
	}

	children: Children[]
}

// NOTE it's very primitive of course
// iterative work!
interface Options {
}
function get_randomꓽnuclear_family(engine: RNGEngine, options: Immutable<Partial<Options>> = {}): NuclearFamily {
	const result: NuclearFamily = {
		lastname: get_randomꓽlastname(engine),

		father: {
			firstname: get_randomꓽfirstname(engine, { gender: 'male'}),
		},

		mother: {
			firstname: get_randomꓽfirstname(engine, { gender: 'female'}),
			lastname: get_randomꓽlastname(engine),
		},

		grandfather: {
			firstname: get_randomꓽfirstname(engine, { gender: 'male'}),
		},

		grandmother: {
			firstname: get_randomꓽfirstname(engine, { gender: 'female'}),
			lastname: get_randomꓽlastname(engine),
		},

		children: [],
	}

	const n_of_children = getꓽrandom.generator_of.integer.between(1, 5)(engine)
	let accumulated_diff = 0
	for (let i = 0; i < n_of_children; ++i) {
		const sex = get_randomꓽBiologicalSex(engine)
		result.children.push({
			age_diff: accumulated_diff,
			sex,
			firstname: get_randomꓽfirstname(engine, { gender: sex })
		} as Children)
		// age diff with next child
		accumulated_diff += getꓽrandom.generator_of.integer.between(1, 3)(engine)
	}

	return result
}


/////////////////////////////////////////////////

export {
	type NuclearFamily,

	get_randomꓽnuclear_family,
}
