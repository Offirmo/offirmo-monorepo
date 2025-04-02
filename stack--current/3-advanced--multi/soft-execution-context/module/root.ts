import { type SoftExecutionContext } from './types.ts'
import { _createSXC } from './core.ts'

/////////////////////

function getRootSXC<Injections = {}, AnalyticsDetails = {}, ErrorDetails = {}>(): SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails> {
	const global_this = globalThis as any

	if (!global_this.__global_root_sec) {
		//console.log(`[${LIB}] Creating root context…`)
		global_this.__global_root_sec = _createSXC()
	}

	return global_this.__global_root_sec
}

function _test_only__reset_root_SXC() {
	const global_this = globalThis as any

	delete global_this.__global_root_sec
}

/////////////////////

export {
	getRootSXC,
	_test_only__reset_root_SXC,
}
