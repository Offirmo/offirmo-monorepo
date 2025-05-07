import React, { use } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'

import {
	type OHAHyperAction, type OHAHyperLink,
	type OHAHyperMedia, type OHAStory,
} from '@offirmo-private/ohateoas'

import { ᄆComponent as ᄆComponentⳇpure } from './component.tsx'

/////////////////////////////////////////////////

interface Props {
	url: Url‿str
	ↆ$doc: Promise<OHAHyperMedia>
	onꓽinteraction: (x: OHAHyperAction | OHAHyperLink) => Promise<OHAStory | undefined>
}
function ᄆComponent({url, ↆ$doc, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Frame/2')

	// TODO suspense with:
	// - status bar showing the url being loaded
	// - initial loader
	// - transparent old value while loading new one
	// - cache for the above

	const $doc = use(ↆ$doc)

	return <ᄆComponentⳇpure $doc={$doc} url={url} onꓽinteraction={onꓽinteraction} />
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
