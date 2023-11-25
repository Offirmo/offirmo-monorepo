import {
	decorateWithDetectedEnv,
	getRootSEC,
} from '@offirmo-private/soft-execution-context--browser'

import { LIB } from '../../consts.ts'
import { VERSION } from '../../../build.ts'
import { CHANNEL } from '../channel.ts'
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSEC = getRootSEC()

	decorateWithDetectedEnv(rootSEC)

	rootSEC.setLogicalStack({ module: LIB })

	rootSEC.injectDependencies({
		logger,
		CHANNEL,
		VERSION,
	})

	rootSEC.setAnalyticsAndErrorDetails({
		VERSION,
		CHANNEL,
	})

	rootSEC.xTry('init:SEC', ({logger, SEC}) => {
		logger.debug('Root Soft Execution Context initialized.', rootSEC)
		logger.debug('Root SEC is now decorated with a logger ✔')
		logger.debug('Root SEC is now decorated with env infos ✔', SEC.getAnalyticsDetails())
	})

	const { ENV } = rootSEC.getInjectedDependencies()
	if (ENV !== process.env.NODE_ENV) {
		logger.error('ENV detection mismatch!', { 'SEC.ENV': ENV, 'process.env.NODE_ENV': process.env.NODE_ENV })
	}
}

/////////////////////////////////////////////////

export default init
