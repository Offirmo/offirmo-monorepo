import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { BookResolverEntry, BookResolversIndex } from './types.js'


/////////////////////////////////////////////////

function create(): Immutable<BookResolversIndex> {
	return {
		entries: {},
	}
}

function registerꓽBook(state: Immutable<BookResolversIndex>, entry: Immutable<BookResolverEntry>): Immutable<BookResolversIndex> {
	const { uid, cover, ↆget} = entry
	assert(!state.entries[uid], `Book entry "${uid}" should not be already registered!`)

	return {
		...state,
		entries: {
			...state.entries,
			[uid]: {
				book: cover,
				ↆget,
			},
		},
	}
}



/////////////////////////////////////////////////

export {
	create,
	registerꓽBook,
}
