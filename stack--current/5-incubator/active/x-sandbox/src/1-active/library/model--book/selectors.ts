import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { Text, Book, BookPart, BookPage, BookNodeReference, BookPartKey } from './types/types.ts'
import { isꓽPageⵧlike } from './types/types-guards.ts'
import { promote_toꓽBookPage } from './types/normalizers.ts'

import { NODE_REFERENCEⵧSEPARATOR, NODE_REFERENCEꘌROOT } from './consts.ts'

/////////////////////////////////////////////////

interface PageResult {
	// it's convenient to return prev & next, esp. for 2 pages display
	// only the pages from the current part will be returned, NOT pages from the previous or next parent part
	contentⵧprevious: Immutable<BookPage> | null // if null, means there is no previous, we are the first
	content: Immutable<BookPage>
	contentⵧnext: Immutable<BookPage> | null // if null, means there is no next, we are the last

	// references, for navigation
	// relative to current level
	referenceⵧfirst: BookNodeReference // can = current if current is first
	referenceⵧprevious: BookNodeReference // can = current if current is first
	referenceⵧcurrent: BookNodeReference
	referenceⵧnext: BookNodeReference // can = current if current is last
	referenceⵧlast: BookNodeReference // can = current if current is last
	referenceⵧup: BookNodeReference

	// for nice visual display
	breadcrumbs: Array<Immutable<Text>>
	part_type: BookPart['parts_type']
	relative_index‿human: number

	// hint for visual display
	direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
	medium?: 'sheet' | 'scroll' | 'screen'
	physical_sheet_side?: 'recto' | 'verso'
}

function _get_breadcrumb_entry(book_part : Immutable<BookPart>, key: BookPartKey): string {
	return `${book_part.parts_type || 'part'} ${key}`
}


function _get_page_from_part_cover(book_part: Immutable<BookPart>, parent: Immutable<BookPart>): BookPage {
	return {
		content: 'TODO _get_page_from_part_cover',
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
		contentⵧprevious: null,
		content: null as any, // will set below
		contentⵧnext: null,

		// references, for navigation
		// relative to current level
		referenceⵧfirst: NODE_REFERENCEꘌROOT,
		referenceⵧprevious: NODE_REFERENCEꘌROOT,
		referenceⵧcurrent: NODE_REFERENCEꘌROOT,
		referenceⵧnext: NODE_REFERENCEꘌROOT,
		referenceⵧlast: NODE_REFERENCEꘌROOT,
		referenceⵧup: NODE_REFERENCEꘌROOT,

		part_type: 'page',
		relative_index‿human: -1,

		breadcrumbs: [
			book.title,
		],
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
		if (!parts) {
			throw new Error('NIMP')
		}
		const parts_keys: Array<BookPartKey> = Object.keys(parts)
			// .sort() TODO one day sort intelligently alphanum
		if (parts_keys.length === 0) {
			throw new Error('NIMP')
		}
		const parts_keyⵧfirst: BookPartKey = parts_keys[0]!
		const parts_keyⵧlast: BookPartKey = parts_keys[parts_keys.length - 1]!
		const parts_keyⵧcurrentⵧraw: BookPartKey | undefined = path__segments‿split.shift()
		if (!parts_keyⵧcurrentⵧraw) {
			// normal, happens when we start reading the book
		}
		let parts_keyⵧcurrent: BookPartKey = parts_keyⵧcurrentⵧraw || parts_keyⵧfirst
		let indexⵧcurrent = parts_keys.indexOf(parts_keyⵧcurrent)
		if (indexⵧcurrent === -1) {
			// should not happen,
			// but may happen if a book is updated and its tree changes. Should not crash.
			console.warn(`BookPartKey not found in the book tree, using "first" instead.`, { book, book_part, parts_keys, part_keyⵧcurrentⵧraw: parts_keyⵧcurrentⵧraw })
			parts_keyⵧcurrent = parts_keyⵧfirst
			indexⵧcurrent = 0
		}

		// are we actually pointing to a book part cover?
		if (parts_keyⵧcurrent === parts_keyⵧfirst && parent_parts_chain.length > 0 && parts_keyⵧcurrentⵧraw !== parts_keyⵧfirst) {
			// yes, the user didn't explicitly asked for "first" (we defaulted to it)
			// it should be better to display the bokpart cover
			throw new Error('NIMP')
		}

		// did we reach a leaf?
		const content = parts[parts_keyⵧcurrent]
		if (isꓽPageⵧlike(content)) {
			let parts_keyⵧprevious: BookPartKey | null = null
			let parts_keyⵧnext: BookPartKey | null = null

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

			result.content = promote_toꓽBookPage(content)
			result.contentⵧprevious = (indexⵧcurrent > 0)
				? promote_toꓽBookPage(parts[parts_keys[indexⵧcurrent - 1]!]!) // TODO XXX check if proper page!!
				: null
			result.contentⵧnext = (indexⵧcurrent < parts_keys.length - 1)
				? promote_toꓽBookPage(parts[parts_keys[indexⵧcurrent + 1]!]!) // TODO XXX check if proper page!!
				: null

			result.referenceⵧfirst = referenceⵧfirst‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧprevious = referenceⵧprevious‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧcurrent = referenceⵧcurrent‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧnext = referenceⵧnext‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧlast = referenceⵧlast‿split.join(NODE_REFERENCEⵧSEPARATOR)
			result.referenceⵧup = referenceⵧup‿split.join(NODE_REFERENCEⵧSEPARATOR)

			result.part_type = book_part.parts_type || 'page'
			result.relative_index‿human = indexⵧcurrent + 1

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
		result.breadcrumbs.push(_get_breadcrumb_entry(book_part, parts_keyⵧcurrent))
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
