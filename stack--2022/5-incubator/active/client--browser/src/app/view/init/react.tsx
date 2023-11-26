import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react-error-boundary'

import Root from '../root'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

/////////////////////////////////////////////////

async function init(): Promise<void> {
	schedule_when_idle_but_within_human_perception(() => {
		console.log('🔄 starting react…')
		const root = createRoot(document.getElementById('root'))
		root.render(
			<ErrorBoundary name={'tbrpg_root'}>
				<StrictCheck>
					<Root />
				</StrictCheck>
			</ErrorBoundary>
		)
	})
}

/////////////////////////////////////////////////

export default init
