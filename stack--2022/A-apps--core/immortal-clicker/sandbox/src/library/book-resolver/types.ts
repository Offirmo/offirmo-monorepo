
import { Book, BookCover } from '../book/types.js'

type BookResolver = () => Promise<never> // TODO specify

interface BookResolversIndex {
	[book_uid: string]: {
		book: BookCover | Book
		ↆget: BookResolver
	}
}


/////////////////////////////////////////////////

export {
	type BookResolver,
	type BookResolversIndex,
}
