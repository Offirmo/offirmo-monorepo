
import tiny_singleton from '@offirmo/tiny-singleton'
import { LogSink, Logger, LoggerCreationParams } from '@offirmo/practical-logger-types'
import { createLogger as createLoggerCore } from '@offirmo/practical-logger-core'

import { SinkOptions } from './types.js'
import { create } from './sinks/index.js'
import improve_console_groups from './better-console-groups/practical-logger.js'

/////////////////////////////////////////////////

const ORIGINAL_CONSOLE = console

/////////////////////////////////////////////////

const _request_install_better_console_groups_if_not_already = tiny_singleton((active: boolean = true) => { if (active) improve_console_groups() })

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
	_request_install_better_console_groups_if_not_already,
	createLogger,
}
export * from '@offirmo/practical-logger-types'
export { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_KEY } from '@offirmo/practical-logger-core'