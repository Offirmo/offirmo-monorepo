
// APP = use a port dedicated to your engine
import { getRootSXC } from '@offirmo-private/soft-execution-context'

import * as libⵧgood from './lib--good.ts'
import * as libⵧbad from './lib--bad.ts'
import * as libⵧnested from './lib--nested.ts'

const APP = 'appⵧdemo'

// important: Root = direct init of root SXC
getRootSXC()
	.setLogicalStack({
		module: APP,
	})
	.setAnalyticsAndErrorDetails({
		v: '2.3',
	})


// important: Root = auto-catch
export function start() {
	getRootSXC().xTryCatch<void>('starting', ({SXC, ENV, CHANNEL, IS_VERBOSE, IS_DEV_MODE, SESSION_START_TIME_MS, logger}) => {
		console.log(`XXX APP SXC`, {SESSION_START_TIME_MS, IS_VERBOSE, IS_DEV_MODE, ENV, CHANNEL})

		if (IS_VERBOSE) logger.log(`\nstarting...`, {IS_VERBOSE, ENV, CHANNEL})

		SXC.fireAnalyticsEvent('started', {})

		logger.info('🎁 answer =', libⵧnested.baz_sync({SXC, q: 'answer?'}))
	})
}
