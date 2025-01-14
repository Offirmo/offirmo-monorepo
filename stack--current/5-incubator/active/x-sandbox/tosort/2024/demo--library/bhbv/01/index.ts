import { type Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookUId } from '../../../book/l1-types/types.ts'
import { BookResolver, BookResolverEntry } from '../../../book--resolver'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽBHBVⵧ001【la plus belle histoire】〗'

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
