import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { BookUId } from '../book/types.js'
import { isꓽBook } from '../book/types--guards.js'
import * as BookResolverLib from '../book-resolver/index.js'
import * as BookStashLib from './index.js'
import { getꓽBookCover } from '../book-resolver/index.js'

/////////////////////////////////////////////////

const DEBUG = true

function renderꓽBookCover(
	cover:,
	uid: Immutable<BookUId>,
	options: {
		resolver: Immutable<BookResolverLib.BookResolversIndex>,
	} = {
		resolver: BookResolverLib.getꓽdefault(),
	},
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookCover`)

	const experience = BookStashLib.getꓽexperience(state, uid)

	const cover = BookResolverLib.getꓽBookCover(experience.book_uid, options.resolver)

	assert(isꓽBook(cover), `should be a book!`)

	function resolve_unknown_subnode(sub_node_id: string): RichText.Node | undefined {
		// BEWARE OF INFINITE LOOPS!
		// RECOMMENDED TO ONLY RETURN SIMPLE NODES (just text)
		throw new Error('NIMP!')

		/*
		switch (sub_node_id) {
			case 'gᐧtitle':
				return _raw_text_to_$node(book.title)

			// ideas
			case 'gᐧtitleⵧoriginal':
				throw new Error('NIMP!')

			default: {
				xxx
				break;
			}
		}

		console.warn(`resolver: unrecognized sub id "${sub_node_id}"!`)
		return undefined*/
	}

	let builder = RichText.fragmentⵧblock()
		.pushHeading(cover.title)

	cover.subtitles.forEach(subtitle =>
		builder = builder.pushHeading(subtitle)
	)
		//.done()

	if (DEBUG) console.groupEnd()

	return builder.done()
}

/////////////////////////////////////////////////

export {
	renderꓽBookCover,
}
