import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookCover, BookPage, BookUId } from '../../../library/book/types.js'
import { Reference } from '../../../library/book-experience/types.js'

/////////////////////////////////////////////////

const uid: BookUId = 'BOOKꓽBHBVⵧ001ⵧla_plus_belle_histoire'

const cover: BookCover = {
	title: 'La plus belle histoire',

	hints: {
		pages_count: 128,
	},
}

async function ↆget(ref?: Reference): Promise<Book> {

	throw new Error('NIMP!')
}

/////////////////////////////////////////////////

export {
	uid,
	cover,
}