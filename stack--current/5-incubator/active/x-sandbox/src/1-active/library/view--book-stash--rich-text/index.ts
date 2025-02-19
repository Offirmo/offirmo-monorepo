import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { type BookCover, type BookPage, type BookPart, type BookUId, type PageResult, type Text } from '../model--book/index.ts'
import * as BookStashLib from '../model--book-stash/index.ts'
import { renderꓽcover__spine } from '../view--book--rich-text/index.ts'
import { getꓽbookshelf } from '../model--book-stash/index.ts'

/////////////////////////////////////////////////

// bookshelf = "aware" subset of the stash
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

function renderꓽbookshelf(
	state: Immutable<BookStashLib.BookStash>,
): RichText.Node {
	const list = RichText.listⵧordered()
	list.addHints({
		bullets_style: 'none',
	})

	const bookshelf = getꓽbookshelf(state)

	bookshelf.forEach((entry) => {
		list.pushNode(renderꓽbookshelf__entry__spine(entry))
	})

	return list.done()
}

function renderꓽpage_result(page_result: Immutable<PageResult>): RichText.Node {
	const builder = RichText.fragmentⵧblock()

	const {
		content,
		breadcrumbs,
		part_type,
		relative_index‿human,
		group_count,
	} = page_result

	const breadcrumbs‿bldr = RichText.fragmentⵧinline()
	breadcrumbs.forEach((crumb, index, arr) => {
		breadcrumbs‿bldr.pushText(' > ')
		breadcrumbs‿bldr.pushInlineFragment(crumb)
	})
	builder.pushBlockFragment(RichText.weak(breadcrumbs‿bldr.done()).done(), {id: 'breadcrumbs'})

	if (relative_index‿human === 0) {
		// this is a part cover
		builder.pushBlockFragment(RichText.weak(`${group_count} ${part_type}(s)`).done(), { id: 'pagination'}) // TODO one day i18n
	}
	else {
		// this is a part content
		builder.pushBlockFragment(RichText.weak(`${part_type} ${relative_index‿human} out of ${group_count}`).done(), { id: 'pagination'})
	}

	assert(!content.contentⵧvisual, `Page visual content not implemented!`)
	builder.pushNode(content.content, {id: 'content'})

	builder.addHints({
		underlying: page_result,
	})

	return builder.done()
}


/////////////////////////////////////////////////

export {
	renderꓽbookshelf__entry__spine,
	renderꓽbookshelf,

	renderꓽpage_result,
}
