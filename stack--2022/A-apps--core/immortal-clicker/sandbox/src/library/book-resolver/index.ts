import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookUId, Book, BookCover } from '../book/types.js'
import { ↆget } from '../../demo--library/bhbv/22/index.js'

const DEFAULT_INDEX: BookResolversIndex = createꓽindex()

/////////////////////////////////////////////////
// the core feature we need: provided a book UID, load it.

async function ↆgetꓽBookCover(uid: BookUId, index: Immutable<BookResolversIndex> = DEFAULT_INDEX): Promise<BookCover> {

}


async function ↆgetꓽBook(uid: BookUId, index: Immutable<BookResolversIndex> = DEFAULT_INDEX): Promise<Book> {

}

/////////////////////////////////////////////////
// of course behind the hood we need an index of books

type BookResolver = () => Promise<never> // TODO specify
interface BookResolversIndex {
	[book_uid: string]: {
		book: BookCover | Book
		ↆget: BookResolver
	}
}

function create(): BookResolversIndex {
	return {}
}

/////////////////////////////////////////////////

export {
	ↆgetꓽBookCover,
	ↆgetꓽBook,

	type BookResolver,
	type BookResolversIndex,

	create,
}
