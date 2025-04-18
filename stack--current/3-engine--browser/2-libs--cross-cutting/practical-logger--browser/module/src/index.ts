import type { LogSink, Logger, LoggerCreationParams } from '@offirmo/practical-logger-types'
import { createLogger as createLoggerCore } from '@offirmo/practical-logger-core'

import type { SinkOptions } from './types.ts'
import { create } from './sinks/index.ts'
import { _request_install_better_console_groups_if_not_already } from '@offirmo-private/better-console-groups'

/////////////////////////////////////////////////

const ORIGINAL_CONSOLE = console

/////////////////////////////////////////////////

function createLogger(p: Readonly<LoggerCreationParams<SinkOptions>> = {}): Logger {
	_request_install_better_console_groups_if_not_already(p.sinkOptions?.betterGroups !== false)

	const sink: LogSink = p.sinkOptions?.sink || create(p.sinkOptions)

	const { group, groupCollapsed, groupEnd } = ORIGINAL_CONSOLE
	return {
		...createLoggerCore(p, sink),
		group,
		groupCollapsed,
		groupEnd,
	}
}

/////////////////////////////////////////////////

export {
	createLogger,

	_request_install_better_console_groups_if_not_already, // to allow early override
}
export * from '@offirmo/practical-logger-types'
export { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_KEY } from '@offirmo/practical-logger-core'
