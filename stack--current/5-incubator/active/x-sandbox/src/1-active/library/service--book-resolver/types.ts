import type { Immutable } from '@offirmo-private/ts-types'

import type { Book, BookUId, BookPageReference } from '../model--book/index.ts'

/////////////////////////////////////////////////

// dynamically loads the content. Especially designed at lazy loading.
// Note that we support granular loading, the result may not be a fully loaded book
// hence the param:
// - page_ref: optional, in case we have a granular dynamic loading
type BookResolver =
	(existing: Immutable<Book>, page_ref?: BookPageReference)
		=> Promise<Immutable<Book>>

/*
interface BookResolverEntry {
	uid: BookUId
	cover: BookCover
	ↆget: BookResolver
}*/

interface State {
	entries: {
		[book_uid: BookUId]: {
			partial: Book // reminder: may not be complete; books can be loaded in a granular way
			ↆget: BookResolver
		}
	}
}

/////////////////////////////////////////////////

export {
	type BookResolver,
	//type BookResolverEntry,
	type State,
}
