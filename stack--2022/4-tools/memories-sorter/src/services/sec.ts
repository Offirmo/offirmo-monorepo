import memoize_once from 'memoize-one'
import { getRootSEC, SoftExecutionContext } from '@offirmo-private/soft-execution-context'


import { LIB } from '../consts.js'
import logger from './logger.js'

const getꓽSEC = memoize_once(function _getꓽlib_SEC(parent?: SoftExecutionContext): SoftExecutionContext {
	// TODO review memoize?
	return (parent || getRootSEC())
		.createChild()
		.setLogicalStack({module: LIB})
		.injectDependencies({ logger })
})

export {
	type SoftExecutionContext,
	getꓽSEC,
}
