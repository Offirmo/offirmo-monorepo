import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import type {
	BookCover,
} from '../model--book/types/index.ts'

/////////////////////////////////////////////////

function renderꓽcover__spine(cover: Immutable<BookCover>): RichText.Document {

	// for now, downgrade. We can improve later
	const title = RichText.renderⵧto_text(cover.title || '(missing title)')
	const author = RichText.renderⵧto_text(cover.author || 'Unknown Author')

	const $doc = RichText.fragmentⵧinline()
		.pushNode(
			RichText.em().pushText(title.trim()).done(),
			{
				// TODO one day: color, font family, etc.
				id: 'title',
			},
		)
		.pushText(' by ')
		.pushNode(
			RichText.weak().pushText(author.trim()).done(),
			{
				id: 'author'
			},
		)
		// TODO one day embed the data itself
		.done()

	return $doc
}

/////////////////////////////////////////////////

export {
	renderꓽcover__spine,
}
