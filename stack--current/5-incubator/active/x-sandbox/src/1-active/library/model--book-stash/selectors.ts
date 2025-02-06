import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import type { BookCover } from '../model--book/index.ts'

import {
	type BookExperience,
	isꓽaware
} from '../model--book-experience/index.ts'

import type { BookStash } from './types.ts'

/////////////////////////////////////////////////

// use case: initial display, for the user to select a book to read
// should return all the books known to the user (even if not available)
function getꓽbookshelf(state: Immutable<BookStash>): Array<[ Immutable<BookCover>, Immutable<BookExperience> ]> {
	const booksⵧall = Array.from(Object.entries(state.books))
	const booksⵧknown = booksⵧall.filter(([uid, experience]) => {
		return isꓽaware(experience)
	})

	const result: Array<[ Immutable<BookCover>, Immutable<BookExperience> ]> = []

	return result
}

/////////////////////////////////////////////////

export {
	getꓽbookshelf,
}
