
// APP = use a port dedicated to your engine
import { getRootSXC } from '@offirmo-private/soft-execution-context'

import { createLogger } from '@offirmo/practical-logger-core'

import * as libⵧgood from './lib--good.ts'
import * as libⵧbad from './lib--bad.ts'
import * as libⵧnested from './lib--nested.ts'

const APP = 'appⵧdemo'

const logger = createLogger({
	name: APP,
	suggestedLevel: 'silly',
})

logger.log(`Hello from ${APP}...`)

// important: Root = direct init of root SXC
getRootSXC()
	.setLogicalStack({
		module: APP,
	})
	.setAnalyticsAndErrorDetails({
		v: '2.3',
	})
	.injectDependencies({
		logger,
		IS_VERBOSE: true,
	})

// TODO decorate with env infos (depending on port)

// important: Root = auto-catch
getRootSXC().xTryCatch<void>('starting', ({SXC, ENV, CHANNEL, IS_VERBOSE, IS_DEV_MODE, SESSION_START_TIME_MS, logger}) => {
	console.log(`XXX APP SXC`, {SESSION_START_TIME_MS, IS_VERBOSE, IS_DEV_MODE, ENV, CHANNEL})

	if (IS_VERBOSE) console.log(`\nstarting...`, {IS_VERBOSE, ENV, CHANNEL})

	SXC.emitter.on('final-error', function onError({err}) {
		// ex. report to server
		console.error(`[💣 error]`, err)
	})
	SXC.emitter.on('analytics', function onAnalyticsEvent({eventId, details}) {
		// ex. send to server
		console.log(`[🕴 analytics] "${eventId}"`, details)
	})

	SXC.fireAnalyticsEvent('started', {})

	logger.info('🎁 answer =', libⵧnested.baz_sync({SXC, q: 'answer?'}))
})
