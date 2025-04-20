import { getRootSXC, type SoftExecutionContext } from '@offirmo-private/soft-execution-context'

/////////////////////////////////////////////////

const LIB = 'ErrorBoundary'

function getꓽSXC(parent: SoftExecutionContext | undefined) {
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({module: LIB})
}

/////////////////////////////////////////////////

export {
	getꓽSXC,
}
