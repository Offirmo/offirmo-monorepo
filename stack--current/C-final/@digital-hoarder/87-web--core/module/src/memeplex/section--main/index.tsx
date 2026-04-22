import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import * as ModelLib from '@digital-hoarder/model'

import type { BaseProps } from "../types";
import { Memes } from '../memes'

/////////////////////////////////////////////////
export interface Props extends BaseProps {
}

export function MainMemes(props: Props) {
	console.log('🔄 <Memes/>', props)
	const { memeplex } = props

	const memes = memeplex.memes
		.filter(dhm => dhm.hasꓽevent !== 'pure')
		.filter(dhm => !ModelLib.isꓽWhoIsWho(dhm))
		.sort(ModelLib.compareꓽDigitalHoardingMeme)

	return <Memes {...props} memes={memes} heading="Mental models" isOpen={true} />
}

/////////////////////////////////////////////////
