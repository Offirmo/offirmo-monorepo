import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import type { BookCover, BookUId } from '../model--book/types/index.ts'
import type { BookExperience } from '../model--book-experience/types.ts'
import type { BookStash } from './types.ts'

/////////////////////////////////////////////////

function create({defaultAccessLevel = 'unaware'}: Partial<{ defaultAccessLevel: BookStash['defaultAccessLevel']}> = {}): Immutable<BookStash> {
	return {
		defaultAccessLevel,

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
	cover: Immutable<BookCover>,
	//book_uid: Immutable<BookUId> = uid,
): Immutable<BookStash> {
	assert(!state.books[], `Book "${uid}" should not be already added!`)

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
