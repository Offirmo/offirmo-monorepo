import React, { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react-error-boundary'
import { LIB } from '@tbrpg/definitions'

import { ೱᐧpage_loaded } from '../../to-export-to-own-package/page-loaded/index.tsx'

import Root from './browser.tsx'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

/////////////////////////////////////////////////

async function init(): Promise<void> {
	getRootSXC().xTry('view', async ({ logger, SXC }) => {
		console.log('🔄 scheduling React start later…')
		await ೱᐧpage_loaded
		await schedule_when_idle_but_within_human_perception(() => {
			console.log('🔄 now starting view with react…')
			const root = createRoot(document.getElementById('react-root'))
			root.render(
				<StrictCheck>
					<ErrorBoundary name={`${LIB}ᐧroot`} SXC={SXC}>
						<Root />
					</ErrorBoundary>
				</StrictCheck>
			)
		})
	})
}

/////////////////////////////////////////////////

export default init
