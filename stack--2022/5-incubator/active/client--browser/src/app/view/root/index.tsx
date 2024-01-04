import { StrictMode, Profiler } from 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'
import * as State from '@tbrpg/state'

import './index.css'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

function on_render(...args) {
	console.log(args)
}

export default function Root() {
	const s = State.create()
	return (
		<StrictCheck>
			<Profiler id="root" onRender={on_render}>
				<ErrorBoundary name="root">
					<p>Hello, react world!</p>
				</ErrorBoundary>
			</Profiler>
		</StrictCheck>
	)
}
