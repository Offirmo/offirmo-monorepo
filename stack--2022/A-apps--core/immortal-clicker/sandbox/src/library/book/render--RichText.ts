import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { Book, BookCover, PageReference } from '../book/types.js'
import { isꓽBook, isꓽBookCover } from '../book/types--guards.js'

/////////////////////////////////////////////////

const DEBUG = false

/////////////////////////////////////////////////

function renderꓽBookCover(
	cover: Immutable<BookCover>,
	options: {} = {},
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookCover`)

	//console.log(cover)
	assert(isꓽBookCover(cover), `should be a book cover!`)

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
	path: PageReference,
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookPage`)
	if (DEBUG) console.log('book=', book)
	if (DEBUG) console.log('reference=', path)

	assert(isꓽBook(book), `should be a book!`)

	let builder = RichText.fragmentⵧblock()

	// TODO

	if (DEBUG) console.groupEnd()

	return builder.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookCover,
	renderꓽBookPage,
}
