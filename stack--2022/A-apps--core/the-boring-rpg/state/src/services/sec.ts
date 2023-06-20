import { getRootSEC } from '@offirmo-private/soft-execution-context'
import { TBRSoftExecutionContext, decorate_SEC } from '@tbrpg/definitions'

import { LIB } from '../consts.js'
import { getꓽlogger } from './logger.js'

function getꓽlib_SEC(parent?: TBRSoftExecutionContext): TBRSoftExecutionContext {
	return decorate_SEC(
		(parent || getRootSEC())
			.createChild()
			.setLogicalStack({module: LIB})
			.setAnalyticsAndErrorDetails({
				sub_product: LIB,
			})
	)
}

export {
	type TBRSoftExecutionContext,
	get_lib_SEC,
}
