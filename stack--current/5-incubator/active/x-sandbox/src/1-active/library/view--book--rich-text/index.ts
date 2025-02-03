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

	const builder = RichText.fragmentⵧinline()

	if (cover.hints?.emoji)
		builder
			.pushEmoji(cover.hints?.emoji)
			.pushText(' ')

	builder.pushNode(
		RichText.em().pushText(title.trim()).done(),
		{
			// TODO one day: color, font family, etc.
			id: 'title',
		},
	)

	builder.pushNode(
		RichText.weak().pushText(' by ').done(),
		{
			id: 'by'
		},
	)

	builder.pushNode(
			RichText.fragmentⵧinline().pushText(author.trim()).done(),
			{
				id: 'author'
			},
		)

	builder.addHints({
		underlying: cover,
	})

	return builder.done()
}

/////////////////////////////////////////////////

export {
	renderꓽcover__spine,
}
