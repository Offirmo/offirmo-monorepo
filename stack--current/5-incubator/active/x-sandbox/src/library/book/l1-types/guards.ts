import { type Immutable } from '@offirmo-private/ts-types'

import { BookPage, BookPart, Book, BookCover } from './types.ts'

/////////////////////////////////////////////////

function isꓽPage(x: Immutable<any>): x is BookPage {
	return typeof x?.content === 'string'
}
function isꓽPageⵧlike(x: Immutable<any>): x is BookPage | string {
	return isꓽPage(x) || typeof x === 'string'
}

function isꓽBookPart(x: Immutable<any>): x is BookPart {
	return !!x && x.hasOwnProperty('parts') && Object.getPrototypeOf(x.parts).constructor?.name === 'Object'
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

	// TODO report TS error
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
