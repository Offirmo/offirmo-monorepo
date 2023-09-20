import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookUId, PageReference } from '../book/types.js'
import { AccessLevel, BookExperience, ComprehensionLevel } from '../book-experience/types.js'
import { BookStash } from './types.js'

/////////////////////////////////////////////////

function create(): Immutable<BookStash> {
	return {
		books: {
			// no books yet
		}
	}
}

function _createꓽBookExperience(book_uid: Immutable<BookUId>): Immutable<BookExperience> {
	return {
		book_uid,
	}
}

function addꓽbook(state: Immutable<BookStash>, uid: Immutable<BookUId>): Immutable<BookStash> {
	assert(!state.books[uid], `Book "${uid}" should not be already added!`)

	return {
		...state,
		books: {
			...state.books,
			[uid]: _createꓽBookExperience(uid),
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	addꓽbook,
}
