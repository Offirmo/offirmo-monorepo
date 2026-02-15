import { getRootSXC } from '@offirmo-private/soft-execution-context'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.xTry('init', ({ logger, SXC }) => {
		console.log('TODO model')
	})
}

/////////////////////////////////////////////////

export default init
