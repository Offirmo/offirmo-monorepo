import assert from 'tiny-invariant'
import React, { type CSSProperties, type PropsWithChildren } from 'react'

import {
	DEFAULT_ROOT_URI,
	type OHAServer,
	isꓽOHAHyperLink,
	type OHAHyperLink, type OHAHyperLink‿x, type OHAHyperAction,
	type OHAStory, type Url‿str,
	getꓽuriⵧnormalized‿str,
} from '@offirmo-private/ohateoas'

import ᄆFrame from '../l2-frame/index.tsx'

/////////////////////////////////////////////////

interface FrameSpec {
	name: string // must be unique, to be used in links "target"

	// if present, matching links will be automatically intercepted to be opened in this frame
	// subset of https://urlpattern.spec.whatwg.org/
	urlⵧpattern?: {
		pathname: string
	}

	urlⵧhome?: Url‿str

	title?: string // to be used in the title bar, if any

	posture:
		| 'sovereign'  // monopolizes the user's attention for long periods of time (full screen)
		| 'transient'  // comes and goes, appears and performs its job, then quickly leaves, letting the user continue her more normal activity (usually a sovereign application)
		//| 'background' // TODO REVIEW needed? background processes that require no direct user interaction
		| 'auxiliary'  // provide a limited, focused set of functionality and occupy a small space, but are shown persistently and can be used for a long period of time

	// if present, restrict max size
	max_size?:
		| 'small'  // ~mobile
		| 'medium' // ~tablet
		| 'large'  // ~desktop
}

const FRAME_SPECⵧROOT: FrameSpec = {
	name: 'root',
	posture: 'sovereign',
}

/////////////////////////////////////////////////

const NAME = `<OHARoot>`

interface Props {
	available_width: CSSProperties['width']
	server: OHAServer
}
function ᄆComponent({available_width = '100vw', server}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log(`🔄 ${NAME}`)

	const frame_specs = {
		root: FRAME_SPECⵧROOT,
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API

	return (
		<main key={NAME} className={['o⋄fill-parent']}>

			{...Object.keys(frame_specs).sort().map(name => {
				const spec = frame_specs[name]

				assert(spec.urlⵧpattern ? spec.urlⵧhome : true, `urlⵧhome is mandatory if urlⵧpattern is present`)
				const urlⵧhome = getꓽuriⵧnormalized‿str(spec.urlⵧhome ?? DEFAULT_ROOT_URI)

				return (
					<ᄆFrameContainer key={name} spec={spec}>
						<ᄆFrame available_width={available_width} server={server} starting_url={urlⵧhome}/>
					</ᄆFrameContainer>
				)
			})}
		</main>
	)
}

/////////////////////////////////////////////////
type FrameContainerProps = PropsWithChildren<{
	available_width: CSSProperties['width']
	spec: FrameSpec
}>
const STYLE: CSSProperties = {
	position: 'absolute',
}
function ᄆFrameContainer({ spec, children, available_width }: FrameContainerProps) {
	let style: CSSProperties = {
		// common properties
	}
	let className = 'oha-frame-container'

	if (!spec.max_size) className += ' o⋄fill-parent'

	return (
		<section style={style} className={className}>
			{children}
		</section>
	)
}
/////////////////////////////////////////////////

export {
	type Props,
	ᄆComponent,
}
