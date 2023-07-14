import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Page, BookPart, Book } from './types.js'

/////////////////////////////////////////////////

function isꓽPage(x: Immutable<any>): x is Page {
	return typeof x?.content === 'string'
}

function isꓽBookPart(x: Immutable<any>): x is BookPart {
	return !!x && x.hasOwnProperty('parts') && Object.getPrototypeOf(x.parts).constructor?.name === 'Object'
}

function isꓽBook(x: Immutable<any>): x is Book {
	return typeof x?.title === 'string' && isꓽBookPart(x)
}

/////////////////////////////////////////////////

export {
	isꓽPage,
	isꓽBookPart,
	isꓽBook,
}
