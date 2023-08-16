import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import * as RichText from '@offirmo-private/rich-text-format'
import {
	renderⵧto_terminal,
} from '@offirmo-private/rich-text-format--to-terminal'

import { Book, BookPart, Page } from '../book/types.js'
import { isꓽBook, isꓽBookPart, isꓽPage, isꓽPageⵧlike } from '../book/types--guards.js'

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
				length: Object.keys(book_parts.parts).length,
			}
		]
	}
}

function update_path_last_index(walk_state: Immutable<WalkState>, index: number): Immutable<WalkState> {
	return {
		...walk_state,
		path: [
			...walk_state.path.slice(0, -1),
			{
				...walk_state.path.slice(-1)[0],
				index,
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

function _string_to_page(content: string): Page {
	return { content }
}

const DEBUG = false

async function renderꓽBook(book: Immutable<Book>, options: { resolver?: (id:string) => RichText.Node | undefined } = {}): Promise<void> {
	if (DEBUG) console.group(`renderꓽBook`)
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
	console.log(renderⵧto_terminal(
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

	let walk_state: WalkState = {
		path: [],
	}
	await _renderꓽBookPart(book, walk_state)
	if (DEBUG) console.groupEnd()
}

async function _renderꓽBookPart(book_parts: Immutable<BookPart>, walk_state: Immutable<WalkState>): Promise<void> {
	if (DEBUG) console.group(`_renderꓽBookPart`)
	if (DEBUG) console.log(walk_state)

	const part‿keys = Object.keys(book_parts.parts).sort()

	const part_type = getꓽpart_type(book_parts)

	if (walk_state.path.length)
		console.log(`[${walk_state.path.map(part => `${part.type} ${part.index + 1}/${part.length}`).join(' > ')}]`)

	part‿keys.forEach((part‿key: string, index: number) => {
		//console.log(`↳ ${part_type} ${index + 1}/${part‿keys.length}`)
		const part = book_parts.parts[part‿key]

		let _ws = walk_state
		_ws = enqueue_part(_ws, book_parts)
		_ws = update_path_last_index(_ws, index)

		if (isꓽPage(part)) {
			/*if (part_type !== 'page') {
				// this is a shortcut
				// ex a volume containing a single page
				// we properly insert a fake page in the path
				console.log('shortcut non-page detected!')
				_ws = enqueue_part(walk_state, {
					parts: {
						content: part
					}
				})
				_ws = update_path_last_index(walk_state, 0)
			}*/
			_renderꓽPage(part, _ws)
		}
		else if (isꓽBookPart(part)) {
			_renderꓽBookPart(part, _ws)
		}
		else if (typeof part === 'string') {
			_renderꓽPage(_string_to_page(part), _ws)
		}
		else {
			console.log(part)
			throw new Error('should be a page or a book part!')
		}
	})
	if (DEBUG) console.groupEnd()
}

async function _renderꓽPage(page: Immutable<Page>, walk_state: Immutable<WalkState>): Promise<void> {
	if (DEBUG) console.group(`_renderꓽPage()`)
	if (DEBUG) console.log(walk_state)

	const path_parent = walk_state.path.slice(0, -1)
	const path_last = walk_state.path.slice(-1)[0]

	console.log(`┌──┄┄ ${path_last.type} ${path_last.index + 1}/${path_last.length}`)

	let has_content = false // so far

	// load and format the content
	const paragraphs: string[] = page.content.split('\n\n')
		.map(p => p.trim())
		.filter(p => !!p)
		.map(p => p.replaceAll('\n', ' ')) // single EOL are in fact spaces

	paragraphs.forEach((p, index) => {
		if (index !== 0)
			console.log('│') // paragraph separator

			/*
		const sentences = _split_into_sentences(p)
			.map(s => s.trim())
			.filter(s => !!s)

			sentences.forEach(s => {
			// TODO word split -- NO should be in the sub-lib!
			console.log('│' + s)
			has_content = true
		})
		*/
		console.log('│' + p)
		has_content = true
	})

	if (page.contentⵧvisual) {
		const url = _fix_url(page.contentⵧvisual)
		console.log(`TODO display ${url}`)
		has_content = true
	}

	if (!has_content) {
		console.log('│' + `[ERROR: page with no content!]`)
	}

	console.log(`└──┄┄`)
	if (DEBUG) console.groupEnd()
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
