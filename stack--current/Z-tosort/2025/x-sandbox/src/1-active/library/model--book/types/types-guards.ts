import type { Immutable } from '@monorepo-private/ts--types'
import { isꓽobjectⵧliteral } from '@monorepo-private/type-detection'
import { isꓽNode } from '@monorepo-private/rich-text-format'

import type { Text, BookPage, BookPageLike, BookPart, Book, BookCover } from './types.ts'

/////////////////////////////////////////////////

function isꓽPage(x: Immutable<any>): x is BookPage {
	if (!Object.hasOwn(x, 'content'))
		return false

	if (isꓽNode(x.content))
		return true

	return typeof x.content === 'string'
}
function isꓽPageⵧlike(x: Immutable<any>): x is BookPageLike {
	return isꓽPage(x) || isꓽNode(x) || (typeof x === 'string')
}

function isꓽBookPart(x: Immutable<any>): x is BookPart {
	return !!x && isꓽobjectⵧliteral(x) && Object.hasOwn(x, 'parts')
}

function isꓽBookCover(x: Immutable<any>): x is BookCover {
	const has_type = typeof x?.title === 'string'
	if (!has_type)
		return false

	const has_shape = !!x.title
	if (!has_shape)
		return false

	return true
}

function isꓽBook(x: Immutable<any>): x is Book {
	if (!isꓽBookCover(x))
		return false

	if (!isꓽBookPart(x))
		return false

	if (typeof (x as any).uid !== 'string')
		return false

	return true
}

/////////////////////////////////////////////////

export {
	isꓽPage,
	isꓽPageⵧlike,
	isꓽBookPart,
	isꓽBookCover,
	isꓽBook,
}
