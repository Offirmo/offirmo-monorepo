
// LIB = use the generic SXC lib
import { type SoftExecutionContext } from '@offirmo-private/soft-execution-context'

function getꓽanswer(SXC: SoftExecutionContext): number {
	return SXC.xTry('getꓽanswer', ({SXC}) => {
		SXC.setLogicalStack({module: 'foo'})
		return 42
	})
}

// APP = use a port dedicated to your engine
import { getRootSXC } from '@offirmo-private/soft-execution-context'

const SXC = getRootSXC()
	.createChild()
	.setLogicalStack({
		module: 'app',
	})
	.setAnalyticsAndErrorDetails({
		v: '2.3',
	})
// TODO decorate with env infos (depending on port)

SXC.xTryCatch('starting', ({SXC, IS_VERBOSE, ENV, CHANNEL}) => {
	console.debug({IS_VERBOSE, ENV, CHANNEL})
	if (IS_VERBOSE) console.log(`\nstarting...`)

	SXC.emitter.on('final-error', function onError({err}) {
		// ex. report to server
		console.error(`💣 error`, err)
	})
	SXC.emitter.on('analytics', function onAnalyticsEvent({eventId, details}) {
		// ex. send to server
		console.log(`🕴 analytics "${eventId}"`, details)
	})

	SXC.fireAnalyticsEvent('started', {})

	console.info('🎁 answer =', getꓽanswer(SXC))

	throw 'Will be normalized and handled!'
})
