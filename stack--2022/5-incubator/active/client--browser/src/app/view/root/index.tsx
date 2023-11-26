import { Fragment, StrictMode } from 'react'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

export default function Root() {
	return (
		<StrictCheck>
			<p>Hello, world!</p>
		</StrictCheck>
	)
}
