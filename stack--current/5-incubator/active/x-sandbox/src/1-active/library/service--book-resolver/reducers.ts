import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { Book, BookCover } from '../model--book/index.ts'

import type { State, BookResolver } from './types.ts'

/////////////////////////////////////////////////

function create(): Immutable<State> {
	return {
		entries: {},
	}
}

/** "Cover" because ideally only covers exist at startup. Anything else should be lazy loaded.
 * But this is not a hard requirement since a full book is a cover (extends)
 */
function registerꓽCover(state: Immutable<State>, cover: Immutable<BookCover>, ↆget: BookResolver): Immutable<State> {
	const { uid } = cover
	assert(!state.entries[uid], `Book entry "${uid}" should not be already registered!`)

	const book: Immutable<Book> = {
		...cover,
		parts: {
			...(cover as Book).parts, // in case a full book was passed
		},
	}

	return {
		...state,
		entries: {
			...state.entries,
			[uid]: {
				partial: book,
				ↆget,
			},
		},
	}
}

/////////////////////////////////////////////////

export {
	create,
	registerꓽCover,
}
