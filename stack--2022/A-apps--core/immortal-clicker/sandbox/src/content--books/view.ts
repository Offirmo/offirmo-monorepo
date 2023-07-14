import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import getꓽterminal_size from 'term-size'

import { Book, BookPart, Page } from './types.js'
import * as console from 'console'
import { isꓽBook, isꓽBookPart, isꓽPage } from './types--guards.js'

/////////////////////////////////////////////////

function renderꓽBook(book: Immutable<Book>): void {
	assert(isꓽBook(book), `should be a book!`)

	console.log(book.title)

	if (book.titleⵧsub)
		console.log(book.titleⵧsub)

	_renderꓽBookPart(book)
}

function _renderꓽBookPart(book_parts: Immutable<BookPart>): void {
	const part‿keys = Object.keys(book_parts.parts).sort()
	part‿keys.forEach((part‿key: string, index: number) => {
		console.log(`${index + 1}/${part‿keys.length + 1}`)
		const part = book_parts.parts[part‿key]
		if (isꓽPage(part)) {
			_renderꓽPage(part)
		}
		else if (isꓽBookPart(part)) {
			_renderꓽBookPart(part)
		}
		else {
			console.log(part)
			throw new Error('should be a page or a book part!')
		}
	})
}

function _renderꓽPage(page: Immutable<Page>): void {
	// TODO count all pages
	console.log(`┌──┄┄ page x/y TODO`,)
	console.log(page.content.split('\n').map(s => '│' + s).join('\n'))
	console.log(`└──┄┄`,)
}

/////////////////////////////////////////////////

export {
	renderꓽBook,
}
