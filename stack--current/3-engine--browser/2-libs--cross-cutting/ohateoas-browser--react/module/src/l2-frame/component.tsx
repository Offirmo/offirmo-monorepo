import React, { useState, Suspense, useRef } from 'react'

import {
	type Url‿str,
	getꓽuriⵧnormalized‿str,
} from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	OHALinkRelation,
	type State,
	type OHAHyperMedia,
	getꓽlinks,
	getꓽengagements,
	getꓽaction_blueprints,
	getꓽcta,
	OHAHyperActionBlueprint,
	deriveꓽaction, type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer,
	create,
	navigate_to,
	onꓽloaded, isꓽOHAHyperLink,
} from '@offirmo-private/ohateoas'

import ᄆChrome from './chrome/index.tsx'

import ᄆViewport from '../l1-viewport/index.tsx'
import './component.css'

/////////////////////////////////////////////////
const NAME = `OHAFrame/1`

interface Props {
	state: State
	onꓽinteraction: (x: OHAHyperAction | OHAHyperLink | 'reload') => Promise<OHAStory | undefined>
}
function ᄆComponent({state, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const refⵧdialog = useRef(undefined)
	const [fg_action, setFgAction] = useState<undefined | Promise<unknown>>(undefined)

	const $doc = state.$representation

	async function on_click_action(action_blueprint: OHAHyperActionBlueprint) {
		const { action, feedback } = deriveꓽaction(action_blueprint)

		console.log(`on_click_action`, action_blueprint, action, feedback)

		const ೱdispatch_result = onꓽinteraction(action)
		let ೱtask = ೱdispatch_result // so far

		// TODO 1D durationⵧmin‿ms

		switch(feedback.tracking) {
			case 'forget':
				// TODO 1D
				break
			case 'background':
			// not implemented yet
			// fallback on foreground
			case 'foreground': {
				setFgAction(ೱtask)
				refⵧdialog.current.showModal()
				break
			}
			default:
				throw new Error(`Feedback tracking "${feedback.tracking}" not implemented!`)
		}

		if (feedback.story) {
			throw new Error(`Not implemented feedback story!`)
		}

		if (feedback[OHALinkRelation.continueᝍto]) {
			throw new Error(`Not implemented continueᝍto!`)
		}

		ೱtask
			.then((story?: OHAStory) => {
				console.log('task done', story)

				if (story) {
					console.warn(`TODO implement displaying story!`, story)

					// TODO continue to ??
				}

				// an action implies the need for a reload
				onꓽinteraction('reload')
			})
			.catch(err => {
				// TODO better error
				console.error('task failed', err)
			})
			.finally(() => {
				setFgAction(undefined)
				refⵧdialog.current.close()
			})
	}



	function _onꓽinteraction(x: OHAHyperActionBlueprint | OHAHyperLink): void {
		if (isꓽOHAHyperLink(x)) return onꓽinteraction(x)

		on_click_action(x)
	}

	return (
		<section key={NAME} style={{border: 'solid 2px black'}} className={['o⋄fill-parent']}>
			<ᄆChrome url={state.urlⵧself} />
			<hr style={{color: 'red'}}/>

			{$doc ? <ᄆViewport $doc={$doc} onꓽinteraction={_onꓽinteraction} background_tasks={[]}/> : "[Loading…]"}

			<StatusBar text={state.status} />

			{/* TODO dialog should only cover the viewport!*/}
			<dialog open={!!fg_action} ref={refⵧdialog}>
				<p>Task in progress…</p>
				{/*<form method="dialog">
					<button>OK</button>
				</form>*/}
			</dialog>
		</section>
	)
}

/////////////////////////////////////////////////

interface StatusBarProps {
	text: string
}
function StatusBar({text}: StatusBarProps) {
	return text && (
		<code key="status_bar" style={{position: 'absolute', bottom: 0, left: 0}}>{text}</code>
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
