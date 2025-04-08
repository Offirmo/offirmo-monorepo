
/////////////////////////////////////////////////

const { createLogger } = require('@offirmo/practical-logger-node')
import {
	getRootSXC,
	listenToUncaughtErrors,
	listenToUnhandledRejections,
	decorateWithDetectedEnv,
} from '@offirmo-private/soft-execution-context--node'

const APP = 'SXC_NODE_DEMO'

const logger = createLogger({
	name: APP,
	suggestedLevel: 'silly',
})

logger.notice(`Hello from ${APP}...`)

getRootSXC()
	.setLogicalStack({
		module: APP,
	})
	.injectDependencies({
		logger,
	})

getRootSXC().emitter.on('final-error', function onError({SXC, err}) {
	logger.log('that', {err})

	// or direct to reporter
	SXC.fireAnalyticsEvent('error', {
		...err.details,
		message: err.message,
	})
})

getRootSXC().emitter.on('analytics', function onError({SXC, eventId, details}) {
	console.groupCollapsed(`⚡  Analytics! ⚡  ${eventId}`)
	console.log('details', details)
	console.groupEnd()
})

listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

/////////////////////////////////////////////////


import * as good_lib from './good_lib.ts'

// Top uses tryCatch
getRootSXC().xTryCatch('starting', ({SXC, logger}) => {
	const good_lib_inst = good_lib.create({SXC})
	SXC.xTry('calling good lib', () => good_lib_inst.foo_sync({x: 1}))

	//throw new Error('Ha ha')

	SXC.xPromiseTry('crashing in a promise', () => {
		throw new Error('Ho ho')
	})
})
