import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import type { WithLastUserInvestmentTimestamp } from '@offirmo-private/state-utils'

import type { BookCover, BookNodeReference, BookPage, BookPageReference, Text } from '../model--book/index.ts'

import * as BookExperienceLib from '../model--book-experience/index.ts'

import type { BookStash, BookExperienceUid } from './types.ts'

import { registry } from '../service--book-resolver/index.ts'
import type { ComprehensionLevel } from '../model--book-experience/index.ts'
import { ↆgetꓽMoreCompleteBook } from '../service--book-resolver/selectors.ts'

type ErrorText = Text

/////////////////////////////////////////////////

// should contain everything needed to display the entry of the bookshelf
interface BookshelfEntry  extends WithLastUserInvestmentTimestamp {
	experience_uid: BookExperienceUid // useful for reference + for keying, ex. React key
	cover: BookCover
	// aggregated+defaulted root details
	access_level: BookExperienceLib.AccessLevel
	comprehension_level: BookExperienceLib.ComprehensionLevel | undefined
	is_root_starred: boolean
	stared_nodes_count: number
}

// lower is more important
function _comprehensionLevelToSortingNumber(c: ComprehensionLevel | undefined): number {
	if (c === 'abstaining')
		return 99
	if (c === 'viewedⵧblocked')
		return 98
	if (!c)
		return 97

	// TODO one day intermediate?

	return 1
}


function _sortBookshelfEntries(a: Immutable<BookshelfEntry>, b: Immutable<BookshelfEntry>): number {
	assert(a.access_level !== 'unaware')
	assert(b.access_level !== 'unaware')

	if (a.access_level !== b.access_level) {
		return a.access_level === 'accessⵧyes'
			? -1
			: 1
	}

	if (a.comprehension_level !== b.comprehension_level) {
		return _comprehensionLevelToSortingNumber(a.comprehension_level) - _comprehensionLevelToSortingNumber(b.comprehension_level)
	}

	// TODO sort by percentage read

	if (a.last_user_investment_tms !== b.last_user_investment_tms) {
		// bigger is better
		return -1 * (a.last_user_investment_tms - b.last_user_investment_tms)
	}

	if (a.stared_nodes_count !== b.stared_nodes_count) {
		// bigger is better
		return -1 * (a.stared_nodes_count - b.stared_nodes_count)
	}

	return a.experience_uid.localeCompare(b.experience_uid)
}

// use case: initial display, for the user to select a book to read
// should return all the books known to the user (even if not available)
function getꓽbookshelf(state: Immutable<BookStash>)
	// the entries are immutable but not the array, user is free to re-sort it
	: Array<Immutable<BookshelfEntry>>
{
	const booksⵧall = Array.from(Object.entries(state.experiences))
	const booksⵧknown = booksⵧall.filter(([experience_uid, experience]) => {
		return BookExperienceLib.isꓽaware(experience, state.defaultAccessLevel)
	})

	const result: ReturnType<typeof getꓽbookshelf> = booksⵧknown.map(([experience_uid, experience]) => {
		const { book_uid, last_user_investment_tms } = experience
		const cover = registry.getꓽPartialBook(book_uid)
		return {
			experience_uid,
			cover,
			access_level: BookExperienceLib.getꓽaccess_level(experience) ?? state.defaultAccessLevel,
			comprehension_level: BookExperienceLib.getꓽcomprehension_level(experience),
			stared_nodes_count: BookExperienceLib.getꓽstared_nodes_count(experience),
			is_root_starred: BookExperienceLib.isꓽroot_starred(experience),
			last_user_investment_tms,
		}
	}).sort(_sortBookshelfEntries)

	return result
}

/////////////////////////////////////////////////

async function ↆgetꓽpage(state: Immutable<BookStash>, experience_uid: BookExperienceUid, path: BookNodeReference | undefined = state.experiences[experience_uid]!.bookmark):
	Promise<[ Immutable<BookPage | ErrorText>, BookNodeReference ]> {

	throw new Error('NIMP!')
}

// TODO one day get page recto + verso (typical 2p display)

/////////////////////////////////////////////////

export {
	type BookshelfEntry,
	type ErrorText,

	getꓽbookshelf,
	ↆgetꓽpage,
}
