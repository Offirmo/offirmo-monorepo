import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import logger from '../logger'

/////////////////////////////////////////////////

async function init(): Promise<void> {

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
				;(logger as any)[level](`logger demo with level "${level}"`, {level})
			})
			console.groupEnd()
		}, 1000)
	}
}

/////////////////////////////////////////////////

export default init
