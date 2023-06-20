import { getRootSEC } from '@offirmo-private/soft-execution-context'

const LIB = 'OMR:view-browser-react'

function getꓽlib_SEC(parent) {
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({module: LIB})
}

export {
	get_lib_SEC,
}
