import {
	getRootSXC,
	decorateWithDetectedEnv,
} from '@monorepo-private/soft-execution-context--browser'

import { LIB } from '../consts.ts'
//import { VERSION } from '../../entry-points/build.ts'
//import { CHANNEL } from '../services/channel.ts'
import logger from '../cross-cutting/logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	decorateWithDetectedEnv(rootSXC)

	rootSXC.setLogicalStack({ module: LIB })

	rootSXC.injectDependencies({
		logger,
		//CHANNEL,
		//VERSION,
	})

	rootSXC.setAnalyticsAndErrorDetails({
		//VERSION,
		//CHANNEL,
	})

	rootSXC.xTry('init:SXC', ({ logger, SXC }) => {
		logger.debug('┌ Root SXC is now decorated with a logger ✔')
		logger.debug('├ Root SXC is now decorated with env infos ✔', SXC.getAnalyticsDetails())
		logger.debug('└► Root Soft Execution Context initialized ✔', rootSXC)
	})

	const { ENV } = rootSXC.getInjectedDependencies()
	if (ENV !== process.env.NODE_ENV) {
		logger.error('ENV detection mismatch!', {
			'SXC.ENV': ENV,
			'process.env.NODE_ENV': process.env.NODE_ENV,
		})
	}
}

/////////////////////////////////////////////////

export default init
