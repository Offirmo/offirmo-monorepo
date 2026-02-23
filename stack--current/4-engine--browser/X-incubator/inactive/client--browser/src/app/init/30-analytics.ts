import assert from 'tiny-invariant'
import { type Immutable } from '@monorepo-private/ts--types'
import { getRootSXC } from '@monorepo-private/soft-execution-context'
import { schedule_when_idle_but_not_too_far } from '@monorepo-private/utils--async'

import { ೱᐧpage_loaded } from '../../to-export-to-own-package/viewport-utils'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	await ೱᐧpage_loaded

	schedule_when_idle_but_not_too_far(() => {
		const rootSXC = getRootSXC()

		rootSXC.xTry('init:analytics', ({logger, SXC}) => {
			logger.debug('Root SXC is now decorated with analytics details ✔', SXC.getAnalyticsDetails())
		})

		// TODO select and wire analytics provider

		rootSXC.emitter.on('analytics', function onAnalytics({SXC, eventId, details}) {
			// TODO analytics
			console.groupCollapsed(`⚡  [TODO] Analytics! ⚡  ${eventId}`)
			console.table('details', details)
			console.groupEnd()
		})
	})
}

/////////////////////////////////////////////////

export default init
