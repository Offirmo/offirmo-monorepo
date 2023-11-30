import { Fragment, StrictMode } from 'react'

import('./index.css')

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

export default function Root() {
	return (
		<StrictCheck>
			<p>Hello, react world!</p>
		</StrictCheck>
	)
}
