import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import type { BookCover, BookUId } from '../model--book/types/index.ts'
import {
	type BookExperience,
	create as _createꓽBookExperience,
} from '../model--book-experience/index.ts'

import type { BookStash } from './types.ts'

/////////////////////////////////////////////////

function create({defaultAccessLevel = 'unaware'}: Partial<{ defaultAccessLevel: BookStash['defaultAccessLevel']}> = {}): Immutable<BookStash> {
	return {
		defaultAccessLevel,
		_unique_experience_uid_generator: 0,

		experiences: {
			// no books yet
		}
	}
}

// IMPORTANT
// since books can be templated,
// we can create new IDs on the fly, all pointing to the same book Id
// but with different customizations
function addꓽbook(
	state: Immutable<BookStash>,
	cover: Immutable<BookCover>,
	experience_uid: Immutable<BookUId> = cover.uid, // TODO replace with customization + auto sub-ids
): Immutable<BookStash> {
	assert(!state.experiences[experience_uid], `Book "${experience_uid}" should not be already added!`)

	return {
		...state,
		experiences: {
			...state.experiences,
			[experience_uid]: _createꓽBookExperience(cover),
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	addꓽbook,
}
