import { useId } from 'react'

import { HeroIllustration } from '../../../../to-export-to-own-package/assets--heroes/types'

/////////////////////////////////////////////////

const DEBUG = true

interface Props {
	children: React.ReactNode // TODO way to include level, name etc.
	hero_illu: HeroIllustration
	width?: number
	height?: number // implicitly radius
}

function PlayerFrame(props: Props) {
	const id = useId()
	const NAME = `<PlayerFrame#${id}/>`

	const { width = 10, height = 10, hero_illu, children } = props

	return (
		<svg id={NAME} key={NAME}
		     width={width} height={height}
		     preserveAspectRatio="xMidYMid slice"
		     viewBox={`0 0 ${width} ${height}`}
		     style={{
			     filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4))',
		     }}
		>

			<defs>
				<pattern id="avatar" viewBox={hero_illu.avatar__viewport.join(' ')} height="100%" width="100%">
					<image href={hero_illu.url} x="0" y="0" width={hero_illu.width} height={hero_illu.height} />
				</pattern>
				<radialGradient id="myGradient">
					<stop offset="80%" stopColor="transparent"/>
					<stop offset="99%" stopColor="rgba(0,0,0,0.5)"/>
				</radialGradient>
			</defs>

			<circle id="avatar" cx={height / 2} cy={height / 2} r={height / 2.1} fill="url(#avatar)"/>
			<circle id="avatar-contour" cx={height / 2} cy={height / 2} r={height / 2.1} fill="url('#myGradient')" stroke="currentColor" strokeWidth="2px"/>


			{DEBUG && <>
				<line x1="0" y1="0" x2={width} y2={height} stroke="red"/>
				<line x1={width} y1="0" x2="0" y2={height} stroke="red"/>
			</>}
		</svg>
	)
}

/////////////////////////////////////////////////

export default PlayerFrame
