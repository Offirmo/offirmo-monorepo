import { getGlobalThis } from '@offirmo/globalthis-ponyfill'
import { DebugApiRoot, DebugApi } from '@offirmo/universal-debug-api-interface'

import createV1 from './v1'

// ensure the root is present
const _p = '_debug'
const globalThis = getGlobalThis<any>()
globalThis[_p] ||= {} as DebugApiRoot

// install globally if no other implementation already present
globalThis[_p].v1 ||= createV1()

// expose the installed implementation
const instance: DebugApi = globalThis[_p].v1

const {
	getLogger,
	exposeInternal,
	overrideHook,
	addDebugCommand,
} = instance

export {
	getLogger,
	exposeInternal,
	overrideHook,
	addDebugCommand,

	globalThis, // for convenience

	createV1, // for special cases
}

// types & sub-types, for convenience
export * from '@offirmo/universal-debug-api-interface'
