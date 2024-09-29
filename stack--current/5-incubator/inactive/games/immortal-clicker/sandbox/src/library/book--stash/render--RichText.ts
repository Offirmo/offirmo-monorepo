import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { BookUId } from '../book/types.js'
import * as BookResolverLib from '../book--resolver/index.js'
import * as BookStashLib from './index.js'

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
