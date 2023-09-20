import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

import { BookResolverEntry, BookResolversIndex } from './types.js'

import {

} from './selectors.js'

import {
	create,
	registerꓽBook as _registerꓽBook,
} from './reducers.js'

/////////////////////////////////////////////////

let indexⵧdefault = create()

function getꓽdefault(): Immutable<BookResolversIndex> {
	return indexⵧdefault
}

function registerꓽBook(entry: Immutable<BookResolverEntry>, index: Immutable<BookResolversIndex> = indexⵧdefault): Immutable<BookResolversIndex> {
	return _registerꓽBook(index, entry)
}

/////////////////////////////////////////////////

export * from './types.js'
export {
	create,
	registerꓽBook,

	getꓽdefault,
}
