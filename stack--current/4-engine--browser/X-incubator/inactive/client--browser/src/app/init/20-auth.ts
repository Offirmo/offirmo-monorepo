import { getRootSXC } from '@monorepo-private/soft-execution-context'
import { schedule_when_idle_but_not_too_far } from '@monorepo-private/utils--async'

import { ೱᐧpage_loaded } from '../../to-export-to-own-package/viewport-utils'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	await ೱᐧpage_loaded

	schedule_when_idle_but_not_too_far(() => {
		const rootSXC = getRootSXC()

		rootSXC.xTry('init', ({ logger, SXC }) => {
			console.log('TODO auth')
		})
	})
}

/////////////////////////////////////////////////

export default init
