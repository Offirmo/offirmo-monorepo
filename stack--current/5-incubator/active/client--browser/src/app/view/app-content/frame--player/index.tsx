import { useState, useRef, useId, type SVGProps } from 'react'

import { HeroIllustration } from '../../../../to-export-to-own-package/assets--heroes/types'

/////////////////////////////////////////////////

const DEBUG = true

interface Props {
	width: number
	height: number
	name: string
	hero_illu: HeroIllustration
	resume: string
	on_click?: () => void
	//children: React.ReactNode // TODO way to include level, name etc.
}

function PlayerFrame(props: Props) {
	const id = useId()
	const NAME = `<PlayerFrame#${id}/>`

	const {
		width = 10,
		height = 10,
		hero_illu,
		name, resume,
		on_click,
	} = props

	return (
		<svg id={NAME} key={NAME}
		     width={width} height={height}
		     preserveAspectRatio="xMidYMid slice"
		     viewBox={`0 0 ${width} ${height}`}
		     style={{
			     filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4))',
			     ...(on_click && {cursor: 'pointer'}),
		     }}
		     onClick={on_click}
		>

			<Avatar x={0} y={0} width={height} height={height} {...{hero_illu, name}}/>
			<text x={height} y={height * .75} fill="currentColor">{resume}</text>

			{DEBUG && <>
				<line x1="0" y1="0" x2={width} y2={height} stroke="red"/>
				<line x1={width} y1="0" x2="0" y2={height} stroke="red"/>
			</>}
		</svg>
	)
}


function Avatar(props: {name: string,
	hero_illu: HeroIllustration} & SVGProps<SVGSVGElement>) {
	const NAME = `<Avatar/>`
	const SIZE = 145
	const MID = 72
	const CARTOUCHE_HEIGHT = SIZE / 6
	const AVATAR_RADIUS = SIZE * 0.45
	const [nameRef, setNameRef] = useState<ReturnType<typeof useRef>>();

	const {
		hero_illu,
		name,
		...svg_props,
	} = props

	let {
		width: name_text__width = SIZE,
		height: name_text__height = CARTOUCHE_HEIGHT,
	} = nameRef?.getBBox() || {}
	const name_cartouche__width = Math.min(SIZE, name_text__width + CARTOUCHE_HEIGHT)
	const name_cartouche__height = CARTOUCHE_HEIGHT
	const name_font_size_adjustment = name.length > 10 ? 0.6 : 0.8

	console.log(`${NAME} nameRef rect`, )

	return (
		<svg id={NAME} key={NAME} viewBox={`0 0 ${SIZE} ${SIZE}`} {...svg_props}>

			<defs>
				<pattern id="avatar" viewBox={hero_illu.avatar__viewport.join(' ')} height="100%" width="100%">
					<image href={hero_illu.url} x="0" y="0" width={hero_illu.width} height={hero_illu.height}/>
				</pattern>
				<radialGradient id="myGradient">
					<stop offset="80%" stopColor="transparent"/>
					<stop offset="99%" stopColor="rgba(0,0,0,0.5)"/>
				</radialGradient>
			</defs>

			<circle key="avatar-illu" cx={MID} cy={MID} r={AVATAR_RADIUS} fill="url(#avatar)"/>
			<circle key="avatar-contour" cx={MID} cy={MID} r={AVATAR_RADIUS} fill="url('#myGradient')" stroke="currentColor" strokeWidth="2px"/>

			<rect x={MID - name_cartouche__width/2} y={SIZE - name_cartouche__height} width={name_cartouche__width} height={name_cartouche__height} fill="var(--o⋄color⁚bg--main)" stroke="currentColor" strokeWidth="2px" rx={10}/>
			<text ref={new_ref => setNameRef(new_ref)}
			      textAnchor="middle" x={72} y={SIZE - name_text__height * 0.4} fill="currentColor" style={{fontSize: `${CARTOUCHE_HEIGHT * name_font_size_adjustment}px`, backgroundColor: 'var(--o⋄color⁚bg--main)'}}>{name}</text>
		</svg>
	) // TODO text vertical alignment on Y
}

/////////////////////////////////////////////////

export default PlayerFrame
