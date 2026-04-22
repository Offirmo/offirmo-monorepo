import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import * as ModelLib from '@digital-hoarder/model'

import type { BaseProps } from "../types";
import { Memes } from '../memes'

/////////////////////////////////////////////////

export function WhoIsWho(props: BaseProps) {
	console.log('🔄 <WhoIsWho/>', props)
	const { memeplex } = props

	const memes = memeplex.memes
		.filter(dhm => ModelLib.isꓽWhoIsWho(dhm))
		.map(dhm => {
			return {
				...dhm,
				parent_headings: dhm.parent_headings.slice(1) // 1st segment has no value here
			}
		})
		.sort(ModelLib.compareꓽDigitalHoardingMeme)

	return <Memes {...props} memes={memes} heading="Who's who" />
}

/////////////////////////////////////////////////
