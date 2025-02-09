import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { BookCover } from '../model--book/index.ts'

import type { BookExperience } from './types.ts'

/////////////////////////////////////////////////

function create(cover: Immutable<BookCover>): Immutable<BookExperience> {
	return {
		book_uid: cover.uid,
		last_user_investment_tms: 0,

		// no init of comprehension level
		// because different applications may have different default access level
	}
}

/////////////////////////////////////////////////

export {
	create,
}
