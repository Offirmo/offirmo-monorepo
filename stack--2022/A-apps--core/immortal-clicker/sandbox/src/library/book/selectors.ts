
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookPage, BookPart, PageReference, BookPartKey } from './types.js'
import { PAGE_REFERENCEⵧSEPARATOR } from './consts.js'
import { isꓽBookPart, isꓽPageⵧlike } from './types--guards.js'

/////////////////////////////////////////////////
// primitives

function _getꓽBookPart__part_keysⵧordered(book_part: Immutable<BookPart>): Array<BookPartKey> {
	const part__keys = Object.keys(book_part.parts)
	assert(part__keys.length >= 1, `_getꓽBookPart__part_keysⵧordered(): should have parts!`)

	return part__keys.sort()
}

function _getꓽBookPartKeyⵧresolved(book_part: Immutable<BookPart>, key: BookPartKey | undefined): BookPartKey {
	if (!key) {
		const part__keysⵧordered = _getꓽBookPart__part_keysⵧordered(book_part)
		return part__keysⵧordered[0]
	}

	// TODO allow special semantic keys, ex. first, last, etc.

	assert(!!book_part.parts[key], `_getꓽBookPartKeyⵧresolved(): BookPartKey "${key}" should be referencing a part!`)
	return key
}

function _getꓽBookPart__childⵧby_key(book_part: Immutable<BookPart>, key: BookPartKey): Immutable<BookPart['parts']['x']> {
	assert(!!book_part.parts[key], `_getꓽBookPart__childⵧby_key(): BookPartKey "${key}" should be referencing a part!`)
	return book_part.parts[key]
}

function _ensureꓽisꓽBookPage(page: Immutable<BookPage> | string): Immutable<BookPage> {
	assert(isꓽPageⵧlike(page), `_ensureꓽBookPage: should be page-like!`)

	if (typeof page === 'string')
		return { content: page } satisfies BookPage

	return page
}

/////////////////////////////////////////////////
// intermediate: chain

/*We need the full chain in order to:
 * - display the path, ex. "volume 1/3 » part 2/2 » page 2/23"
 * - compute the next page path
 */
interface BookPageReferenceChainStep {
	book_part: Immutable<BookPart>
	keysⵧallⵧordered: Array<BookPartKey>
	keyⵧselected: BookPartKey
}
interface BookPageReferenceChain {
	steps: Array<BookPageReferenceChainStep>

	page: Immutable<BookPage>
}

function _getꓽBookPageⵧchain(
	book_part: Immutable<BookPart>,
	page_ref: Immutable<BookPartKey[]>,
): BookPageReferenceChain {
	const keysⵧallⵧordered = _getꓽBookPart__part_keysⵧordered(book_part)
	const keyⵧselected = _getꓽBookPartKeyⵧresolved(book_part, page_ref[0])

	const chain_step: BookPageReferenceChainStep = {
		book_part,
		keysⵧallⵧordered,
		keyⵧselected,
	}

	const child = _getꓽBookPart__childⵧby_key(book_part, keyⵧselected)
	if (isꓽPageⵧlike(child)) {
		// end of the chain
		assert(page_ref.length <= 1, `_getꓽBookPageⵧchain: when reaching a page, the path should be empty!`)
		return {
			steps: [chain_step],
			page: _ensureꓽisꓽBookPage(child)
		}
	}

	// not the end, recurse
	const chain = _getꓽBookPageⵧchain(
		book_part,
		page_ref.slice(1),
	)

	return {
		steps: [chain_step, ...chain.steps],
		page: chain.page,
	}
}

function getꓽBookPageⵧchain(
	book: Immutable<Book>,
	page_ref: PageReference,
): BookPageReferenceChain {
	const pathⵧsplit = page_ref.split(PAGE_REFERENCEⵧSEPARATOR)

	return _getꓽBookPageⵧchain(book, pathⵧsplit)
}


/*
function _getꓽBookPartⵧpath(book_part: Immutable<BookPart>, path: string | string[]): Immutable<BookPart> | Immutable<BookPage> | string {

	const key = Array.isArray(path) ? path[0] : path

	const child_part = _getꓽBookPartⵧkey(book_part, key)

	if (path === key || path.length === 1)
		return child_part

	assert(isꓽBookPart(child_part), `_getꓽBookPartⵧpath() for sub-key "${key}" should be a BookPart!`)
	return _getꓽBookPartⵧpath(child_part, path.slice(1))
}*/


/*
function _getꓽBookPartsⵧby_path(book_part: Immutable<BookPart>, path: Array<BookPartKey | undefined>): Array<{
	part: Immutable<BookPart>,
	parts_count: number,
	next_key: BookPartKey,
	next_key_index: number,
	next_next_key: BookPartKey,
}> {
	const part__keys = Object.keys(book_part.parts).sort()
	const parts_count = part__keys.length
	assert(parts_count > 0, `_getꓽBookPartsⵧby_path(): should have parts!`)

	const next_key = (() => {
		if (!!path?.[0])
			return path[0]

		return part__keys[0]
	})()

	const entry = {
		part: book_part,
		next_key,
	}

	const next_part = _getꓽBookPart__childⵧby_key(book_part, next_key)
	if (isꓽPageⵧlike(next_part)) {
		// we're at the end of the chain
		assert(path.length <= 1, `_getꓽBookPartsⵧby_path(): path is >=1 yet we reached a page!`)
		return [
			entry
		]
	}

	assert(isꓽBookPart(next_part), `_getꓽBookPartsⵧby_path() for sub-key "${next_key}" should be a BookPart!`)
	return [
		entry,
		..._getꓽBookPartsⵧby_path(next_part, path.slice(1)),
	]
}
*/



/////////////////////////////////////////////////

function getꓽBookPage(
	book: Immutable<Book>,
	page_ref: PageReference,
): Immutable<BookPage> {
	const chain = getꓽBookPageⵧchain(book, page_ref)
	return chain.page
}

/////////////////////////////////////////////////

export {
	getꓽBookPage,
	getꓽBookPageⵧchain,
}
