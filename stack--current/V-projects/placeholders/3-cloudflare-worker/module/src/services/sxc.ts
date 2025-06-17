import { type Logger } from '@offirmo/universal-debug-api-interface'
import {
	getRootSXC as _getRootSXC,
	type BaseInjections, type BaseAnalyticsDetails, type BaseErrorDetails,
	type OperationParams,
	type Operation,
	type SoftExecutionContext,
	type WithSXC as _WithSXC,
	type EventDataMap,
} from '@offirmo-private/soft-execution-context'

import { APP } from '../consts'
import { CHANNEL } from './channel'
import logger from './logger'

/////////////////////////////////////////////////

export interface SXCInjections extends BaseInjections {
	logger: Logger
}

export interface SXCAnalyticsDetails extends BaseAnalyticsDetails {

}

export interface SXCErrorDetails extends BaseErrorDetails{

}

export type XSoftExecutionContext = SoftExecutionContext<SXCInjections, SXCAnalyticsDetails, SXCErrorDetails>


/////////////////////

export const getRootSXC = _getRootSXC<SXCInjections, SXCAnalyticsDetails, SXCErrorDetails>

getRootSXC()
	.setLogicalStack({ module: APP })
	.injectDependencies({ logger })

/*
//decorateWithDetectedEnv()

getRootSXC().injectDependencies({
	CHANNEL,
//	VERSION,
})
getRootSXC().setAnalyticsAndErrorDetails({
	//product: APP,
//	VERSION,
	CHANNEL,
})
*/

/////////////////////////////////////////////////

getRootSXC().emitter.on('analytics', function onAnalytics({eventId, details}) {
	console.groupCollapsed(`⚡  [TODO 1D] Analytics! ⚡  ${eventId}`)
	console.table(details)
	console.groupEnd()
})

// remove all the listeners installed by the runtime (ex. AWS) if any
// TODO externalize in SEC-node?
//console.log('uncaughtException Listeners:', process.listenerCount('uncaughtException'))
//console.log('unhandledRejection Listeners:', process.listenerCount('unhandledRejection'))
//process.listeners('uncaughtException').forEach(l => process.off('uncaughtException', l))
//process.listeners('unhandledRejection').forEach(l => process.off('unhandledRejection', l))
//listenToUncaughtErrors()
//listenToUnhandledRejections()

getRootSXC().xTry('SEC/init', ({logger}) => {
	logger.trace('Root Soft Execution Context initialized ✔')
})

/////////////////////////////////////////////////

//export { type LXXError } from '../utils/index.ts'
