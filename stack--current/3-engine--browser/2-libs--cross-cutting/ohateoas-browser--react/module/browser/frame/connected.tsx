import React, { use } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'

import {
	type OHAHyperMedia, type OHAServer,
} from '@offirmo-private/ohateoas'

import { ᄆComponent as ᄆComponentⳇpure } from './component.tsx'

/////////////////////////////////////////////////

interface Props {
	ↆ$doc: Awaited<OHAHyperMedia>
	dispatch: OHAServer['dispatch']
	url: Url‿str
}
function ᄆComponent({url, ↆ$doc}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Frame/2')

	const $doc = use(ↆ$doc)

	return <ᄆComponentⳇpure $doc={$doc} url={url} />
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
