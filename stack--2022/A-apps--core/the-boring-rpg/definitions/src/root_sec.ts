//import { ImmutabilityEnforcer } from '@offirmo-private/ts-types'
//import { enforce_immutability } from '@offirmo-private/state-utils'
import { BaseInjections, SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import { Logger } from '@offirmo/practical-logger-types'

import { PRODUCT } from './consts.js'

/////////////////////

interface TBRInjections extends BaseInjections {
	logger: Logger
	//enforce_immutability: ImmutabilityEnforcer
}

type TBRSoftExecutionContext = SoftExecutionContext<TBRInjections>

/////////////////////

function decorate_SEC(SEC: TBRSoftExecutionContext): TBRSoftExecutionContext {
	/*SEC.injectDependencies({
		enforce_immutability, // TODO remove
	})*/

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
