import type { Immutable } from '@offirmo-private/ts-types'
import { type Logger } from '@offirmo/universal-debug-api-node'
import {
	getRootSXC,
	type BaseInjections,
	type OperationParams,
	type Operation,
	type SoftExecutionContext,
	type WithSXC,
	type EventDataMap,
} from '@offirmo-private/soft-execution-context'
//import { JSONRpcRequest, JSONRpcResponse } from '@offirmo-private/json-rpc-types'
import {
	listenToUncaughtErrors,
	listenToUnhandledRejections,
	decorateWithDetectedEnv,
} from '@offirmo-private/soft-execution-context--node'
//import { Users } from '@offirmo-private/db'

import { APP } from '../consts'
import { CHANNEL } from './channel'
import logger from './logger'

/////////////////////////////////////////////////

export interface Injections extends BaseInjections {
	logger: Logger
	//p_user?: Immutable<Users.PUser>
	//user?: Users.User
	//jsonrpc_request?: JSONRpcRequest<{}>,
	//jsonrpc_response?: JSONRpcResponse<{}>,
}

export type XSoftExecutionContext = SoftExecutionContext<Injections>
export type WithXSEC = WithSXC<Injections>
export type XSECEventDataMap = EventDataMap<Injections>
export type XOperationParams = OperationParams<Injections>
export type XOperation<T> = Operation<T, Injections>

/////////////////////


const SXC: XSoftExecutionContext = getRootSXC<Injections>()
	.setLogicalStack({ module: APP })
	.injectDependencies({ logger })

decorateWithDetectedEnv(SXC)

SXC.injectDependencies({
	CHANNEL,
//	VERSION,
})
SXC.setAnalyticsAndErrorDetails({
	product: APP,
//	VERSION,
	CHANNEL,
})

/////////////////////////////////////////////////

SXC.emitter.on('analytics', function onAnalytics({SEC, eventId, details}) {
	console.groupCollapsed(`⚡  [TODO] Analytics! ⚡  ${eventId}`)
	console.table('details', details)
	console.groupEnd()
})

// remove all the listeners installed by AWS (if any)
// TODO externalize in SEC-node
//console.log('uncaughtException Listeners:', process.listenerCount('uncaughtException'))
//console.log('unhandledRejection Listeners:', process.listenerCount('unhandledRejection'))
process.listeners('uncaughtException').forEach(l => process.off('uncaughtException', l))
process.listeners('unhandledRejection').forEach(l => process.off('unhandledRejection', l))
listenToUncaughtErrors()
listenToUnhandledRejections()

SXC.xTry('SEC/init', ({logger}) => {
	logger.trace('Root Soft Execution Context initialized ✔')
})

const { ENV } = SXC.getInjectedDependencies()
if (ENV !== process.env.NODE_ENV) {
	logger.error('ENV detection mismatch!', { 'SEC.ENV': ENV, 'process.env.NODE_ENV': process.env.NODE_ENV })
}

/////////////////////////////////////////////////

export { type LXXError } from '../utils/index.ts'
