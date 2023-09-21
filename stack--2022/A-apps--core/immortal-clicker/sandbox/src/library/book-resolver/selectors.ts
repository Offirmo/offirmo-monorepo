import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookUId, Book, BookCover, PageReference } from '../book/types.js'
import { BookResolversIndex } from './types.js'

/////////////////////////////////////////////////
// the core feature we need: provided a book UID, load it.

function getꓽBookCover(state: Immutable<BookResolversIndex>, uid: BookUId): Immutable<BookCover> {
	const cover =state.entries[uid]?.book

	assert(!!cover, `The resolver should have a cover for id "${uid}"!`)

	return cover
}

async function ↆgetꓽBook(state: Immutable<BookResolversIndex>, uid: BookUId, path?: PageReference): Promise<Immutable<Book>> {
	const ↆget =state.entries[uid]?.ↆget

	//console.log(state)
	assert(!!ↆget, `The resolver should have a loader for id "${uid}"!`)

	return ↆget()
}

/////////////////////////////////////////////////

export {
	getꓽBookCover,
	ↆgetꓽBook,
}
