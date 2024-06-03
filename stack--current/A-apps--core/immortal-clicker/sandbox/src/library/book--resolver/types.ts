import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookUId, BookPageReference } from '../book/types.js'

/////////////////////////////////////////////////

// dynamically loads the content. Especially designed at lazy loading.
// Note that we support granular loading, the result may not be a fully loaded book
// hence the param:
// - page_ref: optional, in case we have a granular dynamic loading
type BookResolver =
	(existing: Immutable<BookCover> | Immutable<Book>, page_ref?: BookPageReference)
		=> Promise<Immutable<Book>>

interface BookResolverEntry {
	uid: BookUId
	cover: BookCover
	ↆget: BookResolver
}

interface BookResolversIndex {
	entries: {
		[book_uid: BookUId]: {
			book: BookCover | Book // reminder: book can be loaded in a granular way, may not be complete
			ↆget: BookResolver
		}
	}
}

/////////////////////////////////////////////////

export {
	type BookResolver,
	type BookResolverEntry,
	type BookResolversIndex,
}
