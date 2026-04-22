import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import * as ModelLib from '@digital-hoarder/model'

import type { BaseProps } from "../types";
import { Memes } from "../memes";

/////////////////////////////////////////////////

export function Timeline(props: BaseProps) {
	//console.log('🔄 <Timeline/>', props)
	const { memeplex } = props

	// TODO remap with date always at the start
	const memes = memeplex.memes
		.filter(dhm => ModelLib.hasꓽevent(dhm))
		.sort(ModelLib.compareꓽDigitalHoardingMeme)

	// TODO add "today"
	// TODO add "generated at" ;)

	return <Memes {...props} memes={memes} heading="Timeline" />
}

/////////////////////////////////////////////////
