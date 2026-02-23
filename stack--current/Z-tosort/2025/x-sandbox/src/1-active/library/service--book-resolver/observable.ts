import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////

import type { Book, BookUId, BookCover, BookPageReference } from '../model--book/index.ts'
import type { BookResolver } from './types.ts'

import * as Selectors from './selectors.ts'
import * as Reducers from './reducers.ts'

/////////////////////////////////////////////////


class BookRegistry {
	#state = Reducers.create()

	registerꓽCover(cover: Immutable<BookCover>, ↆget: BookResolver): void {
		this.#state = Reducers.registerꓽCover(this.#state, cover, ↆget)
	}

	getꓽPartialBook(uid: BookUId): Immutable<Book> {
		return Selectors.getꓽPartialBook(this.#state, uid)
	}

	async ↆgetꓽMoreCompleteBook(uid: BookUId, page_ref?: BookPageReference): Promise<Immutable<Book>> {
		return Selectors.ↆgetꓽMoreCompleteBook(this.#state, uid, page_ref)
	}
}

/////////////////////////////////////////////////

export {
	BookRegistry,
}
