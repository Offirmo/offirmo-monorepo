import {
	decorateWithDetectedEnv,
	getRootSEC,
} from '@offirmo-private/soft-execution-context--browser'

import { LIB } from '../../consts.ts'
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSEC = getRootSEC()

	decorateWithDetectedEnv(rootSEC)

	rootSEC.setLogicalStack({ module: LIB })

	rootSEC.injectDependencies({
		logger,
	})

	rootSEC.setAnalyticsAndErrorDetails({
	})

	rootSEC.xTry('init:SEC', ({logger, SEC}) => {
		logger.debug('Root Soft Execution Context initialized.', rootSEC)
		logger.debug('Root SEC is now decorated with a logger ✔')
		logger.debug('Root SEC is now decorated with env infos ✔', SEC.getAnalyticsDetails())
	})
}

/////////////////////////////////////////////////

export default init
