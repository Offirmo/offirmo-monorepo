import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import type { Text, Book, BookPart, BookPage, BookNodeReference, BookPartKey } from './types/types.ts'
import { isꓽBookCover, isꓽPageⵧlike } from './types/types-guards.ts'
import { promote_toꓽBookPage } from './types/normalizers.ts'

import { NODE_REFERENCEⵧSEPARATOR, NODE_REFERENCEꘌROOT } from './consts.ts'

/////////////////////////////////////////////////

interface PageResult {

	// 1. core result
	content: Immutable<BookPage>

	// 2a. top priority result -- for display
	// to display where we are, ex "Book X > Chapter X > Page N out of M"
	breadcrumbs: Array<Immutable<Text>>
	part_type: BookPart['parts_type']
	relative_index‿human: number
	group_count: number

	// 2b. top priority result -- for overall navigation
	referenceⵧcurrent: BookNodeReference // important to mark the page as read / star / bookmark it
	referenceⵧnextⵧin_tree: BookNodeReference // can = current if current is last
	referenceⵧpreviousⵧin_tree: BookNodeReference // can = current if current is first

	// 3a. secondary result -- for display
	// for simulating double-sided printing, we return previous and next page IN CURRENT GROUP
	// (TODO if none, return blank?)
	// TODO one day
	//contentⵧprevious: Immutable<BookPage> | null // if null, means there is no previous, we are the first
	//contentⵧnext: Immutable<BookPage> | null // if null, means there is no next, we are the last

	// 3b. secondary result -- for navigation
	// for classic pagination first / prev / current / next / last INSIDE CURRENT GROUP
	// TODO one day
	//referenceⵧfirstⵧin_group: BookNodeReference // can = current if current is first
	//referenceⵧpreviousⵧin_group: BookNodeReference // can = current if current is first
	//referenceⵧnextⵧin_group: BookNodeReference // can = current if current is last
	//referenceⵧlastⵧin_group: BookNodeReference // can = current if current is last
	//referenceⵧup: BookNodeReference

	// more hint for visual display
	// TODO one day
	//direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
	//medium?: 'sheet' | 'scroll' | 'screen'
}

function _get_breadcrumb_entry(book_part : Immutable<BookPart>, parents: Immutable<BookPart[]>, key?: BookPartKey): string {
	const emoji = [...parents, book_part]
		.toReversed()
		.reduce((acc, book_part) => {
			return acc || book_part.hints?.emoji

		}, undefined as (string | undefined)) || '📖'

	const title = RichText.renderⵧto_text(book_part.title || '').trim()

	const pagination = (() => {
		if (parents.length === 0) {
			// we're root, no pagination
			return ''
		}

		assert(key, `if parent, need the key!`)

		throw new Error(`Not implemented!`)
		//return `${book_part.parts_type || 'part'} ${key} of ${Object.keys(book_part.parts).length}`
	})()

	return [
			emoji,
			pagination,
			title,
		]
		.filter(s => !!s)
		.join(' ')
}

function _get_page_from_part_cover(book_part: Immutable<BookPart>, parent: Immutable<BookPart> | undefined): BookPage {
	const builder = RichText.fragmentⵧblock()

	if (parent) {
		builder.pushBlockFragment(
			RichText.strong(`${parent.parts_type || 'part'} ${Object.values(parent.parts).indexOf(book_part) + 1}`).done(),
			{ id: 'part_id' },
		)
	}

	if (!book_part.title) {
		if (!parent) {
			// no title and no parent? That's not possible
			assert(isꓽBookCover(book_part), `Book part is root, thus a cover, thus should have a title!`)
		}
	}
	else {
		builder.pushHeading(book_part.title, { id: 'title' })
	}


	if (book_part.subtitles?.length) {
		builder.pushBlockFragment(
				RichText.strong(book_part.subtitles?.[0]!).done(),
				{ id: 'subtitle' },
			)
	}

	if (book_part.blurb) {
		builder.pushBlockFragment(book_part.blurb, { id: 'blurb' })
	}

	if (book_part.author) {
		builder.pushBlockFragment(
			RichText.em(book_part.author).done(),
			{ id: 'author' },
		)
	}

	return {
		content: builder.done(),
	}
}

//const NODE_REFERENCEꘌCLOSEST_COVER = '⟦cover⟧'

