import React, { type PropsWithChildren, type CSSProperties } from 'react'
import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type { LineRecord } from '@digital-hoarder/model'
import type { BaseProps } from "../types";

/////////////////////////////////////////////////

export interface Props extends BaseProps, PropsWithChildren {
	meme: Immutable<LineRecord>
	style?: React.CSSProperties;
}

export function Line(props: Props) {
	//console.log('🔄 <Line/>', props)
	const { _debug, meme: line_record, children, style = {} } = props

	return (
		<div className="meme-line" key={line_record._lineno} style={style}>
			{ _debug && [<small className="debug">{`${line_record._lineno}: ${line_record._source}`}</small>, <br/>]}
			{children}
		</div>
	)
}

/////////////////////////////////////////////////
