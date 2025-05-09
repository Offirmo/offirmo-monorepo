import React, { useState, useEffect } from 'react'

import {
	type Url‿str,
	getꓽuriⵧnormalized‿str,
} from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer,
	create,
	navigate_to,
	onꓽloaded, isꓽOHAHyperLink, getꓽlinks, LINK__REL__CONTINUE_TO,
} from '@offirmo-private/ohateoas'

import { ᄆComponent as ᄆComponent_ } from './component.tsx'

/////////////////////////////////////////////////
const NAME = `OHAFrame/2`

interface Props {
	name: string
	// TODO 1D chrome_type: 'borderless' | 'minimal' | 'full'
	server: OHAServer
	url: Url‿str
}
function ᄆComponent({name, url, server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const [state, setState] = useState(navigate_to(create(), {href: url}))

	useEffect(() => {
		const ↆ$doc = server.ↆget(state.urlⵧload)
		let connected = true
		ↆ$doc.then($doc => {
			if (!connected) return

			if (getꓽlinks($doc)[LINK__REL__CONTINUE_TO]) {
				// direct navigation
				setState(state => navigate_to(state, getꓽlinks($doc)[LINK__REL__CONTINUE_TO]))
			}
			else {
				setState(state => onꓽloaded(state, $doc))
			}
		})
		return () => {
			connected = false
		}
	}, [state.urlⵧload, state.reload_counter]);

	function onꓽinteraction(x: OHAHyperAction | OHAHyperLink | 'reload'): Promise<OHAStory | undefined> {

		if (x === 'reload') {
			setState(state => navigate_to(state, {href: state.urlⵧself, reload: true}))
			return Promise.resolve(undefined)
		}

		if (isꓽOHAHyperLink(x)) {
			setState(state => navigate_to(state, x))
			return Promise.resolve(undefined)
		}

		return server.dispatch(x, state.urlⵧself)
	}

	return (
		<ᄆComponent_ state={state} onꓽinteraction={onꓽinteraction} />
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
