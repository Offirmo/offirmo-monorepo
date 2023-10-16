import stylizeString from '@offirmo/cli-toolbox/string/stylize'
import boxify from '@offirmo/cli-toolbox/string/boxify'

import PKG_JSON from '../package.json' assert { type: 'json' }

console.log(boxify(`
const { getRootSEC } = require('${stylizeString.bold(PKG_JSON.name)}')

const SEC = getRootSEC()
SEC.setLogicalStack({
	module: APP,
})
SEC.injectDependencies({
	logger: console,
})
SEC.setAnalyticsDetails({
SEC.setAnalyticsAndErrorDetails({
	v: '2.3',
})
SEC.emitter.on('final-error', function onError({err}) {
	logger.fatal('error!', {err})
})
SEC.emitter.on('analytics', function onAnalyticsEvent({eventId, details}) {
	...
})

const { ENV } = SEC.getInjectedDependencies()
SEC.listenToUncaughtErrors()
SEC.listenToUnhandledRejections()
logger.trace('Soft Execution Context initialized.')

SEC.xTryCatch('starting', ({SEC, logger, ENV}) => {
	logger.trace({ENV})
	SEC.fireAnalyticsEvent(eventId, details)
	...
})

xTry,
xTryCatch,
xPromiseTry,
xPromiseCatch,
xPromiseTryCatch,
`.trim()))


////////

console.log(boxify(`
import { getRootSEC } from '${stylizeString.bold(PKG_JSON.name)}'

const LIB = 'FOO'

function getꓽSEC(parent: SEC = getRootSEC()): SEC {
	// TODO memoize ? (if !parent)
	return parent
		.createChild()
		.setLogicalStack({module: LIB})
		.injectDependencies({
			name: parent.getInjectedDependencies().name || 'root',
	})
}

function hello(target, {SEC} = {}) {
	getꓽSEC(SEC).xTry('hello', ({SEC, logger}) => {
		...
	})
}

export {
	LIB,
	hello,
}
`.trim()))
