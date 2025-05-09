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
	deriveꓽaction, type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer, OHAPendingEngagement,
} from '@offirmo-private/ohateoas'

import ᄆHyperAnchor from '../l0-hyper-anchor/index.tsx'
import './component.css'
import type { Immutable } from '@offirmo-private/ts-types'

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
	const links = getꓽlinks($doc, { self: false })
	console.log(`${NAME}`, { $doc, engagements, action_blueprints, links})

	return (
		<section key={NAME}>
			<ᄆEngagements engagements={engagements} />

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

			<ᄆLinks links={links} onꓽclick={onꓽinteraction} />

			<ᄆBackgroundTasks />
		</section>
	)
}

/////////////////////////////////////////////////

interface EngagementProps {
	engagements: Array<OHAPendingEngagement>
}
function ᄆEngagements({ engagements }: EngagementProps) {
	if (engagements.length === 0) return undefined

	return [
		...engagements.map(engagement => {
			return (
				<div key={engagement.uid}>
					{renderⵧto_react(engagement.story)}
				</div>
			)
		}),
			<hr key="sep--engagements"/>
		]
}

interface LinksProps {
	links: Record<string, Immutable<OHAHyperLink>>
	onꓽclick: (x: OHAHyperLink) => void
}
function ᄆLinks({ links, onꓽclick }: LinksProps) {
	if (Object.keys(links).length === 0) return undefined

	return [
			<hr key='sep--links'/>,
			<nav key="links">
				<ul>
					{Object.values(links).map((link, index) =>
						<li key={String(index) /* XXX bad!!! */ }>
							<ᄆHyperAnchor
								href={link}
								onꓽclick={onꓽclick} />
						</li>
						)}
				</ul>
			</nav>,
		]
}

function ᄆBackgroundTasks() {
	// 			<hr key='sep--bgtasks'/>
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
