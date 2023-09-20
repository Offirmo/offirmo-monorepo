import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookUId, Book, BookCover } from '../book/types.js'
import { BookResolversIndex } from './types.js'

/////////////////////////////////////////////////
// the core feature we need: provided a book UID, load it.

function getꓽBookCover(state: Immutable<BookResolversIndex>, uid: BookUId): Immutable<BookCover> {
	const cover =state.entries[uid]?.book

	assert(cover)

	return cover
}

async function ↆgetꓽBook(state: Immutable<BookResolversIndex>, uid: BookUId): Promise<Book> {
	throw new Error('Not implemented!')
}

/////////////////////////////////////////////////

export {
	getꓽBookCover,
	ↆgetꓽBook,
}
