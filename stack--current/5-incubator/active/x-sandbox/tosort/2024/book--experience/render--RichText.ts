import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { BookCover } from '../../../src/library/book/l1-types/types.ts'
import { isꓽBook } from '../../../src/library/book/l1-types/guards.ts'
import { BookExperience } from './types.ts'

/////////////////////////////////////////////////

const DEBUG = true

function renderꓽBookCover(
	cover: Immutable<BookCover>,
	experience: Immutable<BookExperience>,
	options: {
	} = {
	},
): RichText.Node {
	if (DEBUG) console.group(`renderꓽBookCover`)

	console.log(cover)
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
