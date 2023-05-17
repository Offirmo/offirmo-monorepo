import { getRootSEC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorate_SEC } from '@tbrpg/definitions'

import { LIB } from './consts.js'

function get_lib_SEC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	return decorate_SEC(
		(parent || getRootSEC())
			.createChild()
			.setLogicalStack({module: LIB})
			.setAnalyticsAndErrorDetails({
				sub_product: 'state-inventory',
			}),
	)
}

export {
	type TBRSoftExecutionContext,
	get_lib_SEC,
}
