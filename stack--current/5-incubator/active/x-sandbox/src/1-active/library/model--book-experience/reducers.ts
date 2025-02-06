import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import type { BookCover } from '../model--book/index.ts'

import type { BookExperience, X } from './types.ts'

/////////////////////////////////////////////////

function create(cover: Immutable<BookCover>): Immutable<BookExperience> {
	return {
		book_uid: cover.uid,
	}
}

/////////////////////////////////////////////////

export {
	create,
}
