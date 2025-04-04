import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { Book, BookCover, BookUId, BookPageReference } from '../model--book/index.ts'
import type { State } from './types.ts'

/////////////////////////////////////////////////
// the core feature we need: provided a book UID, load it.

// synchronous, contains at least the cover (book inherits from cover)
function getꓽPartialBook(state: Immutable<State>, uid: BookUId): Immutable<Book> {
	const book = state.entries[uid]?.partial
	assert(!!book, `The resolver should have an existing partial book for id "${uid}"!`)

	return book
}

// async, may load more content (at least page_ref)
async function ↆgetꓽMoreCompleteBook(state: Immutable<State>, uid: BookUId, page_ref?: BookPageReference): Promise<Immutable<Book>> {

	// TODO if ref already resolved, do nothing!

	const ↆget =state.entries[uid]?.ↆget
	assert(!!ↆget, `The resolver should have a loader for id "${uid}"!`)

	const existing = getꓽPartialBook(state, uid)

	return ↆget(existing, page_ref)
}

/////////////////////////////////////////////////

export {
	getꓽPartialBook,
	ↆgetꓽMoreCompleteBook,
}
