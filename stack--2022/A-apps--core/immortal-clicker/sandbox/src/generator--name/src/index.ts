import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { get_random, RNGEngine } from '@offirmo/random'

import { LASTNAMES_ORDERED_BY_RARITY } from './data--auto-generated/lastnames--sinosplice.js'
import { FIRST_NAME_ENTRIES } from './data--auto-generated/firstnames--RBRB.js'

/////////////////////////////////////////////////

type LastName = string // aka. family
type FirstName = string

interface FullName {
	last: LastName
	first: FirstName
}


interface LastNameOptions {
	occupation: never
	rarity: never
	epicness: never
	alignment: never
}
function getꓽlastname(engine: RNGEngine, options: Immutable<Partial<LastNameOptions>> = {}): LastName {
	return get_random.picker.of(LASTNAMES_ORDERED_BY_RARITY)(engine)
}

interface FirstNameOptions {
	gender: 'male' | 'female' | 'neutral'
	epicness: never
	alignment: never
}
function getꓽfirstname(engine: RNGEngine, options: Immutable<Partial<FirstNameOptions>> = {}): FirstName {
	const candidates = FIRST_NAME_ENTRIES
	const candidate = get_random.picker.of(candidates)(engine)
	return candidate.str
}

/////////////////////////////////////////////////

export {
	getꓽlastname,
	getꓽfirstname,
}
