import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { BookPage, BookPageLike } from './types.ts'
import { isꓽPage, isꓽPageⵧlike } from './types-guards.ts'

/////////////////////////////////////////////////

function promote_toꓽBookPage(page: Immutable<BookPageLike>): Immutable<BookPage> {
	assert(isꓽPageⵧlike(page), `_ensureꓽBookPage: should be page-like!`)

	if (isꓽPage(page))
		return page

	return { content: page } satisfies BookPage
}

/////////////////////////////////////////////////

export {
	promote_toꓽBookPage,
}
