import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { Book, BookCover, PageReference } from './types.js'
import { isꓽBook, isꓽBookCover } from './types--guards.js'
import { getꓽBookPage } from './selectors.js'

/////////////////////////////////////////////////

const DEBUG = false

/////////////////////////////////////////////////

// TODO needed?
function renderꓽBookⵧTitle(
	cover: Immutable<BookCover>, // reminder that Book inherit from BookCover
	options: {} = {},
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookⵧTitle`)
	if (DEBUG) console.log(cover)

	assert(isꓽBookCover(cover), `should be a book cover!`)

	let builder = RichText.fragmentⵧinline()
		.pushText(cover.title)

	cover.subtitles?.forEach(subtitle =>
		builder = builder.pushHeading(subtitle)
	)

	if (cover.hints?.pages_count)
		builder.pushText(`${cover.hints?.pages_count} pages`)

	if (DEBUG) console.groupEnd()

	return builder.done()
}


function renderꓽBookCover(
	cover: Immutable<BookCover>,
	options: {} = {},
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookCover`)

	//console.log(cover)
	assert(isꓽBookCover(cover), `should be a book cover!`)

	// TODO use sub-functions for titles and sub-titles?

	let builder = RichText.fragmentⵧblock()
		.pushHeading(
			[
				cover.hints?.emoji || '📖',
				cover.title
			].join(' ')
		)

	cover.subtitles?.forEach(subtitle =>
		builder = builder.pushHeading(subtitle)
	)

	if (cover.hints?.pages_count)
		builder.pushText(`${cover.hints?.pages_count} pages`)

	if (DEBUG) console.groupEnd()

	return builder.done()
}

function renderꓽBookPage(
	book: Immutable<Book>,
	page_ref: PageReference,
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookPage`)
	if (DEBUG) console.log('book=', book)
	if (DEBUG) console.log('reference=', page_ref)

	assert(isꓽBook(book), `should be a book!`)

	const page = getꓽBookPage(book, page_ref)

	let builder = RichText.fragmentⵧblock()
		.pushText(page.content) // TODO add image

	if (DEBUG) console.groupEnd()

	return builder.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookCover,
	renderꓽBookPage,
}
