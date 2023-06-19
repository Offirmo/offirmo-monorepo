import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { get_random, RNGEngine } from '@offirmo/random'

import { LASTNAMES_ORDERED_BY_RARITY } from './data--auto-generated/lastnames--sinosplice.js'
import { FirstNameEntry, FIRST_NAME_ENTRIES } from './data--auto-generated/firstnames--RBRB.js'

/////////////////////////////////////////////////

type LastName = string // aka. family
type FirstName = string

interface LastNameOptions {
	occupation: never
	rarity: never
	epicness: never
	alignment: never
}
function get_randomꓽlastname(engine: RNGEngine, options: Immutable<Partial<LastNameOptions>> = {}): LastName {
	return get_random.picker.of(LASTNAMES_ORDERED_BY_RARITY)(engine)
}

interface FirstNameOptions {
	gender: 'male' | 'male!' | 'female' | 'female!' | 'neutral' // male = male + neutral, male! = male only, no neutral
	epicness: never
	alignment: never
}
function get_randomꓽfirstname(engine: RNGEngine, options: Immutable<Partial<FirstNameOptions>> = {}): FirstName {
	let candidates = FIRST_NAME_ENTRIES
	if (options.gender) {
		let allowed_genders = (() => {
			switch (options.gender) {
				case 'male':
					return [ 'M', 'N' ] as Array<FirstNameEntry['gender']>
				case 'male!':
					return [ 'M' ] as Array<FirstNameEntry['gender']>
				case 'female':
					return [ 'F', 'N' ] as Array<FirstNameEntry['gender']>
				case 'female!':
					return [ 'F' ] as Array<FirstNameEntry['gender']>
				case 'neutral':
					return [ 'N' ] as Array<FirstNameEntry['gender']>
				default:
					throw new Error('get_randomꓽfirstname gender!')
			}
		})()
		candidates = candidates.filter(entry => allowed_genders.includes(entry.gender))
	}
	const candidate = get_random.picker.of(candidates)(engine)
	return candidate.str
}

/////////////////////////////////////////////////

export {
	type LastName,
	type FirstName,

	get_randomꓽlastname,
	get_randomꓽfirstname,
}
