import React, { type CSSProperties, useState, useRef } from 'react'

import * as RichText from '@offirmo-private/rich-text-format'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	OHALinkRelation,
	type State,
	getꓽcta,
	OHAHyperActionBlueprint,
	deriveꓽaction, type OHAHyperLink, type OHAStory, type OHAHyperAction,
	isꓽOHAHyperLink,
} from '@offirmo-private/ohateoas'

import ᄆChrome from './chrome/index.tsx'

import ᄆViewport from '../l1-viewport/index.tsx'
import './component.css'

/////////////////////////////////////////////////
const NAME = `OHAFrame/1`

interface Props {
	available_width: CSSProperties['width']
	state: State
	onꓽinteraction: (x: OHAHyperAction | OHAHyperLink | 'reload') => Promise<OHAStory | undefined>
}
function ᄆComponent({state, available_width, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const refⵧdialog = useRef(undefined)
	const [story, setStory] = useState<string | undefined>(undefined)
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
			if (RichText.isꓽNodeLike(feedback.story)) {
				setStory(renderⵧto_react(feedback.story))
			}
			else if (RichText.isꓽNodeLike(feedback.story.message)) {
				setStory(renderⵧto_react(feedback.story.message))
			}
			else {
				throw new Error(`Not implemented feedback story!`)
			}
		}
		else {
			setStory(`Executing "${getꓽcta(action_blueprint)}"…`)
		}

		if (feedback[OHALinkRelation.continueᝍto]) {
			throw new Error(`Not implemented continueᝍto!`)
		}

		ೱtask
			.then((story?: OHAStory) => {
				console.log('task done', story)

				if (RichText.isꓽNodeLike(story)) {
					setStory(renderⵧto_react(story))
				}
				else if (RichText.isꓽNodeLike(story.message)) {
					setStory(renderⵧto_react(story.message))
				}
				else {
					throw new Error(`Not implemented result story!`)
				}

				// an action implies the need for a reload
				onꓽinteraction('reload')
			})
			.catch(err => {
				setStory("ERROR" + err)
				console.error(err)
				// TODO better error
			})
	}

	function _onꓽinteraction(x: OHAHyperActionBlueprint | OHAHyperLink): void {
		if (isꓽOHAHyperLink(x)) return void onꓽinteraction(x)

		on_click_action(x)
	}

	return (
		<div className="o⋄fill-parent o⋄flex--directionꘌcolumn">
			<ᄆChrome url={state.urlⵧself} />

			<div className="o⋄flex-element--grow" style={{position: 'relative'}}>
				{$doc ? <ᄆViewport  available_width={available_width} $doc={$doc} onꓽinteraction={_onꓽinteraction} background_tasks={[]}/> : "[Loading…]"}
			</div>

			<StatusBar text={state.status} />

			{/* TODO dialog should only cover the viewport!*/}
			<dialog open={!!fg_action} ref={refⵧdialog}>
				<p>{story}</p>
				<form method="dialog">
					<button onClick={() => {
						setFgAction(undefined)
						refⵧdialog.current.close()
					}}>Close</button>
				</form>
			</dialog>
		</div>
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
