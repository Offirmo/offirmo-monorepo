import { getRootSEC } from '@offirmo-private/soft-execution-context'
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	// TODO one day select new analytics provider

	const rootSEC = getRootSEC()

	rootSEC.emitter.on('analytics', function onAnalytics({SEC, eventId, details}) {
		// TODO analytics
		console.groupCollapsed(`⚡  [TODO] Analytics! ⚡  ${eventId}`)
		console.table('details', details)
		console.groupEnd()
	})

	rootSEC.xTry('init:analytics', ({logger, SEC}) => {
		logger.debug('Root SEC is now decorated with analytics details ✔', SEC.getAnalyticsDetails())
	})
}

/////////////////////////////////////////////////

export default init
