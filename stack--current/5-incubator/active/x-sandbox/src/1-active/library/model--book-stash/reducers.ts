import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { BookUId } from '../book/l1-types/types.ts'
import { AccessLevel, BookExperience, ComprehensionLevel } from '../book--experience/types.ts'
import { BookStash } from './types.ts'

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

// IMPORTANT
// since books can be templated,
// we can create new IDs on the fly, all pointing to the same book Id
// but with different customizations
function addꓽbook(
	state: Immutable<BookStash>,
	uid: Immutable<BookUId>,
	book_uid: Immutable<BookUId> = uid,

): Immutable<BookStash> {
	assert(!state.books[uid], `Book "${uid}" should not be already added!`)

	return {
		...state,
		books: {
			...state.books,
			[uid]: _createꓽBookExperience(book_uid),
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	addꓽbook,
}
