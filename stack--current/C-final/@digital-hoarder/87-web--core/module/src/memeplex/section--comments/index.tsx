import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import { RichString } from "../rich-string";
import type { BaseProps } from "../types";
import {Line} from "../line";

/////////////////////////////////////////////////

export interface Props extends BaseProps {
}

export function Comments(props: Props) {
	console.log('🔄 <Comments/>', props)
	const { memeplex } = props

	return <>
		<h1>Comments</h1>
		{memeplex.comments.map((line_record) => {
		return <Line {...props} meme={line_record}>
			<RichString s={line_record._source} memeplex={memeplex} />
		</Line>
	})}
		</>
}

/////////////////////////////////////////////////
