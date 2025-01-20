import React, { use, useId, useEffect } from 'react'

import * as RichText from '@offirmo-private/rich-text-format'

import type { BookCover } from '../../book--model/l1-types/index.ts'
/////////////////////////////////////////////////

interface Props {
	cover: BookCover
}

/*
	title: Text
	author?: Author
	subtitles?: Array<Text> // "title" in a wide sense. Anything accompanying the title we want to be displayed on the cover. By order of most importance.

	// since we have lazy loading, allow hints for overall data
	// that would otherwise need a complete load, ex. number of pages
	hints?: {
		pages_count?: PositiveInteger
		emoji?: Emoji // 📔📕📗📘📙📓📒📃📜📄📰🗺
		icon?: Url‿str
		picture?: Url‿str
	}
 */
function Component(props: Props) {
	const {
		cover,
	} = props

	const title = RichText.renderⵧto_text(cover.title || '(missing title)')
	const subtitles = (cover.subtitles ?? []).map(st => RichText.renderⵧto_text(st))
	const author = RichText.renderⵧto_text(cover.author || 'Unknown Author')
	return (
		<article style={{
			border: 'solid 1px',
			textAlign: 'center',
			aspectRatio: 210./297.,
			backgroundColor: cover.hints?.color_bg || 'unset',
			color: cover.hints?.color_fg || 'unset',
		}}>
			<header>
				<h1>{title}</h1>
				{subtitles[0] && <h2>{subtitles[0]}</h2>}
				{subtitles[1] && <h3>{subtitles[1]}</h3>}
				{subtitles[2] && <h4>{subtitles[2]}</h4>}
				{subtitles[3] && <h5>{subtitles[3]}</h5>}
				{subtitles[4] && <h6>{subtitles[4]}</h6>}
			</header>
			<footer>by: <em>{author}</em></footer>
		</article>
	)
}

/////////////////////////////////////////////////
type BookCoverProps = Props
const BookCover = Component

export {
	type Props,
	Component,

	type BookCoverProps,
	BookCover,
}
export default Component
