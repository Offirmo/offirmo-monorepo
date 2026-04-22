import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { DigitalHoardingMeme, DigitalHoardingMemeplex } from '@digital-hoarder/model'
import { RichString } from "../rich-string";
import type { BaseProps } from "../types";
import { Line } from '../line'

/////////////////////////////////////////////////

export interface Props extends BaseProps {
	meme: Immutable<DigitalHoardingMeme>
}

export function Meme(props: Props) {
	//console.log('🔄 <Meme/>', props)
	const {meme, memeplex} = props

	const heading = meme.parent_headings.map(s => (
		<span className="parent-heading">
				<RichString s={s} memeplex={memeplex}/>
			</span>
	))
	heading.push(
		<span className="heading">
				<RichString s={meme.headingⵧshortened || meme.heading} memeplex={memeplex}/>
			</span>
	)
	const joined = heading.flatMap((el, i) =>
		i === 0 ? [el] : [<span className="separator"> ⵧ </span>, el]
	)

	const description = meme.description
		? <RichString s={meme.description} memeplex={memeplex}/>
		: null

	const elems = []

	return <Line {...props} meme={meme}>
		{joined}
		{description && <span className="separator"> = </span>}
		{description}
	</Line>
}

/////////////////////////////////////////////////
