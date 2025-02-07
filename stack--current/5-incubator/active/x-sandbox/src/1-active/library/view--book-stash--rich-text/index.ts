import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { type BookCover, type BookUId } from '../model--book/index.ts'
import * as BookStashLib from '../model--book-stash/index.ts'
import { renderꓽcover__spine } from '../view--book--rich-text/index.ts'
import { getꓽbookshelf } from '../model--book-stash/index.ts'

/////////////////////////////////////////////////

function renderꓽbookshelf__entry__spine(entry: Immutable<BookStashLib.BookshelfEntry>): RichText.Document {
	const {
		cover,
		is_root_starred,
		stared_nodes_count,
	} = entry

	const builder = RichText.fragmentⵧinline()

	const $star = RichText.fragmentⵧinline()
		.pushText(is_root_starred
			? (stared_nodes_count ? '🌟' : '⭐️')
			: (stared_nodes_count ? '⭐️' : '☆')
		)
		.done()
	builder.pushNode($star, {id: 'star'})
	builder.pushText(' ')

	const $raw_spine = renderꓽcover__spine(cover)
	builder.pushNode($raw_spine, {id: 'spine'})

	// TODO add completion rate

	builder.addHints({
		underlying: entry,
	})

	return builder.done()
}


function renderꓽBookStash(
	state: Immutable<BookStashLib.BookStash>,
): RichText.Node {
	const list = RichText.listⵧordered()

	const bookshelf = getꓽbookshelf(state)

	bookshelf.forEach((entry) => {
		list.pushNode(renderꓽbookshelf__entry__spine(entry))
	})

	return RichText.fragmentⵧblock()
		.pushNode(list.done())
		.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookStash,
}
