import { getRootSEC, SoftExecutionContext } from '@offirmo-private/soft-execution-context'

import { LIB } from './consts.js'

function getꓽlib_SEC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({ module: LIB })
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-codes',
		})
}

export {
	type SoftExecutionContext,
	get_lib_SEC,
}
