import { getLogger } from '@offirmo/universal-debug-api-browser'

import { LIB } from '../consts.ts'

/////////////////////////////////////////////////

const logger = getLogger({
	name: LIB,
	//suggestedLevel: 'error',
	//suggestedLevel: 'warn',
	//suggestedLevel: 'verbose',
	suggestedLevel: 'silly',
})

console.log(`🗂 Logger up with level "${logger.getLevel()}". Reminder to check your dev tools log level!`)


if (false) {
	setTimeout(() => {
		console.group('Testing log levels...')
		;[
			'fatal',
			'emerg',
			'alert',
			'crit',
			'error',
			'warning',
			'warn',
			'notice',
			'info',
			'verbose',
			'log',
			'debug',
			'trace',
			'silly',
		].forEach(level => {
			//console.log(`logger demo with level "${level}":`)
			logger[level](`logger demo with level "${level}"`, {level})
		})
		console.groupEnd()
	}, 1000)
}

/////////////////////////////////////////////////

export default logger
