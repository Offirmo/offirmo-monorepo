import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { BookStash } from './types.ts'
import { BookUId } from '../book/l1-types/types.ts'
import { BookExperience } from '../book--experience/types.ts'

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
