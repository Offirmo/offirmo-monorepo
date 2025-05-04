import React, { use } from 'react'

import type { Url‿str } from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	type OHAHyperMedia,
	getꓽaction_blueprints, getꓽcta,
} from '@offirmo-private/ohateoas'

import ᄆChrome from './chrome/index.tsx'

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

	const action_blueprints = getꓽaction_blueprints($doc)

	return (
		<div>
			<ᄆChrome url={url} />

			<div>
				[TODO top notifs]
			</div>

			<hr/>

			{renderⵧto_react($doc)}

			<hr/>

			{Object.values(action_blueprints).map((action_blueprint) => {
				return <button key={action_blueprint.key}>{getꓽcta(action_blueprint)}</button>
			})}

			<hr/>

			<ᄆBackgroundTasks />
		</div>
	)
}

/////////////////////////////////////////////////

export default ᄆComponent
