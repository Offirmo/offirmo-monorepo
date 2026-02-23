import { getRootSXC } from '@monorepo-private/soft-execution-context'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.xTry('init', ({ logger, SXC }) => {
		console.log('TODO analytics')
	})
}

/////////////////////////////////////////////////

export default init
