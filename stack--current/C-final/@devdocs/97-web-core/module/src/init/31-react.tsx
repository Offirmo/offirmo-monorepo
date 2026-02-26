import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation' // https://agentation.dev/install

import { getRootSXC } from '@monorepo-private/soft-execution-context'
import { schedule_when_idle_but_within_human_perception } from '@monorepo-private/utils--async'
import ErrorBoundary from '@monorepo-private/react--error-boundary'

import { LIB } from '../consts.ts'

import { ೱᐧpage_loaded } from '@monorepo-private/page-loaded'

import { CHANNEL } from '../cross-cutting/channel'
import { Root } from '../components/root'

/////////////////////////////////////////////////

const OptionalStrictCheck = CHANNEL === 'dev' ? StrictMode : Fragment

/////////////////////////////////////////////////

async function init(): Promise<void> {
	getRootSXC().xTry('view', async ({ logger, SXC }) => {
		// reminder: we assume there is a beautiful loader which started synchronously, so no rush
		console.log('🔄 scheduling React start later…')
		await ೱᐧpage_loaded

		await schedule_when_idle_but_within_human_perception(() => {
			console.log('🔄 now starting view with react…')
			const root = createRoot(document.getElementById('react-root'))
			root.render(
				<>
					<OptionalStrictCheck>
						<ErrorBoundary name={`${LIB}ᐧroot`} SXC={SXC}>
							<Root />
						</ErrorBoundary>
					</OptionalStrictCheck>
					{CHANNEL === 'dev' && <Agentation />}
				</>,
			)
		})
	})
}

/////////////////////////////////////////////////

export default init
