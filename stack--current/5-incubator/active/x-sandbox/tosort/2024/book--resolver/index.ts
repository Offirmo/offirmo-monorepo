import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

import { Book, BookPageReference } from '../../../src/1-active/library/book/l1-types/types.ts'
import { BookResolverEntry, BookResolversIndex } from './types.ts'

import {
	getꓽBookCover as _getꓽBookCover,
	ↆgetꓽBook as _ↆgetꓽBook,
} from './selectors.ts'

import {
	create,
	registerꓽBook as _registerꓽBook,
} from './reducers.ts'
import { BookCover, BookUId } from '../../../src/1-active/library/book/l1-types/types.ts'

/////////////////////////////////////////////////

let indexⵧdefault = create()

function getꓽdefault(): Immutable<BookResolversIndex> {
	return indexⵧdefault
}

/////////////////////////////////////////////////

function registerꓽBook(entry: Immutable<BookResolverEntry>, index: Immutable<BookResolversIndex> = indexⵧdefault): Immutable<BookResolversIndex> {
	const indexⵧmutated = _registerꓽBook(index, entry)

	if (index === indexⵧdefault)
		indexⵧdefault = indexⵧmutated

	return indexⵧmutated
}

/////////////////////////////////////////////////

function getꓽBookCover(uid: Immutable<BookUId>, index: Immutable<BookResolversIndex> = indexⵧdefault): Immutable<BookCover> {
	return _getꓽBookCover(index, uid)
}

async function ↆgetꓽBook(uid: Immutable<BookUId>, path?: BookPageReference, index: Immutable<BookResolversIndex> = indexⵧdefault): Promise<Immutable<Book>> {
	return _ↆgetꓽBook(index, uid, path)
}

/////////////////////////////////////////////////

export * from './types.ts'
export {
	create,
	registerꓽBook,

	getꓽBookCover,
	ↆgetꓽBook,

	getꓽdefault,
}
