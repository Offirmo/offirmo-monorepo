import React, { type CSSProperties } from 'react'

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
const NAME = `<OHAViewPort>/1`

interface Props {
	available_width: CSSProperties['width']
	$doc: OHAHyperMedia
	background_tasks: Array<unknown>
	onꓽinteraction: (x: OHAHyperActionBlueprint | OHAHyperLink) => void
}
function ᄆComponent({available_width, $doc, background_tasks, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const engagements = getꓽengagements($doc)
	const action_blueprints = getꓽaction_blueprints($doc)
	const links = getꓽlinks($doc, { filter_outꓽtechnical: true })
	console.log(`${NAME}`, { $doc, engagements, action_blueprints, links})

	return (
		<section key={NAME} style={{margin: 0, padding: 0}} className={['o⋄fill-parent']}>
			<div className="wrapper" style={{
				maxWidth: `var(--o⋄content-recommended-width)`,
				margin: `0 max(1ch, (${available_width} - var(--o⋄content-recommended-width))/2)`
			}}>
				<ᄆEngagements engagements={engagements} />

				{renderⵧto_react($doc)}

				<ᄆActions action_blueprints={action_blueprints} onꓽclick={onꓽinteraction} />

				<ᄆLinks links={links} onꓽclick={onꓽinteraction} />

				<ᄆBackgroundTasks background_tasks={background_tasks} />
			</div>
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
		<div key="wrapper--engagements" className="o⋄flex--directionꘌcolumn" style={{
			backgroundColor: 'lightgray',
			gap: '1px',
		}}>
			{...engagements.map(engagement => {
				console.log(`XXX Engagement`, engagement)
				const { attention_needed = 'normal' } = engagement
				const fgcolor = ((): CSSProperties['color'] => {
					switch (attention_needed) {
						case 'fatal':
						case 'alert':
						case 'error':
							return 'var(--o⋄color⁚fg--error)'
						case 'warning':
							return 'var(--o⋄color⁚fg--warning)'
						case 'notice':
							return 'var(--o⋄color⁚fg--info)'
						case 'normal':
							return 'var(--o⋄color⁚fg--main)'
						case 'log':
							return 'var(--o⋄color⁚fg--secondary)'
						case 'debug':
							return 'var(--o⋄color⁚fg--auxiliary)'
						default:
							return 'var(--o⋄color⁚fg--error)'
					}
				})()

				return (
					<div key={engagement.uid} style={{
						backgroundColor: 'var(--o⋄color⁚bg--main)',
						color: fgcolor,
					}}>
						{renderⵧto_react(engagement.story)}
					</div>
				)
			})}
		</div>,
		<hr key='sep--engagements'/>
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

interface ActionsProps {
	action_blueprints: Record<string, Immutable<OHAHyperActionBlueprint>>
	onꓽclick: (x: OHAHyperActionBlueprint) => void
}
function ᄆActions({ action_blueprints, onꓽclick }: ActionsProps) {
	if (Object.keys(action_blueprints).length === 0) return undefined

	return [
		<hr key='sep--actions'/>,
		...Object.values(action_blueprints).map((action_blueprint) => {
			return <button
				key={action_blueprint.type /* XXX may not be unique!!! */ }
				onClick={() => onꓽclick(action_blueprint)}
			>{getꓽcta(action_blueprint)}</button>
		})
	]
}

interface BackgroundTasksProps {
	background_tasks: Array<unknown>
}
function ᄆBackgroundTasks({background_tasks}: BackgroundTasksProps) {
	if (background_tasks.length === 0) return undefined

	return [
			<hr key='sep--bgtasks'/>,
		...background_tasks.map((x, index) => <div>
				[TODO background tasks]
			</div>)
		]
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
