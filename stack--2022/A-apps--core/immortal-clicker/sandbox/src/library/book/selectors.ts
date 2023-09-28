
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Book, BookPage, BookPart, PageReference } from './types.js'
import { PAGE_REFERENCEⵧSEPARATOR } from './consts.js'
import { isꓽBookPart, isꓽPageⵧlike } from './types--guards.js'

/////////////////////////////////////////////////

function _getꓽBookPartⵧkey(book_part: Immutable<BookPart>, key: string): Immutable<BookPart> | Immutable<BookPage> | string {

	const part_keys = Object.keys(book_part.parts).sort()

	switch(key) {
		case '': {
			assert(part_keys.length >= 1, `_getꓽBookPart: should have parts!`)
			return book_part.parts[part_keys[0]]
		}
		default: {
			assert(part_keys.includes(key), `_getꓽBookPart: key "${key}" should be referencing a part!`)
			return book_part.parts[key]
		}
	}
}


function _getꓽBookPartⵧpath(book_part: Immutable<BookPart>, path: string | string[]): Immutable<BookPart> | Immutable<BookPage> | string {

	const key = Array.isArray(path) ? path[0] : path

	const child_part = _getꓽBookPartⵧkey(book_part, key)

	if (path === key || path.length === 1)
		return child_part

	assert(isꓽBookPart(child_part), `_getꓽBookPartⵧpath() for sub-key "${key}" should be a BookPart!`)
	return _getꓽBookPartⵧpath(child_part, path.slice(1))
}


function _ensureꓽisꓽBookPage(page: Immutable<BookPage> | string): Immutable<BookPage> {
	assert(isꓽPageⵧlike(page), `_ensureꓽBookPage: should be page-like!`)

	if (typeof page === 'string')
		return { content: page } satisfies BookPage

	return page
}

/////////////////////////////////////////////////

function getꓽBookPage(
	book: Immutable<Book>,
	page_ref: PageReference,
): Immutable<BookPage> {

	const pathⵧsplit = page_ref.split(PAGE_REFERENCEⵧSEPARATOR)

	switch(page_ref) {
		default: {
			const path_target = _getꓽBookPartⵧpath(book, pathⵧsplit)
			assert(isꓽPageⵧlike(path_target), `getꓽBookPage(): path target should be page-like!`)
			return _ensureꓽisꓽBookPage(path_target)
		}
	}
}

/////////////////////////////////////////////////

export {
	getꓽBookPage,
}
