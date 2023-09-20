// this file should be very small, not loading all the content

import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookPage, BookPart, BookUId, PageReference } from '../../../library/book/types.js'
import { BookResolverEntry } from '../../../library/book-resolver/types.js'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽBHBVⵧ022〗【Odile_la_belle_dame_d_Alsace】'

const cover: BookCover = {
	title: 'Odile, la belle dame d’Alsace',

	author: 'M.-C. Mainé', // TODO more

	hints: {
		pages_count: 168,
	},
}

async function ↆget(ref?: PageReference): Promise<Book> {
	const { content } = await import('./content.js')

	const book: Book = {
		uid,
		...cover,
		...content,
	}

	return book
}

const entry: BookResolverEntry = {
	uid,
	cover,
	ↆget,
}

/////////////////////////////////////////////////

export {
	uid,
	cover,
	ↆget,
	entry,

	entry as BookEntryꓽBHBHⳇ022,
}
