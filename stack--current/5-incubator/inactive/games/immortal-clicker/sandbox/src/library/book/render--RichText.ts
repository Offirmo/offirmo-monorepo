import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { Book, BookCover, BookPage, BookPageReference } from './types.js'
import { isꓽBook, isꓽBookCover } from './types--guards.js'
import { BookPageReferenceChain, getꓽBookPageⵧchain } from './selectors.js'
import { PAGE_REFERENCEⵧSEPARATOR } from './consts.js'

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


function renderꓽBookPageⵧfrom_chain(
	chain: Immutable<BookPageReferenceChain>,
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookPageⵧfrom_chain`)
	const book = chain.steps[0].book_part
	if (DEBUG) console.log('book=', book)

	const page = chain.page

	let builder = RichText.fragmentⵧblock()

	builder.pushHeading(book.title)

	chain.steps.forEach((step, index) => {
		const { book_part, keysⵧallⵧordered, keyⵧselected} = step
		const key_index = keysⵧallⵧordered.indexOf(keyⵧselected)
		builder.pushBlockFragment(`${book_part.parts_type || 'page'} ${key_index+1}/${keysⵧallⵧordered.length}`)
	})

	builder.pushText(page.content) // TODO add image

	if (DEBUG) console.groupEnd()

	return builder.done()
}

function renderꓽBookPage(
	book: Immutable<Book>,
	page_ref: BookPageReference,
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookPage`)
	if (DEBUG) console.log('book=', book)
	if (DEBUG) console.log('reference=', page_ref)

	assert(isꓽBook(book), `should be a book!`)

	const chain = getꓽBookPageⵧchain(book, page_ref)
	const result = renderꓽBookPageⵧfrom_chain(chain)

	if (DEBUG) console.groupEnd()

	return result
}

/////////////////////////////////////////////////

export {
	renderꓽBookCover,
	renderꓽBookPage,

	renderꓽBookPageⵧfrom_chain,
}
