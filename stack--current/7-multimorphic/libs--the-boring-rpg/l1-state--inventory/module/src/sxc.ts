import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { type TBRSoftExecutionContext, decorateꓽSXC } from '@tbrpg/definitions'

import { LIB } from './consts.ts'

function getꓽSXC(parent: TBRSoftExecutionContext = getRootSXC()): TBRSoftExecutionContext {
	return decorateꓽSXC(parent
			.createChild()
			.setLogicalStack({module: LIB})
			.setAnalyticsAndErrorDetails({
				sub_product: 'state--inventory',
			}),
	)
}

export {
	type TBRSoftExecutionContext,
	getꓽSXC,
}
