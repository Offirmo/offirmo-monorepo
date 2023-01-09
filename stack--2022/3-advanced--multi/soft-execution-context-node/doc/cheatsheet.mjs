import stylizeString from '@offirmo/cli-toolbox/string/stylize.mjs'
import boxify from '@offirmo/cli-toolbox/string/boxify.mjs'

import PKG_JSON from '../package.json' assert { type: 'json' }

console.log(boxify(`
const { createLogger } = require('@offirmo/practical-logger-node')
const { getRootSEC } = require('@offirmo-private/soft-execution-context')
const {
	listenToUncaughtErrors,
	listenToUnhandledRejections,
	decorateWithDetectedEnv,
} = require('${stylizeString.bold(PKG_JSON.name)}')

const APP = 'DEMO'

const logger = createLogger({
	name: APP,
	suggestedLevel: 'silly',
})

const SEC = getRootSEC()
	.setLogicalStack({ module: APP })
	.injectDependencies({ logger })

SEC.emitter.on('final-error', function onError({logger, err}) {
	logger.fatal('error!', {err})
})

SEC.emitter.on('analytics', function onError({SEC, eventId, details}) { … })

listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

// Top uses tryCatch
SEC.xTryCatch('starting', ({SEC, logger}) => { ...
`.trim()))
