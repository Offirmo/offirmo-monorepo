import assert from 'tiny-invariant'
import { SoftExecutionContext, getRootSEC } from '@offirmo-private/soft-execution-context'
import { Logger } from '@offirmo/practical-logger-types'

import { LIB } from './consts.js'

/////////////////////////////////////////////////

function getꓽSEC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({ module: LIB })
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-prng',
		})
}

function getꓽlogger(SEC: SoftExecutionContext = getꓽSEC()): Logger {
	const { logger } = SEC.getInjectedDependencies()
	assert(logger.addCommonDetails, `${LIB}: expecting a SEC-injected Offirmo Practical Logger!`)
	return logger
}

/////////////////////////////////////////////////

export {
	type SoftExecutionContext, // for convenience
	getꓽSEC,
	getꓽlogger,
}
