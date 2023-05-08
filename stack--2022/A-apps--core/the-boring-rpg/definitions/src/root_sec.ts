import { BaseInjections, SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import { Logger } from '@offirmo/practical-logger-types'

import { PRODUCT } from './consts.js'

/////////////////////

interface TBRInjections extends BaseInjections {
	logger: Logger
}

type TBRSoftExecutionContext = SoftExecutionContext<TBRInjections>

/////////////////////

function decorate_SEC(SEC: TBRSoftExecutionContext): TBRSoftExecutionContext {
	SEC.setAnalyticsAndErrorDetails({
		product: PRODUCT, // TODO LIB?
		// TODO add more details
	})

	return SEC // for chaining
}

/////////////////////

export {
	type TBRInjections,
	type TBRSoftExecutionContext,
	decorate_SEC,
}
