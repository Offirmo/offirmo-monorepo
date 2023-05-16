import assert from 'tiny-invariant'
import { SoftExecutionContext, getRootSEC } from '@offirmo-private/soft-execution-context'
import { Logger } from '@offirmo/practical-logger-types'

import { LIB } from './consts.js'


function get_lib_SEC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({ module: LIB })
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-prng',
		})
}

function get_logger(SEC: SoftExecutionContext = get_lib_SEC()): Logger {
	const { logger } = SEC.getInjectedDependencies()
	assert(logger.addCommonDetails, `${LIB}: expecting a SEC-injected Offirmo Practical Logger!`)
	return logger
}

export {
	type SoftExecutionContext, // for convenience
	get_lib_SEC,
	get_logger,
}
