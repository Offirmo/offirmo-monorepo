import React, { use } from 'react'

import {
	type OHAHyperMedia,
	getꓽlinks,
	getꓽengagements,
	getꓽaction_blueprints,
	getꓽcta,
	OHAHyperActionBlueprint,
	deriveꓽaction, type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer,
} from '@monorepo-private/ohateoas'


import { ᄆComponent as ᄆComponent_ } from './component.tsx'

/////////////////////////////////////////////////
const NAME = `OHAViewPort/2`

interface Props {
	ↆ$doc: Promise<OHAHyperMedia>
	onꓽinteraction: (x: OHAHyperActionBlueprint | OHAHyperLink) => void
}
function ᄆComponent({ↆ$doc, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const $doc = use(ↆ$doc)

	return <ᄆComponent_ $doc={$doc} onꓽinteraction={onꓽinteraction} background_tasks={[]} />
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
