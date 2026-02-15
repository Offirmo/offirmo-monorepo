import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react--error-boundary'

import { LIB } from '../consts.ts'

import { ೱᐧpage_loaded } from '@offirmo-private/page-loaded'

import Root from '../view'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

/////////////////////////////////////////////////

async function init(): Promise<void> {
	getRootSXC().xTry('view', async ({ logger, SXC }) => {
		// reminder: we assume there is a beautiful loader which started synchronously, so no rush
		console.log('🔄 scheduling React start later…')
		await ೱᐧpage_loaded

		await schedule_when_idle_but_within_human_perception(() => {
			console.log('🔄 now starting view with react…')
			const root = createRoot(document.getElementById('react-root'))
			// TODO 1D make StrictCheck optional + add other dev tools?
			root.render(
				<StrictCheck>
					<ErrorBoundary name={`${LIB}ᐧroot`} SXC={SXC}>
						<Root />
					</ErrorBoundary>
				</StrictCheck>,
			)
		})
	})
}

/////////////////////////////////////////////////

export default init
