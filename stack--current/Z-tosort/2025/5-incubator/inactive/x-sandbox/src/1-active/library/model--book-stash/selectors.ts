import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import type { WithLastUserInvestmentTimestamp } from '@offirmo-private/state-utils'

import type { BookCover, BookNodeReference, PageResult, BookPageReference, Text } from '../model--book/index.ts'
import { getꓽpage } from '../model--book/index.ts'

import * as BookExperienceLib from '../model--book-experience/index.ts'

import type { BookStash, BookExperienceUid } from './types.ts'

import { registry } from '../service--book-resolver/index.ts'
import { type ComprehensionLevel, getꓽaccess_levelⵧinherited } from '../model--book-experience/index.ts'

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
		return BookExperienceLib.isꓽawareⵧinherited(experience, BookExperienceLib.NODE_REFERENCEꘌROOT, state.defaultAccessLevel)
	})

	const result: ReturnType<typeof getꓽbookshelf> = booksⵧknown.map(([experience_uid, experience]) => {
		const { book_uid, last_user_investment_tms } = experience
		const cover = registry.getꓽPartialBook(book_uid)
		return {
			experience_uid,
			cover,
			access_level: BookExperienceLib.getꓽaccess_levelⵧinherited(experience, BookExperienceLib.NODE_REFERENCEꘌROOT) ?? state.defaultAccessLevel,
			comprehension_level: BookExperienceLib.getꓽcomprehension_levelⵧinherited(experience, BookExperienceLib.NODE_REFERENCEꘌROOT),
			stared_nodes_count: BookExperienceLib.getꓽstarred_nodes_count(experience),
			is_root_starred: BookExperienceLib.isꓽstarredⵧexact(experience, BookExperienceLib.NODE_REFERENCEꘌROOT),
			last_user_investment_tms,
		}
	}).sort(_sortBookshelfEntries)

	return result
}

/////////////////////////////////////////////////

async function ↆgetꓽpage(state: Immutable<BookStash>, experience_uid: BookExperienceUid, path: BookNodeReference | undefined = state.experiences[experience_uid]!.bookmark): Promise<PageResult> {
	const experience = state.experiences[experience_uid]
	assert(experience, `BookStash.ↆgetꓽpage(): Experience "${experience_uid}" should exist!`)
	const { book_uid } = experience

	const reference: BookPageReference = path ?? BookExperienceLib.NODE_REFERENCEꘌROOT

	const access_level = BookExperienceLib.getꓽaccess_levelⵧinherited(experience, reference) || state.defaultAccessLevel
	assert(access_level === 'accessⵧyes', `BookStash.ↆgetꓽpage(): Cannot get page from experience "${experience_uid}" because no access!`) // should have been prevented by the caller

	const comprehension_level = BookExperienceLib.getꓽcomprehension_levelⵧinherited(experience, reference)
	switch (comprehension_level) {
		case undefined:
			// TODO one day when implementing advanced in-universe modes
			break

		case 'abstaining':
			throw new Error(`BookStash.ↆgetꓽpage(): Cannot get page from experience "${experience_uid}" because abstaining!`) // should have been prevented by the caller

		case 'viewedⵧblocked':
			// TODO one day when implementing advanced in-universe modes
			throw new Error(`"viewedⵧblocked" Not implemented!`)

		case 'understoodⵧpartially':
		case 'understoodⵧsuperficially':
		case 'understood':
		case 'understoodⵧthoroughly':
		case 'understoodⵧcritically':
			// ok
			break

		default:
			throw new Error(`Not implemented!`)
	}

	const book = await registry.ↆgetꓽMoreCompleteBook(book_uid, reference)

	return getꓽpage(book, reference)
}

/////////////////////////////////////////////////

export {
	type BookshelfEntry,
	type ErrorText,

	getꓽbookshelf,

	type PageResult,
	ↆgetꓽpage,
}
