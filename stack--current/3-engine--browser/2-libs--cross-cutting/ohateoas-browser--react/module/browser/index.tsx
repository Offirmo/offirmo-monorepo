import React, { useState, useEffect } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'
import type { OHAHyperMedia, OHAServer } from '@offirmo-private/ohateoas'

import ᄆFrame from './frame/index.tsx'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

interface Props {
	server: OHAServer
}

function ᄆComponent({server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Browser')

	const [ url, setUrl ] = useState<Url‿str>('/')

	const ↆ$doc = server.ↆget(url)

	const dispatch: OHAServer['dispatch'] = (action, url) => {
		return server.dispatch(action, url)
	}

	return (
		<ᄆFrame url={url} ↆ$doc={ↆ$doc} />
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
