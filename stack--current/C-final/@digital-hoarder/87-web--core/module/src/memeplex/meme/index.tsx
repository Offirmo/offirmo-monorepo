import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { DigitalHoardingMeme } from '@digital-hoarder/model'
import { RichString } from "../rich-string";
import type { BaseProps } from "../types";
import { Line } from '../line'

/////////////////////////////////////////////////

// https://colorbrewer2.org/?type=qualitative&scheme=Pastel1&n=9
const colors = [
	//'#fbb4ae', too red, scary
	'#b3cde3',
	'#ccebc5',
	'#decbe4',
	//'#fed9a6', too yellow, scary
	'#ffffcc',
	'#e5d8bd',
	'#fddaec',
	//'#f2f2f2' too light
].map(c => c + '55')

/////////////////////////////////////////////////

export interface Props extends BaseProps {
	meme: Immutable<DigitalHoardingMeme>
	heading_path_counters?: number[]
}

export function Meme(props: Props) {
	//console.log('🔄 <Meme/>', props)
	const { _debug, meme, memeplex, heading_path_counters = [] } = props

	// TODO 1D prevent from reusing the same color as the immediate parent
	const heading = meme.parent_headings.map((s, index) => (
		<>
			<span className="parent-heading" data-h-index={heading_path_counters[index] ?? 0} style={{
				backgroundColor: colors[(heading_path_counters[index] ?? 0) % colors.length]
			}}>
				<RichString s={s} memeplex={memeplex}/>
				{_debug && <span className="debug">#{heading_path_counters[index] ?? 0}</span>}
				<span className="separator"> ⵧ </span>
			</span>
		</>
	))
	heading.push(
		<span className="heading" data-h-index={heading_path_counters[meme.parent_headings.length] ?? 0} style={{
			backgroundColor: colors[(heading_path_counters[meme.parent_headings.length] ?? 0) % colors.length]
		}}>
			<RichString s={meme.headingⵧshortened || meme.heading} memeplex={memeplex}/>
			{!!meme.headingⵧfull && <RichString s={`(${meme.headingⵧfull})`} memeplex={memeplex}/>}
			{_debug && <span className="debug">#{heading_path_counters[meme.parent_headings.length] ?? 0}</span>}
		</span>
	)

	const description = meme.description
		? <span className="description"><RichString s={meme.description} memeplex={memeplex}/></span>
		: null

	return <Line {...props} meme={meme} style={{
		//backgroundColor: colors[(heading_path_counters[0] ?? 0) % colors.length]
	}}>
		{heading}
		{description && <span className="separator"> = </span>}
		{description}
	</Line>
}

/////////////////////////////////////////////////
