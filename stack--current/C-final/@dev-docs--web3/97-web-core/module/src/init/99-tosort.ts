import assert from 'tiny-invariant'
import logger from '../cross-cutting/logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	if (false) {
		// @ts-expect-error
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
				logger[level](`logger demo with level "${level}"`, { level })
			})
			console.groupEnd()
		}, 1000)
	}
}

/////////////////////////////////////////////////

export default init
