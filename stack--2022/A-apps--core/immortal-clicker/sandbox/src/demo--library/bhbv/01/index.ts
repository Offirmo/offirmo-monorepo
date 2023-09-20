import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookPage, BookUId, PageReference } from '../../../library/book/types.js'
import { BookResolverEntry } from '../../../library/book-resolver/index.js'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽBHBVⵧ001〗【la_plus_belle_histoire】'

const cover: BookCover = {
	title: 'La plus belle histoire',

	hints: {
		pages_count: 128,
	},
}

async function ↆget(ref?: PageReference): Promise<Book> {

	throw new Error('NIMP!')
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

	entry as BookEntryꓽBHBHⳇ001,
}
