import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import type { AccessLevel, BookExperience } from '../model--book-experience/types.ts'

/////////////////////////////////////////////////

// this is to be serialized and stored as part of the user state
// only add necessary data
interface BookStash {
	defaultAccessLevel: AccessLevel, // bc. depend on the application, ex. reader vs game.

	books: {
		[uid: string]: BookExperience
		// books not in the book stash are implicitly AccessLevel = 'unaware'
	}

	// TODO memory of most recently read
	// TODO "star"
	// TODO custom comment on each book
}

/////////////////////////////////////////////////

export {
	type BookStash,
}
