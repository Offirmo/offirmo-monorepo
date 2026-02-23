/** Je développe un liseuse de livres électroniques. Écrit un component React affichant une rangée de livres comme sur une bibliothèque.
*/

import type { Immutable } from '@monorepo-private/ts--types'
import renderⵧto_react from '@monorepo-private/rich-text-format--to-react'
//import React, { use, useId, useEffect, useState } from 'react'

import { type BookStash } from '../../model--book-stash'
import { renderꓽbookshelf } from '../../view--book-stash--rich-text'

/////////////////////////////////////////////////

interface Props {
	page_result: Immutable<BookStash>
}
function Component({ state }: Props) {
	const $doc = renderꓽbookshelf(state)

	return renderⵧto_react($doc)
/*	return (
		<div>
			Hello, world!
		</div>
	)*/
}

/////////////////////////////////////////////////

export {
	type Props,
	Component as xxx,
}
export default Component
