import React, { use, useId, useEffect } from 'react'

import './index.css'

interface Props {

}


export default function HyperSpace() {


	return (
		<div className="o⋄fill-parent o⋄hyperspace-animation container" style={{}}>
			<div className="scene">
				<div className="wrap">
					<div className="wall wall-right"></div>
					<div className="wall wall-left"></div>
					<div className="wall wall-top"></div>
					<div className="wall wall-bottom"></div>
					<div className="wall wall-back"></div>
				</div>
				<div className="wrap">
					<div className="wall wall-right"></div>
					<div className="wall wall-left"></div>
					<div className="wall wall-top"></div>
					<div className="wall wall-bottom"></div>
					<div className="wall wall-back"></div>
				</div>
			</div>
		</div>
	)
}
