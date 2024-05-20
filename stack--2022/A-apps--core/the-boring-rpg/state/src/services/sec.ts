import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorate_SXC } from '@tbrpg/definitions'

import { LIB } from '../consts.js'

function getꓽSXC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	return decorate_SXC(
		(parent || getRootSXC())
			.createChild()
			.setLogicalStack({ module: LIB })
			.setAnalyticsAndErrorDetails({
				sub_product: LIB,
			})
	)
}

export {
	type TBRSoftExecutionContext,
	getꓽSXC,
}
