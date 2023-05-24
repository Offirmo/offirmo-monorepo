import { DebugApi as DebugApiV1 } from './v1.js'

interface DebugApiRoot {
	v1: DebugApiV1,
}

type DebugApi = DebugApiV1

export {
	type DebugApiV1,

	// v latest
	type DebugApi,
	type DebugApiRoot,
}

// for convenience
export { type Logger, type LoggerCreationParams } from '@offirmo/practical-logger-types'
