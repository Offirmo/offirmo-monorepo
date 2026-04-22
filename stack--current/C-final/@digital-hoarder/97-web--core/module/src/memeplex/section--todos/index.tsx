import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { DigitalHoardingMemeplex } from '@digital-hoarder/model'
import { RichString } from "../rich-string";
import type { BaseProps } from "../types";
import {Line} from "../line";

/////////////////////////////////////////////////

export interface Props extends BaseProps {
}

export function Todos(props: Props) {
	console.log('🔄 <Todos/>', props)
	const { memeplex } = props

	return memeplex.todos.map((line_record) => {
		return <Line {...props} meme={line_record}>
			<RichString s={line_record._source} memeplex={memeplex} />
		</Line>
	})
}

/////////////////////////////////////////////////
