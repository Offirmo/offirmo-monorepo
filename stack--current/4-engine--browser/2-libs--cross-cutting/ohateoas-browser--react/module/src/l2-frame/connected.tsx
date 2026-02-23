import React, { type CSSProperties, useState, useEffect } from 'react'

import {
	type Url‿str,
	getꓽuriⵧnormalized‿str,
} from '@monorepo-private/ts--types--web'
import renderⵧto_react from '@monorepo-private/rich-text-format--to-react'

import {
	type OHAHyperLink, type OHAStory, type OHAHyperAction, type OHAServer,
	create,
	navigate_to,
	onꓽloaded, isꓽOHAHyperLink,
} from '@monorepo-private/ohateoas'

import { ᄆComponent as ᄆComponent_ } from './component.tsx'

/////////////////////////////////////////////////
const NAME = `<OHAFrame>/2`

interface Props {
	available_width: CSSProperties['width']
	// TODO 1D chrome_type: 'borderless' | 'minimal' | 'full'
	server: OHAServer
	starting_url?: Url‿str
}
function ᄆComponent({available_width, starting_url = DEFAULT_ROOT_URI, server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const [state, setState] = useState(create(starting_url))

	useEffect(() => {
		const ↆ$doc = server.ↆget(state.urlⵧload)
		let connected = true
		ↆ$doc.then(
				$doc => {
					if (!connected) return

					setState(state => onꓽloaded(state, $doc))
				},
				err => {
					if (!connected) return

					setState(state => onꓽloaded(state, err))
				}
			)
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

		// just pass it on
		return server.dispatch(x, state.urlⵧself)
	}

	return (
		<ᄆComponent_ available_width={available_width} state={state} onꓽinteraction={onꓽinteraction} />
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
