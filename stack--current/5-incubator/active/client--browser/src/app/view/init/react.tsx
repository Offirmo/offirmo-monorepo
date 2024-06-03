import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react-error-boundary'

import { LIB } from '../../consts.ts'
import App from '../app'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

/////////////////////////////////////////////////

async function init(): Promise<void> {
	schedule_when_idle_but_within_human_perception(() => {
		console.log('🔄 starting react…')
		const root = createRoot(document.getElementById('react-root'))
		root.render(
			<StrictCheck>
				<ErrorBoundary name={`${LIB}ᐧroot`}>
					<App />
				</ErrorBoundary>
			</StrictCheck>
		)
	})
}

/////////////////////////////////////////////////

export default init
