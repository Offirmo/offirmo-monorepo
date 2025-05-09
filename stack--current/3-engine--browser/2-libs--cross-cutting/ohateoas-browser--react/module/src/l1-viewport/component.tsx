import React, { useState, useRef } from 'react'

import {
	getꓽuriⵧnormalized‿str,
} from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	type OHAHyperMedia,
	getꓽlinks,
	getꓽengagements,
	getꓽaction_blueprints,
	getꓽcta,
	OHAHyperActionBlueprint,
	deriveꓽaction, type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer,
} from '@offirmo-private/ohateoas'

import ᄆHyperAnchor from '../l0-hyper-anchor/index.tsx'
import './component.css'

/////////////////////////////////////////////////
const NAME = `OHAViewPort/1`

interface Props {
	$doc: OHAHyperMedia
	onꓽinteraction: (x: OHAHyperActionBlueprint | OHAHyperLink) => void
}
function ᄆComponent({$doc, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const engagements = getꓽengagements($doc)
	const action_blueprints = getꓽaction_blueprints($doc)
	const links = getꓽlinks($doc)

	return (
		<section key={NAME}>
			<div key="notifs">
				[TODO top notifs]
				<hr />
			</div>

			{renderⵧto_react($doc)}

			<hr key='sep--actions'/>
			{Object.values(action_blueprints).map((action_blueprint) => {
				return <button
					key={action_blueprint.type /* XXX may not be unique!!! */ }
					onClick={() => {
						onꓽinteraction(action_blueprint)
					}}
				>{getꓽcta(action_blueprint)}</button>
			})}

			<hr key='sep--links'/>
			{Object.values(links).map((link, index) => <ᄆHyperAnchor
					href={link}
					key={String(index) /* XXX bad!!! */ }
					onꓽinteraction={onꓽinteraction} />)}

			<hr key='sep--bgtasks'/>
			<ᄆBackgroundTasks />
		</section>
	)
}

/////////////////////////////////////////////////

function ᄆBackgroundTasks() {
	return (
		<div>
			[TODO background tasks]
		</div>
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
