import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

type LastName = string // aka. family
type FirstName = string

interface FullName {
	last: LastName
	first: FirstName
}


interface LastNameOptions {
	occupation: never
	epicness: never
	alignment: never
}
function getꓽlastname(options: Immutable<Partial<LastNameOptions>> = {}): LastName {
	return 'TODO'
}

interface FirstNameOptions {
	gender: 'male' | 'female' | 'neutral'
	epicness: never
	alignment: never
}
function getꓽfirstname(options: Immutable<Partial<FirstNameOptions>> = {}): FirstName {
	return 'TODO'
}

/////////////////////////////////////////////////

export {
	getꓽlastname,
	getꓽfirstname,
}
