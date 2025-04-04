import { getRootSXC } from '@offirmo-private/soft-execution-context'

const LIB = 'ErrorBoundary'

function getꓽSXC(parent) {
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({module: LIB})
}

export {
	getꓽSXC,
}
