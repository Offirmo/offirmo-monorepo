import { Fragment, StrictMode } from 'react'

import * as State from '@tbrpg/state'
import('./index.css')

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

export default function Root() {
	const s = State.create()
	return (
		<StrictCheck>
			<p>Hello, react world!</p>
		</StrictCheck>
	)
}
