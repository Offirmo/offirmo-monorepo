import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookPage, BookPart, BookUId } from '../../../library/book/types.js'
import { Reference } from '../../../library/book-experience/types.js'

/////////////////////////////////////////////////

const uid: BookUId = 'BOOKꓽBHBVⵧ022ⵧOdile_la_belle_dame_d_Alsace'

const cover: BookCover = {
	title: 'Odile, la belle dame d’Alsace',

	author: 'M.-C. Mainé', // TODO more

	hints: {
		pages_count: 168,
	},
}

async function ↆget(ref?: Reference): Promise<Book> {
	const { content } = await import('./content.js')

	const book: Book = {
		uid,
		...cover,
		...content,
	}

	return book
}

/////////////////////////////////////////////////

export {
	uid,
	cover,
	ↆget,
}
