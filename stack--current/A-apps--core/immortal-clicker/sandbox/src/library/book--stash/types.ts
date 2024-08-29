import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { BookExperience } from '../book--experience/types.js'

/////////////////////////////////////////////////

// this is to be serialized and stored as part of the user state
// only add necessary data
interface BookStash {
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
