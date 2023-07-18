import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import getꓽterminal_size from 'term-size'
import terminalImage from 'terminal-image'
import * as RichText from '@offirmo-private/rich-text-format'
import to_ansi from '@offirmo-private/rich-text-format--to-ansi'

import { Book, BookPart, Page } from './types.js'
import { isꓽBook, isꓽBookPart, isꓽPage } from './types--guards.js'

/////////////////////////////////////////////////

async function renderꓽBook(book: Immutable<Book>): Promise<void> {
	assert(isꓽBook(book), `should be a book!`)

	const $node = RichText.heading()
		.pushText(book.title)
		.done()
	console.log(to_ansi($node))

	if (book.titleⵧsub)
		console.log(book.titleⵧsub)

	await _renderꓽBookPart(book)
}

async function _renderꓽBookPart(book_parts: Immutable<BookPart>): Promise<void> {
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

async function _renderꓽPage(page: Immutable<Page>): Promise<void> {
	// TODO count all pages
	console.log(`┌──┄┄ page x/y TODO`)

	//const $node = Ri

	// load and format the content
	const paragraphs: string[][] = page.content.split('\n')
		.map(p => p.trim())
		.filter((p => !!p))
		.map(p => _split_into_sentences(p))

	paragraphs.forEach(p => {
		p.forEach(s => {
			// TODO word break
			console.log('│' + s)
		})
	})

	if (page.contentⵧvisual) {
		const url = _fix_url(page.contentⵧvisual)
		console.log(await terminalImage.file(url, {width: '50%'}))
		console.log(`TODO display ${url}`)
	}

	console.log(`└──┄┄`)
}

const SENTENCES_SEPARATORS = [ '.', '!', '?' ]
function _split_into_sentences(p: string): string[] {
	let res: string[] = [p]
	let temp: string[] = []

	SENTENCES_SEPARATORS.forEach(sep => {
		temp = [...res]
		res = []
		temp.forEach(p => {
			const split = p.split(sep)
			res.push(...split.slice(0, -1).map(s => s + sep))
			res.push(split.slice(-1)[0])
		})
	})

	return res
}

function _fix_url(url: string): string {
	if (url.startsWith('file://'))
		url = url.slice(7)

	let parts: string[] = []


	let just_seen_dist = false
	url.split('/').forEach(segment => {
		if (segment === 'dist') {
			just_seen_dist = true
			parts.push('src')
			return
		}

		if (just_seen_dist) {
			just_seen_dist = false
			return
		}

		parts.push(segment)
	})

	return parts.join('/')
}
/////////////////////////////////////////////////

export {
	renderꓽBook,
}
