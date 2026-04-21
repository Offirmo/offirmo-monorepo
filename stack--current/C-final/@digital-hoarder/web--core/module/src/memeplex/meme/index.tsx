import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { DigitalHoardingMeme } from '@digital-hoarder/model'
import {RichString} from "../rich-string";
import {BaseProps} from "../types";

/////////////////////////////////////////////////

export interface Props extends BaseProps {
	meme: Immutable<DigitalHoardingMeme>
}

export function Meme({meme}: Props) {
	console.log('🔄 <Meme/>', {meme})

	return 'TODO meme'
}

/////////////////////////////////////////////////
