import { SoftExecutionContext, getRootSEC } from '@offirmo-private/soft-execution-context'

import { LIB } from './consts.js'

function getꓽlib_SEC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({module: LIB})
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-meta',
		})
}

export {
	type SoftExecutionContext,
	get_lib_SEC,
}
