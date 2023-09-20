import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'
import { BookStash } from '../state--book-stash/types.js'
import { BookUId } from '../book/types.js'
import { BookResolversIndex, getꓽdefault } from '../book-resolver/index.js'

/////////////////////////////////////////////////

function renderꓽBookStash(state: Immutable<BookStash>, options: {} = {
	resolver: getꓽdefault(),
}): RichText.Node {

	const list = RichText.listⵧunordered()

	const uids = Object.keys(state.books).sort()
	uids.forEach((uid: BookUId) => {
		list.pushKeyValue(uid, "TODO")
	})

	return RichText.fragmentⵧblock()
		.pushNode(list.done())
		.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookStash,
}
