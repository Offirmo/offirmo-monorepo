import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import terminalImage from 'terminal-image'
import * as RichText from '@offirmo-private/rich-text-format'
import {
	renderⵧto_ansi,
	callbacksⵧto_ansi,
} from '@offirmo-private/rich-text-format--to-ansi'

import { Book, BookPart, Page } from './types.js'
import { isꓽBook, isꓽBookPart, isꓽPage, isꓽPageⵧlike } from './types--guards.js'

/////////////////////////////////////////////////

interface WalkState {
	path: Array<{
		type: string
		index: number // 0 based
		length: number
	}>
}

function getꓽdepth(walk_state: Immutable<WalkState>): number {
	return walk_state.path.length
}

function enqueue_part(walk_state: Immutable<WalkState>, book_parts: Immutable<BookPart>): Immutable<WalkState> {
	return {
		...walk_state,
		path: [
			...walk_state.path,
			{
				type: getꓽpart_type(book_parts),
				index: -1,
				length: -1,
			}
		]
	}
}

/////////////////////////////////////////////////

function getꓽpart_type(book_parts: Immutable<BookPart>): string {
	if (book_parts.parts_type)
		return book_parts.parts_type

	if (Object.values(book_parts.parts).every(part => isꓽPageⵧlike(part)))
		return 'page'

	return 'part' // generic
}

async function renderꓽBook(book: Immutable<Book>, options: { resolver?: (id:string) => RichText.Node | undefined } = {}): Promise<void> {
	assert(isꓽBook(book), `should be a book!`)
	assert(book.title, `should have a title!`)

	function resolve_unknown_subnode(sub_node_id: string): RichText.Node | undefined {
		// BEWARE OF INFINITE LOOPS!
		// RECOMMENDED TO ONLY RETURN SIMPLE NODES (just text)

		switch (sub_node_id) {
			case 'gᐧtitle':
				return _raw_text_to_$node(book.title)

			// ideas
			case 'gᐧtitleⵧoriginal':
				throw new Error('NIMP!')

			default: {
				if (options.resolver) {
					const $node = options.resolver(sub_node_id)
					if ($node) return $node
				}
				break;
			}
		}

		console.warn(`resolver: unrecognized sub id "${sub_node_id}"!`)
		return undefined
	}

	const $nodeⵧtitle = _raw_text_to_$node(book.title)
	console.log(renderⵧto_ansi(
		RichText.heading()
			.pushText(`‖ ⎨⎨gᐧtitle⎬⎬ ‖`)
			.done(),
		{
			resolve_unknown_subnode,
		},
		))

	if (book.titleⵧsub) {
		throw new Error('NIMP!')
	}

	let walk_state = {} as WalkState
	await _renderꓽBookPart(book, walk_state)
}

async function _renderꓽBookPart(book_parts: Immutable<BookPart>, walk_state: WalkState): Promise<void> {
	const part‿keys = Object.keys(book_parts.parts).sort()

	const part_type = getꓽpart_type(book_parts)

	part‿keys.forEach((part‿key: string, index: number) => {
		console.log(`↳ ${part_type} ${index + 1}/${part‿keys.length}`)
		const part = book_parts.parts[part‿key]

		if (isꓽPage(part)) {
			_renderꓽPage(part, walk_state)
		}
		else if (isꓽBookPart(part)) {
			_renderꓽBookPart(part, walk_state)
		}
		else if (typeof part === 'string') {
			_renderꓽPage(_string_to_page(part), walk_state)
		}
		else {
			console.log(part)
			throw new Error('should be a page or a book part!')
		}
	})
}

function _string_to_page(content: string): Page {
	return { content }
}

async function _renderꓽPage(page: Immutable<Page>, walk_state: WalkState): Promise<void> {
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

// TODO own package? check how parcel handles it first.
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

// input looks like:
// "Hello ⎨⎨world⎬⎬, welcome to ⎨⎨place|filter1|filter2⎬⎬
function _raw_text_to_$node(txt: string) {
	return { $content: txt }
}


/////////////////////////////////////////////////

export {
	renderꓽBook,
}
