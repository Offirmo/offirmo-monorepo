import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { BookCover, BookUId } from '../model--book/types/index.ts'
import * as BookExperienceLib from '../model--book-experience/index.ts'

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
	assert(!state.experiences[experience_uid], `Experience "${experience_uid}" should not already exist!`)

	return {
		...state,
		experiences: {
			...state.experiences,
			[experience_uid]: BookExperienceLib.create(cover),
		}
	}
}

function starꓽbook(
	state: Immutable<BookStash>,
	experience_uid: Immutable<BookUId>,
	target: boolean | 'toggle',
): Immutable<BookStash> {
	let experience = state.experiences[experience_uid]
	assert(experience, `Experience "${experience_uid}" should exist!`)

	const isꓽstarred = BookExperienceLib.isꓽstarredⵧexact(experience, BookExperienceLib.NODE_REFERENCEꘌROOT)
	if (isꓽstarred === target)
		return state // nothing to do

	return {
		...state,
		experiences: {
			...state.experiences,
			[experience_uid]: BookExperienceLib.setꓽstarred(experience, BookExperienceLib.NODE_REFERENCEꘌROOT,
				target === 'toggle' ? !isꓽstarred : target
			),
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	addꓽbook,
	starꓽbook,
}
