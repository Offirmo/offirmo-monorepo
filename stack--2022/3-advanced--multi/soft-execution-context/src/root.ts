import { getGlobalThis } from '@offirmo/globalthis-ponyfill'

import { SoftExecutionContext } from './types.js'
import { LIB } from './consts.js'
import { createSEC } from './core.js'

/////////////////////

function getRootSEC<Injections = {}, AnalyticsDetails = {}, ErrorDetails = {}>(): SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails> {
	const global_this = getGlobalThis<any>()

	if (!global_this.__global_root_sec) {
		//console.log(`[${LIB}] Creating root context…`)
		global_this.__global_root_sec = createSEC()
	}

	return global_this.__global_root_sec
}

/////////////////////

export {
	getRootSEC,
}
