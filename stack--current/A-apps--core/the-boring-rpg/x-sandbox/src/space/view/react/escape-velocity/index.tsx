import React, { use, useId, useEffect, useState } from 'react'

import { HyperSpace} from '../hyperspace'
import { StarrySky } from '../starry-sky'

/////////////////////////////////////////////////

interface Props {
}

type Screen =
	| 'orbit'
	| 'planet'
	| 'travel'

function EscapeVelocity(props: Props = {}) {
	const [ screen, setScreen ] = useState<Screen>('travel')
	const [ travelTimeout, setTravelTimeout ] = useState<ReturnType<typeof setTimeout> | undefined>(undefined)

	const content = (() => {
		switch (screen) {
			case 'orbit':
				return (
					<div>
						<StarrySky/>
						<div className="o⋄fill-parent" style={{}}>
							<button onClick={() => setScreen('planet')}>Land</button>
							<button onClick={() => setScreen('travel')}>Warp to next planet</button>
						</div>
					</div>
				)
			case 'planet':
				return (
					<div>
					<StarrySky/>
						<div className="o⋄fill-parent" style={{}}>
							TODO planet on top
							<button onClick={() => setScreen('orbit')}>Leave</button>
						</div>
					</div>
				)
			case 'travel':
				return <HyperSpace />
			default:
				throw new Error('Unknown screen!')
		}
	})()

	if (screen === 'travel' && !travelTimeout) {
		const timeout = setTimeout(() => {
			setScreen(prev => {
				setTravelTimeout(undefined)
				return prev === 'travel'
					? 'orbit'
					: prev
			})
		}, 3000)
	}

	return (
		<div className="o⋄full-viewport" data-o-theme='dark' style={{}}>
			{
				content
			}
		</div>
	)
}

/////////////////////////////////////////////////

export {
	type Props,
	EscapeVelocity,
}
export default EscapeVelocity
