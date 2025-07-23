import assert from 'tiny-invariant'
import { type SoftExecutionContext, getRootSXC } from '@offirmo-private/soft-execution-context'
import type { Logger } from '@offirmo/practical-logger-types'

import { LIB } from './consts.ts'

/////////////////////////////////////////////////

function getꓽSXC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({ module: LIB })
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-prng',
		})
}

function getꓽlogger(SXC: SoftExecutionContext = getꓽSXC()): Logger {
	const { logger } = SXC.getInjectedDependencies()
	assert(logger.addCommonDetails, `${LIB}: expecting a SXC-injected Offirmo Practical Logger!`)
	return logger
}

/////////////////////////////////////////////////

export {
	type SoftExecutionContext, // for convenience
	getꓽSXC,
	getꓽlogger,
}
