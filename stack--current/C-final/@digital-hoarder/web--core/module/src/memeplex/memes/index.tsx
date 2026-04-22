import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { BaseProps } from "../types";
import { Meme } from '../meme'

/////////////////////////////////////////////////

export function Memes(props: BaseProps) {
	console.log('🔄 <Memes/>', props)
	const { memeplex } = props

	return memeplex.memes.map((dhm) => {
		return <Meme {...props} meme={dhm} />
	})
}

/////////////////////////////////////////////////
