import type { BaseInjections, SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import type { Logger } from '@offirmo/practical-logger-types'

import { APP } from './consts.ts'

/////////////////////

interface TBRInjections extends BaseInjections {
	logger: Logger
}

type TBRSoftExecutionContext = SoftExecutionContext<TBRInjections>

/////////////////////

function decorateꓽSXC(SXC: TBRSoftExecutionContext): TBRSoftExecutionContext {
	SXC.setAnalyticsAndErrorDetails({
		product: APP, // TODO LIB?
		// TODO add more details
	})

	return SXC // for chaining
}

/////////////////////

export {
	type TBRInjections,
	type TBRSoftExecutionContext,
	decorateꓽSXC,
}
