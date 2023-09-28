import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookUId } from '../../../library/book/types.js'
import { BookResolver, BookResolverEntry } from '../../../library/book-resolver/index.js'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽBHBVⵧ001【la_plus_belle_histoire】〗'

const cover: BookCover = {
	title: 'La plus belle histoire',

	hints: {
		pages_count: 128,
	},
}

const ↆget: BookResolver = async function ↆget(existing, ref): Promise<Book> {
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
