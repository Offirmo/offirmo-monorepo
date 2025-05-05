import React, { useState, useRef } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	type OHAHyperMedia,
	getꓽaction_blueprints,
	getꓽcta,
	OHAHyperActionBlueprint,
	deriveꓽaction,
} from '@offirmo-private/ohateoas'

import ᄆChrome from './chrome/index.tsx'

import './component.css'

/////////////////////////////////////////////////

interface BackgroundTask {

}

function ᄆBackgroundTasks() {
	return (
		<div>
			[TODO background tasks]
		</div>
	)
}

interface Props {
	$doc: OHAHyperMedia
	url: Url‿str
}
function ᄆComponent({url, $doc}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Frame/1')

	const refⵧdialog = useRef(undefined)
	const [fg_action, setFgAction] = useState<undefined | Promise<unknown>>(undefined)

	const action_blueprints = getꓽaction_blueprints($doc)

	function on_click_action(action_blueprint: OHAHyperActionBlueprint) {
		const { action, feedback } = deriveꓽaction(action_blueprint)

		console.log(`on_click_action`, action_blueprint, action, feedback)

		// TODO dispatch the action
		let task = Promise.resolve('foo')
		setFgAction(task)
		refⵧdialog.current.showModal()
	}

	return (
		<div>
			<ᄆChrome url={url} />

			<div>
				<div>
					[TODO top notifs]
				</div>

				<hr/>

				{renderⵧto_react($doc)}

				<hr/>

				{Object.values(action_blueprints).map((action_blueprint) => {
					return <button
						key={action_blueprint.key}
						onClick={() => {
							on_click_action(action_blueprint)
						}}
					>{getꓽcta(action_blueprint)}</button>
				})}

				<hr/>

				<ᄆBackgroundTasks />

				<dialog open={!!fg_action} ref={refⵧdialog}>
					<p>Task in progress…</p>
					<form method="dialog">
						<button>OK</button>
					</form>
				</dialog>
			</div>
		</div>
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
