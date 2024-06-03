import memoize_once from 'memoize-one'
import { getRootSXC, SoftExecutionContext } from '@offirmo-private/soft-execution-context'


import { LIB } from '../consts.js'
import logger from './logger.js'

const getꓽSXC = memoize_once(function _getꓽlib_SXC(parent?: SoftExecutionContext): SoftExecutionContext {
	// TODO review memoize?
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({module: LIB})
		.injectDependencies({ logger })
})

export {
	type SoftExecutionContext,
	getꓽSXC,
}
