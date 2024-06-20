import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'

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
