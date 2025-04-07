import stylizeString from '@offirmo/cli-toolbox/string/stylize'
import boxify from '@offirmo/cli-toolbox/string/boxify'

import PKG_JSON from '../package.json' with { type: 'json' }

console.log(boxify(`
const { createLogger } = require('@offirmo/practical-logger-node')
const { getRootSXC } = require('@offirmo-private/soft-execution-context')
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

const SXC = getRootSXC()
	.setLogicalStack({ module: APP })
	.injectDependencies({ logger })

SXC.emitter.on('final-error', function onError({logger, err}) {
	logger.fatal('error!', {err})
})

SXC.emitter.on('analytics', function onError({SXC, eventId, details}) { … })

listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

// Top uses tryCatch
SXC.xTryCatch('starting', ({SXC, logger}) => { ...
`.trim()))
