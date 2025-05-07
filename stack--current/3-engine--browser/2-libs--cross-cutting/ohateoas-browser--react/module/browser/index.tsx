import React, { useState, useEffect } from 'react'

import { getꓽuriⵧnormalized‿str, Url‿str } from '@offirmo-private/ts-types-web'
import {
	type OHAServer,
	isꓽOHAHyperLink,
	type OHAHyperLink, type OHAHyperLink‿x, type OHAHyperAction,
	type OHAStory,
} from '@offirmo-private/ohateoas'

import ᄆFrame from './frame/index.tsx'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

interface Props {
	server: OHAServer
}

function ᄆComponent({server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 Browser')

	const [ url, setUrl ] = useState<Url‿str>('/')

	const ↆ$doc = server.ↆget(url)

	// TODO move to state
	function navigate_to(link: OHAHyperLink‿x, options?: {
		type?: 'push' | 'replace'
		reload?: boolean // force (re)load even if same url
	} = {}) {
		const {
			type = 'push',
			reload = false,
		} = options

		const target_str = (() => {
			if (isꓽOHAHyperLink(link)) {
				return getꓽuriⵧnormalized‿str(link.href)
			}

			if (typeof link === 'string') {
				return getꓽuriⵧnormalized‿str(link)
			}

			throw new Error(`Not implemented!`)
		})()


		if (target_str === url && !reload) {
			return
		}

		setUrl(target_str)
	}

	async function onꓽinteraction(x: OHAHyperAction | OHAHyperLink): Promise<OHAStory | undefined> {
		if (isꓽOHAHyperLink(x)) {
			navigate_to(x)
			return undefined
		}

		// TODO sechedule refresh!
		return server.dispatch(x, url)
	}

	return (
		<ᄆFrame url={url} ↆ$doc={ↆ$doc} onꓽinteraction={onꓽinteraction} />
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
