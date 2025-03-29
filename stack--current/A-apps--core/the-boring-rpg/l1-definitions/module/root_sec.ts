import { BaseInjections, SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import { Logger } from '@offirmo/practical-logger-types'

import { PRODUCT } from './consts.ts'

/////////////////////

interface TBRInjections extends BaseInjections {
	logger: Logger
}

type TBRSoftExecutionContext = SoftExecutionContext<TBRInjections>

/////////////////////

function decorate_SXC(SXC: TBRSoftExecutionContext): TBRSoftExecutionContext {
	SXC.setAnalyticsAndErrorDetails({
		product: PRODUCT, // TODO LIB?
		// TODO add more details
	})

	return SXC // for chaining
}

/////////////////////

export {
	type TBRInjections,
	type TBRSoftExecutionContext,
	decorate_SXC,
}