function getꓽpage(book: Immutable<Book>, path: BookNodeReference = NODE_REFERENCEꘌROOT): PageResult {
	// assert isꓽBook

	const path__segments‿split = path.split(NODE_REFERENCEⵧSEPARATOR)
		.filter(segment => !!segment) // empty can happen at beginning and end, useless
	if (path__segments‿split[0] === NODE_REFERENCEꘌROOT)
		path__segments‿split.shift() // this is not a real segment

	const result: PageResult = {

		// 1. core result
		content: { content: '[in progress...]' },

		// 2a. top priority result -- for display
		// to display where we are, ex "Book X > Chapter X > Page N out of M"
		breadcrumbs: [
			//_get_breadcrumb_entry(book, [])
		],
		part_type: 'page', // so far
		relative_index‿human: -1, // so far
		group_count: -1, // so far

		// 2b. top priority result -- for overall navigation
		referenceⵧcurrent: '', // important to mark the page as read / star / bookmark it
		referenceⵧnextⵧin_tree: '', // can = current if current is last
		referenceⵧpreviousⵧin_tree: '', // can = current if current is first

		// 3a. secondary result -- for display
		// for simulating double-sided printing, we return previous and next page IN CURRENT GROUP
		// cf. https://en.wikipedia.org/wiki/Recto_and_verso
		// (TODO if none, return blank?)
		// TODO one day
		//contentⵧprevious: Immutable<BookPage> | null // if null, means there is no previous, we are the first
		//contentⵧnext: Immutable<BookPage> | null // if null, means there is no next, we are the last

		// 3b. secondary result -- for navigation
		// for classic pagination first / prev / current / next / last INSIDE CURRENT GROUP
		// TODO one day
		//referenceⵧfirstⵧin_group: BookNodeReference // can = current if current is first
		//referenceⵧpreviousⵧin_group: BookNodeReference // can = current if current is first
		//referenceⵧnextⵧin_group: BookNodeReference // can = current if current is last
		//referenceⵧlastⵧin_group: BookNodeReference // can = current if current is last
		//referenceⵧup: BookNodeReference

		// more hint for visual display
		// TODO one day
		//direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
		//medium?: 'sheet' | 'scroll' | 'screen'
	}

	let parent_parts_chain: Array<Immutable<BookPart>> = []
	const referenceⵧfirst‿split: BookPartKey[] = []
	const referenceⵧprevious‿split: BookPartKey[] = []
	const referenceⵧcurrent‿split: BookPartKey[] = []
	const referenceⵧnext‿split: BookPartKey[] = []
	const referenceⵧlast‿split: BookPartKey[] = []
	const referenceⵧup‿split: BookPartKey[] = []

	let book_part: Immutable<BookPart> = book
	do {
		const { parts } = book_part
		assert(!!parts, `tree walk expecting a BookPart!`)

		const parent = parent_parts_chain[parent_parts_chain.length - 1]

		const parts_keys: Array<BookPartKey> = Object.keys(parts)
			// .sort() TODO one day sort intelligently alphanum

		if (parts_keys.length === 0) {
			throw new Error('NIMP')
		}

		const parts_keyⵧfirst: BookPartKey = parts_keys[0]!
		const parts_keyⵧlast: BookPartKey = parts_keys[parts_keys.length - 1]!
		const parts_keyⵧcurrentⵧraw: BookPartKey | undefined = path__segments‿split.shift()
		if (!parts_keyⵧcurrentⵧraw) {
			// normal, no path = happens when we start reading the book/part

			// 1.
			result.content = _get_page_from_part_cover(book_part, parent)

			// 2a.
			result.breadcrumbs.push(_get_breadcrumb_entry(book_part, parent_parts_chain))
			result.part_type = parent?.parts_type || 'book'
			result.relative_index‿human = 0 // means "cover"
			result.group_count = parts_keys.length

			// 2b.
			result.referenceⵧcurrent = [ ...referenceⵧcurrent‿split ].join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧnextⵧin_tree = ((): BookPartKey[] => {
				if (parts_keys.length) {
					return [ ...referenceⵧnext‿split, parts_keys[0]! ]
				}

				let depth = parent_parts_chain.length
				while (depth > 0) {
					// go up
					depth--
					throw new Error('NIMP')
				}

				return [ NODE_REFERENCEꘌROOT ]
			})().join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧpreviousⵧin_tree = ((): BookPartKey[] => {
				let depth = parent_parts_chain.length
				while (depth > 0) {
					// go up
					depth--
					throw new Error('NIMP')
				}

				return [ NODE_REFERENCEꘌROOT ]
			})().join(NODE_REFERENCEⵧSEPARATOR)

			return result
		}

		let parts_keyⵧcurrent: BookPartKey = parts_keyⵧcurrentⵧraw || parts_keyⵧfirst
		let indexⵧcurrent = parts_keys.indexOf(parts_keyⵧcurrent)
		if (indexⵧcurrent === -1) {
			// should not happen,
			// but may happen if a book is updated and its tree changes. Should not crash.
			console.warn(`BookPartKey "${parts_keyⵧcurrent}" not found in the book tree, falling back to "first" instead.`, { book, book_part, parts_keys, part_keyⵧcurrentⵧraw: parts_keyⵧcurrentⵧraw })
			parts_keyⵧcurrent = parts_keyⵧfirst
			indexⵧcurrent = 0
		}

		// are we actually pointing to a book part cover?
		if (parts_keyⵧcurrent === parts_keyⵧfirst && parent_parts_chain.length > 0 && parts_keyⵧcurrentⵧraw !== parts_keyⵧfirst) {
			// yes, the user didn't explicitly ask for "first" (we defaulted to it)
			// it should be better to display the bookpart cover
			throw new Error('NIMP')
		}

		result.breadcrumbs.push(_get_breadcrumb_entry(book_part, parent_parts_chain, parts_keyⵧcurrent))

		// did we reach a leaf?
		const content = parts[parts_keyⵧcurrent]
		if (isꓽPageⵧlike(content)) {
			// yes! hurray!

			// let's shuffle things around
			if (parts_keyⵧcurrent === parts_keyⵧfirst) {
				if (parent_parts_chain.length > 0) {
					// previous & first are actually the BookPart cover = ~ autogenerated page
					throw new Error('NIMP')
				}
			}
			if (parts_keyⵧcurrent === parts_keyⵧlast) {
				if (parent_parts_chain.length > 0) {
					// next is the next part cover, if any
					throw new Error('NIMP')
				}
			}

			// 1.
			result.content = promote_toꓽBookPage(content)

			// 2a.
			//result.breadcrumbs.push(xxx)
			result.part_type = book_part.parts_type || 'page'
			result.relative_index‿human = indexⵧcurrent + 1
			result.group_count = parts_keys.length

			// 2b.
			result.referenceⵧcurrent = [ ...referenceⵧcurrent‿split, parts_keyⵧcurrent ].join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧnextⵧin_tree = ((): BookPartKey[] => {
				if (indexⵧcurrent < parts_keys.length - 1) {
					return [ ...referenceⵧnext‿split, parts_keys[indexⵧcurrent + 1]! ]
				}

				let depth = parent_parts_chain.length
				while (depth > 0) {
					// go up
					depth--
					throw new Error('NIMP')
				}

				// there is no next
				return [ NODE_REFERENCEꘌROOT ]
			})().join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧpreviousⵧin_tree = ((): BookPartKey[] => {
				if (indexⵧcurrent > 0) {
					return [ ...referenceⵧprevious‿split, parts_keys[indexⵧcurrent - 1]! ]
				}

				let depth = parent_parts_chain.length
				while (depth > 0) {
					// go up
					depth--
					throw new Error('NIMP')
				}

				return [ NODE_REFERENCEꘌROOT ]
			})().join(NODE_REFERENCEⵧSEPARATOR)

			/*
			result.contentⵧprevious = (indexⵧcurrent > 0)
				? promote_toꓽBookPage(parts[parts_keys[indexⵧcurrent - 1]!]!) // TODO XXX check if proper page!!
				: null
			result.contentⵧnext = (indexⵧcurrent < parts_keys.length - 1)
				? promote_toꓽBookPage(parts[parts_keys[indexⵧcurrent + 1]!]!) // TODO XXX check if proper page!!
				: null

			result.referenceⵧfirst = referenceⵧfirst‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧprevious = referenceⵧprevious‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧnext = referenceⵧnext‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧlast = referenceⵧlast‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧup = referenceⵧup‿split.join(NODE_REFERENCEⵧSEPARATOR)
			*/

			return result
		}

		// did we reach a pseudo-leaf?
		if (path__segments‿split.length === 0) {
			// we should display the cover if any
			if (parent_parts_chain.length > 0) {
				// yes, there is a book part cover
				throw new Error('NIMP')
			}
			else {
				// there is no cover to display
				// we must be at the root of a 1-level deep book
				throw new Error('NIMP')
			}
		}

		// we did not reach a leaf or pseudo-leaf
		// let's go deeper
		referenceⵧfirst‿split.push(parts_keyⵧcurrent)
		referenceⵧprevious‿split.push(parts_keyⵧcurrent)
		referenceⵧcurrent‿split.push(parts_keyⵧcurrent)
		referenceⵧnext‿split.push(parts_keyⵧcurrent)
		referenceⵧlast‿split.push(parts_keyⵧcurrent)
		referenceⵧup‿split.push(parts_keyⵧcurrent)

		parent_parts_chain.push(book_part)
		book_part = parts[parts_keyⵧcurrent]! as Immutable<BookPart>
	} while (false)

	throw new Error('NIMP')
}

// TODO book linting
/*
go over all the pages and check it works and coherent
number of pages
ordered keys
trimmed & unicode everywhere
 */
/////////////////////////////////////////////////

export {
	type PageResult,
	getꓽpage,
}
