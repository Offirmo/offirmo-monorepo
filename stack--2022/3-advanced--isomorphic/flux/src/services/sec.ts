import { getRootSEC, SoftExecutionContext } from '@offirmo-private/soft-execution-context'

import { LIB } from '../consts.js'

/////////////////////////////////////////////////

function getꓽSEC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({module: LIB})
		.setAnalyticsAndErrorDetails({
			sub_product: LIB,
		})
}

/////////////////////////////////////////////////

export {
	type SoftExecutionContext,
	getꓽSEC,
}
