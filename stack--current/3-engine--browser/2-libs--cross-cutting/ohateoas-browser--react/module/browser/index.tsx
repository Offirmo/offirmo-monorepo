import React, { useState, useEffect } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'
import type { OHAHyperMedia, OHAServer } from '@offirmo-private/ohateoas'

import Frame from '../frame/component.tsx'

/////////////////////////////////////////////////

interface Props {
	server: OHAServer
}

function Component({server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Browser')

	const [ url, setUrl ] = useState<Url‿str>('/')

	const ↆ$doc = server.ↆget(url)

	return (
		<Frame url={url} ↆ$doc={ↆ$doc} />
	)
}

/////////////////////////////////////////////////

export default Component
