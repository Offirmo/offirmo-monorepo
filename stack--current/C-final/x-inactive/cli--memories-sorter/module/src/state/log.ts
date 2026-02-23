import type { Immutable } from '@monorepo-private/ts--types'
import {
	LogLevel,
	LogDetails,
	Logger,
	LogPayload,
	ALL_LOG_LEVELS,
	normalizeArguments,
} from '@offirmo/practical-logger-core'
import { getꓽUTC_timestamp‿ms } from '@monorepo-private/timestamps'

interface WithLogs {
	logs: {
		[level: string]: {
			[msg: string]: LogPayload
		}
	}
}

interface StatefulLogger<State extends WithLogs> extends Logger {
	getꓽstate: () => State
}

//////////// Selectors ////////////

/*
export function getꓽlogger<State extends WithLogs>(state: Immutable<State>, existing_logger: Immutable<Logger>): StatefulLogger<State> {

	function getꓽstate() {
		return state
	}

	return {
		...logger,
		getꓽstate,
	}
}
*/

//////////// reducers ////////////

export function create(): WithLogs {
	return {
		logs: ALL_LOG_LEVELS.reduce((acc: WithLogs['logs'], level: LogLevel) => {
			acc[level] = {}
			return acc
		}, {} as WithLogs['logs'])
	}
}

function _log(state: Immutable<WithLogs>, level: LogLevel, rawMessage?: string, rawDetails?: LogDetails, logger?: Logger): Immutable<WithLogs> {
	const [ msg, { err, ...details } ]: [ string, LogDetails ] = normalizeArguments([rawMessage, rawDetails])
	return {
		...state,
		logs: {
			...state.logs,
			[level]: {
				...state.logs[level],
				[msg]: state.logs[level][msg] || {
					name: '',
					time: getꓽUTC_timestamp‿ms(),
					level,
					msg,
					err,
					details,
				} as LogPayload
			}
		}
	}
}

export function log_fatal(state: Immutable<WithLogs>, rawMessage?: string, rawDetails?: LogDetails, logger?: Logger): Immutable<WithLogs> {
	return _log(state, 'fatal', rawMessage, rawDetails, logger)
}
/*export function log_fatal(state: Immutable<WithLogs>, rawMessage?: string, rawDetails?: LogDetails, logger?: Logger): Immutable<WithLogs> {
	return _log(state, 'fatal', rawMessage, rawDetails, logger)
}
export function log_fatal(state: Immutable<WithLogs>, rawMessage?: string, rawDetails?: LogDetails, logger?: Logger): Immutable<WithLogs> {
	return _log(state, 'fatal', rawMessage, rawDetails, logger)
}
export function log_fatal(state: Immutable<WithLogs>, rawMessage?: string, rawDetails?: LogDetails, logger?: Logger): Immutable<WithLogs> {
	return _log(state, 'fatal', rawMessage, rawDetails, logger)
}*/
/*
| 'emerg'
| 'alert'
| 'crit'
| 'error'
| 'warning'
| 'warn'
| 'notice'
| 'info'
| 'verbose'
| 'log'
| 'debug'
| 'trace'
| 'silly'
*/
