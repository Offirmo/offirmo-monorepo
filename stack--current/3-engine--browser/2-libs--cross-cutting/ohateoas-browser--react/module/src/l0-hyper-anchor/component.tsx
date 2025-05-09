import React, { useState, useRef } from 'react'

import {
	getꓽuriⵧnormalized‿str,
} from '@offirmo-private/ts-types-web'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

import {
	type OHAHyperLink,
	getꓽcta,
} from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////
const NAME = `OHAAnchor/1`

interface Props {
	href: OHAHyperLink
	onꓽinteraction: (link: OHAHyperLink) => void
}
function ᄆComponent({href, onꓽinteraction}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const href_str = getꓽuriⵧnormalized‿str(href)
	const $cta = getꓽcta(href)

	return (
			<a
				href={href_str}
				onClick={() => onꓽinteraction(href)}
			>
				{renderⵧto_react($cta)}
			</a>
		)
}

/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
