import { assert_from } from '@monorepo-private/assert'

import type { BaseProps } from './types'
import { Abbreviations } from "./section--abbreviations";
import { Comments } from "./section--comments";
import { MainMemes } from "./section--main";
import { NewsFeeds } from "./section--newsfeeds";
import { Timeline } from "./section--timeline";
import { Todos } from "./section--todos";
import { WhoIsWho } from "./section--who-is-who";
import { Memes } from './memes'


/////////////////////////////////////////////////

export function Memeplex(props: BaseProps) {
	console.log('🔄 <Memeplex/>', props)

	return <>
		<ol>
			{props._debug && <li>
				<Comments {...props} />
			</li>}

			{props._debug && <li>
				<h1>Todos</h1>
				<Todos {...props} />
			</li>}

			<li>
				<MainMemes {...props} />
			</li>

			<li>
				<Timeline {...props} />
			</li>

			<li>
				<WhoIsWho {...props} />
			</li>

			<li>
				<NewsFeeds {...props} />
			</li>

			<li>
				<Abbreviations {...props} />
			</li>
		</ol>
	</>
}

/////////////////////////////////////////////////
