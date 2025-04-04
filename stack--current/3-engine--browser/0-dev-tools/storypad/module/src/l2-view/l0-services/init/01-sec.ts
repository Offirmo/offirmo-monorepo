import {
	decorateWithDetectedEnv,
	getRootSXC,
} from '@offirmo-private/soft-execution-context--browser'

import { LIB } from '../../../consts.ts'
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	decorateWithDetectedEnv(rootSXC)

	rootSXC.setLogicalStack({ module: LIB })

	rootSXC.injectDependencies({
		logger,
	})

	rootSXC.setAnalyticsAndErrorDetails({
	})

	rootSXC.xTry('init:SXC', ({logger, SXC}) => {
		logger.debug('Root Soft Execution Context initialized.', rootSXC)
		logger.debug('Root SXC is now decorated with a logger ✔')
		logger.debug('Root SXC is now decorated with env infos ✔', SXC.getAnalyticsDetails())
	})
}

/////////////////////////////////////////////////

export default init
