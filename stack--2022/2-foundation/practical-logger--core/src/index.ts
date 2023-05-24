import { create as createLogger } from './core.js'
export { createLogger }

export * from '@offirmo/practical-logger-types'

export {
	ALL_LOG_LEVELS,
	LOG_LEVEL_TO_INTEGER,
	LOG_LEVEL_TO_HUMAN,
	DEFAULT_LOG_LEVEL,
	DEFAULT_LOGGER_KEY,
} from './consts.js'

export { checkLevel } from './core.js'
export * from './normalize-args.js'
