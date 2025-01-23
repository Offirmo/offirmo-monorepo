import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { BookUId } from '../book/l1-types/types.ts'
import * as BookResolverLib from '../book--resolver'
import * as BookStashLib from './index.ts'

/////////////////////////////////////////////////

function renderꓽBookStash(
	state: Immutable<BookStashLib.BookStash>,
	options: {} = {
		resolver: BookResolverLib.getꓽdefault(), // TODO REVIEW should be done by caller?
	},
): RichText.Node {

	const list = RichText.listⵧunordered()

	const uids = Object.keys(state.books).sort()
	uids.forEach((uid: BookUId) => {
		list.pushKeyValue(uid, "[TODO]")
	})

	return RichText.fragmentⵧblock()
		.pushNode(list.done())
		.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookStash,
}
