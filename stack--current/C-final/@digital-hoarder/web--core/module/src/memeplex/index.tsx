import { assert_from } from '@monorepo-private/assert'

import type { BaseProps } from './types'
import { Abbreviations } from "./abbreviations";
import { Todos } from "./todos";
import { Comments } from "./comments";
import { NewsFeeds } from "./newsfeeds";
import { Memes } from "./memes";

/////////////////////////////////////////////////

export function Memeplex(props: BaseProps) {
	console.log('🔄 <Memeplex/>', props)
	const { memeplex } = props

	return <>
		<ol>
			<li>
				<h1>Memes</h1>
				<Memes {...props} />
			</li>

			<li>
				<h1>Who's who</h1>
				todo...
			</li>

			<li>
				<h1>Timeline</h1>
				todo...
			</li>

			<li>
				<h1>Abbreviations</h1>
				<Abbreviations {...props} />
			</li>

			<li>
				<h1>Newsfeeds</h1>
				<NewsFeeds {...props} />
			</li>

			<li>
				<h1>Todos</h1>
				<Todos {...props} />
			</li>

			<li>
				<h1>Comments</h1>
				<Comments {...props} />
			</li>
		</ol>
	</>
}

/////////////////////////////////////////////////
