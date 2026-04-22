import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import { RichString } from "../rich-string";
import type { BaseProps } from "../types";
import { Line } from '../line'

/////////////////////////////////////////////////

export interface Props extends BaseProps {
}

export function Abbreviations(props: Props) {
	//console.log('🔄 <Abbreviations/>', props)
	const { memeplex } = props

	const nodes = Object.entries(memeplex.abbreviations).map(([short, dhm]) => {
		const long = dhm.headingⵧfull!
		return <Line {...props} meme={dhm}>
			<span className="heading">{short}</span> = <RichString s={long} memeplex={memeplex} />
		</Line>
	})

	return <details>
		<summary><h1>Abbreviations ({nodes.length})</h1></summary>
		{nodes}
	</details>
}

/////////////////////////////////////////////////
