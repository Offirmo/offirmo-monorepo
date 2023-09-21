import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { BookStash } from './types.js'
import { BookUId } from '../book/types.js'
import { BookExperience } from '../book-experience/types.js'

/////////////////////////////////////////////////

function getꓽexperience(state: Immutable<BookStash>, uid: Immutable<BookUId>): Immutable<BookExperience> {
	const experience = state.books[uid]
	assert(!!experience, `Book "${uid}" is unknown!`)

	return experience
}

/////////////////////////////////////////////////

export {
	getꓽexperience,
}
