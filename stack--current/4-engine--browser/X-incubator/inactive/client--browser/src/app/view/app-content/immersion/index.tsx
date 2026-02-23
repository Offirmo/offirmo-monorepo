import { useEffect, useState, useRef } from 'react'

import { type Immutable, PositiveInteger } from '@monorepo-private/ts--types'
import ErrorBoundary from '@monorepo-private/react--error-boundary'
import { getꓽrandom, getꓽengine } from '@offirmo/random'

import { Background } from '../../../../to-export-to-own-package/assets--background/types.ts'

/////////////////////////////////////////////////

const { format: formatForSize } = new Intl.NumberFormat('en', {
	style: 'decimal',
	maximumFractionDigits: 1,
	minimumFractionDigits: 0,
	useGrouping: false,
})

const DEBUG = false
const rng_engine = getꓽengine.good_enough()

interface Props {
	bg: Immutable<Background>,
	alt_alignment?: boolean | PositiveInteger | 'random'
	width?: number
	height?: number
}
function Immersion(props: Props) {
	const NAME = '<Immersion>'
	const [ref, setRef] = useState<ReturnType<typeof useRef>>();

	if (document.readyState !== 'complete') {
		// viewport sizing is not always available before the page is loaded
		return null
	}

	const { bg } = props
	const isꓽexplicitly_sized = props.width && props.height

	const {
		width = 10,
		height = 10,
	} = isꓽexplicitly_sized
		? props
		: (ref?.getBoundingClientRect() || {})
	console.log(`${NAME} render()`, { width, height })

	const viewBox‿arr = (() => {
		// TODO reproduce the algorithm of bg position...
		// https://developer.mozilla.org/en-US/docs/Web/CSS/background-position

		// first, are we sliding horizontally or vertically?
		const bg_ratio = bg.width / bg.height
		const view_ratio = width / height
		const is_wider = bg_ratio > view_ratio

		if (is_wider) {
			const vp_width = bg.height * view_ratio
			const max_x = bg.width - vp_width
			const focus: number = (() => {
				const candidates = bg.focusesⵧhorizontal

				if (candidates.length === 1)
					return candidates[0]!

				switch (props.alt_alignment) {
					case 'random':
						return getꓽrandom.picker.of(candidates)(rng_engine)
					default:
						return candidates[Number(props.alt_alignment)]!
				}
			})()
			return [
				max_x * Math.min(100, Math.max(0, focus)),
				0,
				vp_width,
				bg.height,
			]
		}

		const vp_height = bg.width / view_ratio
		const max_y = bg.height - vp_height
		const focus: number = (() => {
			const candidates = bg.focusesⵧvertical

			if (candidates.length === 1)
				return candidates[0]!

			switch (props.alt_alignment) {
				case 'random':
					return getꓽrandom.picker.of(candidates)(rng_engine)
				default:
					return candidates[Number(props.alt_alignment)]!
			}
		})()
		return [
			0,
			max_y * Math.min(100, Math.max(0, focus)),
			bg.width,
			vp_height,
		]
	})()
	console.log({ viewBox‿arr })

	// https://alistapart.com/article/practical-svg/
	return (
		<svg debug-id={NAME} key={NAME} {...!isꓽexplicitly_sized && { className: 'o⋄fill-parent'}}
		     width={width} height={height}
		     preserveAspectRatio="xMidYMid slice"
		     ref={new_ref => setRef(new_ref)}
		     viewBox={viewBox‿arr.map(formatForSize).join(' ')}
		>
			<image href={bg.url} x="0" y="0" height={bg.height} width={bg.width}/>

			{DEBUG && <>
				<line x1="0" y1="0" x2={bg.width} y2={bg.height} stroke="red"/>
				<line x1={bg.width} y1="0" x2="0" y2={bg.height} stroke="red"/>
				<line x1={viewBox‿arr[0]} y1={viewBox‿arr[1]} x2={viewBox‿arr[0] + viewBox‿arr[2]} y2={viewBox‿arr[1] + viewBox‿arr[3]} stroke="green"/>
			</>}

		</svg>
	)
}

/////////////////////////////////////////////////

export default Immersion
