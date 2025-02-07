import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { type BookUId } from '../model--book/index.ts'
import * as BookStashLib from '../model--book-stash/index.ts'

/////////////////////////////////////////////////

function renderꓽBookStash(
	state: Immutable<BookStashLib.BookStash>,
): RichText.Node {
	throw new Error('NIMP!')
	/*
	const list = RichText.listⵧunordered()

	const uids = Object.keys(state.books).sort()
	uids.forEach((uid: BookUId) => {
		list.pushKeyValue(uid, "[TODO]")
	})

	return RichText.fragmentⵧblock()
		.pushNode(list.done())
		.done()
		*/
}

/////////////////////////////////////////////////

export {
	renderꓽBookStash,
}
