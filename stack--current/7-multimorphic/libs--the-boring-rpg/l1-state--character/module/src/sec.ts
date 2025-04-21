import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorateꓽSXC } from '@tbrpg/definitions'

import { LIB } from './consts.ts'

function getꓽSXC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	// TODO review memoize / not mutate the parent??
	return decorateꓽSXC(
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
