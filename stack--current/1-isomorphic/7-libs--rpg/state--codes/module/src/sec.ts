import { getRootSXC, type SoftExecutionContext } from '@offirmo-private/soft-execution-context'

import { LIB } from './consts.ts'

function getꓽSXC(parent?: SoftExecutionContext): SoftExecutionContext {
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({ module: LIB })
		.setAnalyticsAndErrorDetails({
			sub_product: 'state-codes',
		})
}

export {
	type SoftExecutionContext,
	getꓽSXC,
}
