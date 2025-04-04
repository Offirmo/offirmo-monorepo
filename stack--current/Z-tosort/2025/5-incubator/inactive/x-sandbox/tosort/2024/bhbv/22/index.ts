// this file should be very small, not loading all the content

import { type Immutable } from '@offirmo-private/ts-types'
import assert from 'tiny-invariant'

import { Book, BookCover, BookUId } from '../../../book/l1-types/types.ts'
import { BookResolver, BookResolverEntry } from '../../../book--resolver/types.ts'
import { isꓽBook } from '../../../book/l1-types/guards.ts'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽBHBVⵧ022【Odile la belle dame d’Alsace】〗'

const cover: BookCover = {
	title: 'Odile, la belle dame d’Alsace',

	author: 'M.-C. Mainé', // TODO more

	hints: {
		pages_count: 168,
	},
}

const ↆget: BookResolver = async function ↆget(existing, ref) {
	if (isꓽBook(existing) && Object.keys(existing.parts).length > 0) {
		// already loaded!
		return existing
	}

	const { content } = await import('./content.ts')

	const book: Book = {
		uid,
		...cover,
		...content,
	}

	if (book.hints.pages_count) {
		const actual_page_count = Object.keys(content.parts).length
		assert(book.hints.pages_count === actual_page_count, `Book "${uid}": wrong hint "pages_count" should be ${actual_page_count}!`)
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
