import { getRootSXC } from '@offirmo-private/soft-execution-context'
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	// TODO one day select new analytics provider

	const rootSXC = getRootSXC()

	rootSXC.emitter.on('analytics', function onAnalytics({SXC, eventId, details}) {
		// TODO analytics
		console.groupCollapsed(`⚡  [TODO] Analytics! ⚡  ${eventId}`)
		console.table('details', details)
		console.groupEnd()
	})

	rootSXC.xTry('init:analytics', ({logger, SXC}) => {
		logger.debug('Root SXC is now decorated with analytics details ✔', SXC.getAnalyticsDetails())
	})
}

/////////////////////////////////////////////////

export default init
