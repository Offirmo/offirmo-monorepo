import { getRootSEC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorate_SEC } from '@tbrpg/definitions'

import { LIB } from '../consts.js'

function getꓽSEC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	return decorate_SEC(
		(parent || getRootSEC())
			.createChild()
			.setLogicalStack({ module: LIB })
			.setAnalyticsAndErrorDetails({
				sub_product: LIB,
			})
	)
}

export {
	type TBRSoftExecutionContext,
	getꓽSEC,
}
