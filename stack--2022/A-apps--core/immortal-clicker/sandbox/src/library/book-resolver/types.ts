
import { Book, BookCover, BookUId, PageReference } from '../book/types.js'

/////////////////////////////////////////////////

type BookResolver = (path?: PageReference) => Promise<Book>

interface BookResolverEntry {
	uid: BookUId
	cover: BookCover
	ↆget: BookResolver
}

interface BookResolversIndex {
	entries: {
		[book_uid: BookUId]: {
			book: BookCover | Book // TODO review whether we can auto-transform cover to book
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
