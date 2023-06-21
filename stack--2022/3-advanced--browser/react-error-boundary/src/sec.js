import { getRootSEC } from '@offirmo-private/soft-execution-context'

const LIB = 'ErrorBoundary'

function getꓽSEC(parent) {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({module: LIB})
}

export {
	getꓽSEC,
}
