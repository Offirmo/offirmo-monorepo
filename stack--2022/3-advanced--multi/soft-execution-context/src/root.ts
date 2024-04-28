import { SoftExecutionContext } from './types.js'
import { _createSEC } from './core.js'

/////////////////////

function getRootSEC<Injections = {}, AnalyticsDetails = {}, ErrorDetails = {}>(): SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails> {
	const global_this = globalThis as any

	if (!global_this.__global_root_sec) {
		//console.log(`[${LIB}] Creating root context…`)
		global_this.__global_root_sec = _createSEC()
	}

	return global_this.__global_root_sec
}

function _test_only__reset_root_SEC() {
	const global_this = globalThis as any

	delete global_this.__global_root_sec
}

/////////////////////

export {
	getRootSEC,
	_test_only__reset_root_SEC,
}
