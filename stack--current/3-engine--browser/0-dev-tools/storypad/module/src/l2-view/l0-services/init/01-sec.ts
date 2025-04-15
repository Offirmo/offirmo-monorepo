import type { SoftExecutionContext } from '@offirmo-private/soft-execution-context'

import { LIB } from '../../../consts.ts'
import { getꓽlogger } from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	try {
		// @ts-expect-error
		const { getRootSXC, decorateWithDetectedEnv } = await import('@offirmo-private/soft-execution-context--browser')

		const rootSXC: SoftExecutionContext = getRootSXC()

		decorateWithDetectedEnv(rootSXC)

		rootSXC.setLogicalStack({ module: LIB })

		rootSXC.injectDependencies({
			logger: getꓽlogger(),
		})

		rootSXC.setAnalyticsAndErrorDetails({
		})

		rootSXC.xTry('init:SXC', ({logger, SXC}) => {
			logger.debug('Root Soft Execution Context initialized.', rootSXC)
			logger.debug('Root SXC is now decorated with a logger ✔')
			logger.debug('Root SXC is now decorated with env infos ✔', SXC.getAnalyticsDetails())
		})
	}
	catch (err) {
		console.error(err)
	}
}

/////////////////////////////////////////////////

export default init
