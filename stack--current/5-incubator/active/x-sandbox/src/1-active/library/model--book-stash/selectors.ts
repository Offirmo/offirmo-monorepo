import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { BookStash } from './types.ts'
import type { BookCover } from '../model--book/types/index.ts'

/////////////////////////////////////////////////

// use case: initial display, for the user to select a book to read
// should return all the books known to the user (even if not available)
function getꓽbookshelf(state: Immutable<BookStash>): [ Array<Immutable<BookCover>> ] {
	const booksⵧall = Object.values(state.books)
	const booksⵧknown = booksⵧall.filter(([uid, experience]) => {
		return experience.accessLevel !== 'unaware'
	})
}

/*
function getꓽexperience(state: Immutable<BookStash>, uid: Immutable<BookUId>): Immutable<BookExperience> {
	const experience = state.books[uid]
	assert(!!experience, `Book "${uid}" is unknown!`)

	return experience
}*/

/////////////////////////////////////////////////

export {
	getꓽexperience,
}
