import { Immutable } from '@offirmo-private/ts-types'

import { Page, BookPart, Book } from './types.js'

/////////////////////////////////////////////////

function isꓽPage(x: Immutable<any>): x is Page {
	return typeof x?.content === 'string'
}
function isꓽPageⵧlike(x: Immutable<any>): x is Page | string {
	return isꓽPage(x) || typeof x === 'string'
}

function isꓽBookPart(x: Immutable<any>): x is BookPart {
	return !!x && x.hasOwnProperty('parts') && Object.getPrototypeOf(x.parts).constructor?.name === 'Object'
}

function isꓽBook(x: Immutable<any>): x is Book {
	return typeof x?.title === 'string'
		&& typeof x?.uuid === 'string'
		&& isꓽBookPart(x)
}

/////////////////////////////////////////////////

export {
	isꓽPage,
	isꓽPageⵧlike,
	isꓽBookPart,
	isꓽBook,
}
