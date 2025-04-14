import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { getꓽlogger } from '../logger.ts'

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
				;(getꓽlogger() as any)[level](`logger demo with level "${level}"`, {level})
			})
			console.groupEnd()
		}, 1000)
	}
}

/////////////////////////////////////////////////

export default init
