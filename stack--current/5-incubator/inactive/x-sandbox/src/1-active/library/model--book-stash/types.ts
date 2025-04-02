import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { AccessLevel, BookExperience } from '../model--book-experience/types.ts'

/////////////////////////////////////////////////

type BookExperienceUid = string // !Book Uid since the same book can be forked through customization

// this is to be serialized and stored as part of the user state
// only add necessary data
interface BookStash {
	defaultAccessLevel: AccessLevel, // bc. depend on the application, ex. reader vs game.

	_unique_experience_uid_generator: number

	experiences: {
		[experience_uid: BookExperienceUid]: BookExperience
		// books not in the book stash are implicitly AccessLevel = 'unaware'
	}

	// TODO memory of most recently read
	// TODO "star"
	// TODO custom comment on each book
}

/////////////////////////////////////////////////

export {
	type BookExperienceUid,
	type BookStash,
}
