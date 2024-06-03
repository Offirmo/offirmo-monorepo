import stylizeString from '@offirmo/cli-toolbox/string/stylize'
import boxify from '@offirmo/cli-toolbox/string/boxify'

import PKG_JSON from '../package.json' assert { type: 'json' }

console.log(boxify(`
const { getRootSXC } = require('${stylizeString.bold(PKG_JSON.name)}')

const SXC = getRootSXC()
SXC.setLogicalStack({
	module: APP,
})
SXC.injectDependencies({
	logger: console,
})
SXC.setAnalyticsDetails({
SXC.setAnalyticsAndErrorDetails({
	v: '2.3',
})
SXC.emitter.on('final-error', function onError({err}) {
	logger.fatal('error!', {err})
})
SXC.emitter.on('analytics', function onAnalyticsEvent({eventId, details}) {
	...
})

const { ENV } = SXC.getInjectedDependencies()
SXC.listenToUncaughtErrors()
SXC.listenToUnhandledRejections()
logger.trace('Soft Execution Context initialized.')

SXC.xTryCatch('starting', ({SXC, logger, ENV}) => {
	logger.trace({ENV})
	SXC.fireAnalyticsEvent(eventId, details)
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
import { getRootSXC } from '${stylizeString.bold(PKG_JSON.name)}'

const LIB = 'FOO'

function getꓽSXC(parent: SXC = getRootSXC()): SXC {
	// TODO memoize ? (if !parent)
	return parent
		.createChild()
		.setLogicalStack({module: LIB})
		.injectDependencies({
			name: parent.getInjectedDependencies().name || 'root',
	})
}

function hello(target, {SXC} = {}) {
	getꓽSXC(SXC).xTry('hello', ({SXC, logger}) => {
		...
	})
}

export {
	LIB,
	hello,
}
`.trim()))
