import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorate_SXC } from '@tbrpg/definitions'

import { LIB } from './consts.ts'

function getꓽSXC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	// TODO review memoize / not mutate the parent??
	return decorate_SXC(
		(parent || getRootSXC())
			.createChild()
			.setLogicalStack({module: LIB})
			.setAnalyticsAndErrorDetails({
				sub_product: 'state-character',
			}),
	)
}

export {
	type TBRSoftExecutionContext,
	getꓽSXC,
}
