import React, { useState, useEffect, type PropsWithChildren } from 'react'

import { getꓽuriⵧnormalized‿str, Url‿str } from '@offirmo-private/ts-types-web'
import {
	type OHAServer,
	isꓽOHAHyperLink,
	type OHAHyperLink, type OHAHyperLink‿x, type OHAHyperAction,
	type OHAStory,
} from '@offirmo-private/ohateoas'

import ᄆFrame from '../l2-frame/index.tsx'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

const NAME = `OHARoot`

interface State {

}
interface Props {
	server: OHAServer
}
function ᄆComponent({server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	return (
		<main key={NAME} className={['o⋄fill-parent']}>

			<ᄆFrameContainer key="root" mode="fill">
				<ᄆFrame server={server} name={'root'} />
			</ᄆFrameContainer>
		</main>
	)
}

/////////////////////////////////////////////////
type FrameContainerProps = PropsWithChildren<{
	mode: 'fill' | 'minimal' | 'full'
}>
function ᄆFrameContainer({ mode, children }: FrameContainerProps) {

	return (
		<div style={{position: 'absolute', top: 10, left: 10, width: 300, height: 500}}>
			{children}
		</div>
	)
}
/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
