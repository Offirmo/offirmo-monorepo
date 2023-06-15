
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { get_random, RNGEngine } from '@offirmo/random'

import {
	get_randomꓽfirstname,
	get_randomꓽlastname,
} from '../generator--name/src/index.js'

/////////////////////////////////////////////////

type Sex = 'male' | 'female' | 'unclear'

interface Sibling {
	sex: Sex
	age_diff: number
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

	children: Sibling[]
}

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

		children: [],
	}

	return result
}


/////////////////////////////////////////////////

export {
	get_randomꓽnuclear_family,
}
