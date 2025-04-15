import type { DebugApiV1 } from '@offirmo/universal-debug-api-interface'
import { createLogger } from '@offirmo/practical-logger-minimal-noop'


export default function create(): DebugApiV1 {
	//console.trace('[UDA--placeholder installing…]')

	function NOOP () {}
	const NOOP_LOGGER = createLogger()

	return {
		getLogger: () => NOOP_LOGGER,
		overrideHook: (k, v) => v,
		exposeInternal: NOOP,
		addDebugCommand: NOOP,
	}
}
