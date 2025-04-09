import { createLogger } from '@offirmo/practical-logger-core'
import { getRootSXC } from '@offirmo-private/soft-execution-context'

const logger = createLogger({
	name: 'root',
	suggestedLevel: 'silly',
})
logger.log(`Logger up.`)

getRootSXC()
	.injectDependencies({
		logger,
		IS_VERBOSE: true,
	})


getRootSXC().emitter.on('final-error', function onError({SXC, err}) {
	console.error(`[💣 error]`, err)

	// maybe report to server
	// sentry.xyz()

	// or direct to analytics
	SXC.fireAnalyticsEvent('error', {
		...err.details,
		message: err.message,
	})
})
getRootSXC().emitter.on('analytics', function onAnalyticsEvent({eventId, details}) {
	// ex. send to server
	console.groupCollapsed(`[🕴 analytics] "${eventId}"`)
	console.log('details', details)
	console.groupEnd()
})


// TODO decorate with env infos (depending on port)

import { start } from './examples/app.ts'
start()
