import React, { type PropsWithChildren, type CSSProperties } from 'react'
import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { LineRecord } from '@digital-hoarder/model'
import type { BaseProps } from "../types";
import he from 'he'

/////////////////////////////////////////////////

export interface Props extends BaseProps, PropsWithChildren {
	meme: Immutable<LineRecord>
}

export function Line(props: Props) {
	console.log('🔄 <Line/>', props)
	const { _debug, meme: line_record, children } = props

	return (
		<div className="meme-line" key={line_record._lineno}>
			{ _debug && [<small className="original-line">{he.escape(`${line_record._lineno}: ${line_record._source}`)}</small>, <br/>]}
			<div className={'meme-line'}>
				{children}
			</div>
		</div>
	)
}

/////////////////////////////////////////////////
