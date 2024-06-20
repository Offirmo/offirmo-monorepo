import { useEffect, useState, useRef } from 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

/////////////////////////////////////////////////

const { format: formatForSize } = new Intl.NumberFormat('en', {
	style: 'decimal',
	maximumFractionDigits: 0,
	minimumFractionDigits: 0,
	useGrouping: false,
})

interface Props {
	width?: number
	height?: number
}
function Immersion(props: Props) {
	const [ref, setRef] = useState<ReturnType<typeof useRef>>();

	if (document.readyState !== 'complete') {
		// viewport sizing is not always available before the page is loaded
		return null
	}

	const isꓽexplicitly_sized = props.width && props.height

	const {
		width = 10,
		height = 10,
	} = isꓽexplicitly_sized
		? props
		: (ref?.getBoundingClientRect() || {})
	console.log(`Immersion`, { width, height })

	// https://alistapart.com/article/practical-svg/
	return (
		<svg className={isꓽexplicitly_sized ? '' : 'o⋄fill-parent'}
			width={width} height={height}
			preserveAspectRatio="xMidYMid slice"
			ref={new_ref => setRef(new_ref)}
			viewBox={`0 0 ${width} ${height}`}
		>
			<line x1="0" y1="0" x2={width} y2={height} stroke="red"/>
		</svg>
	)
}

/////////////////////////////////////////////////

export default Immersion
