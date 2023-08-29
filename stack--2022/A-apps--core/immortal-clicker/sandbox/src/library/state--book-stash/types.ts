import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookExperience } from '../book-experience/types.js'

/////////////////////////////////////////////////

// this is to be serialized and stored as part of the user state
// only add necessary data
interface BookStash {
	[uid: string]: BookExperience
	// books not in the book stash are implicitly AccessLevel = 'unaware'
}

/////////////////////////////////////////////////

export {
	type BookStash,
}
