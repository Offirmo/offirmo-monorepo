import {
	getꓽlogger,
	_setꓽlogger,
} from '../logger.ts'

import { LIB } from '../../../consts.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	try {
		const { getLogger } = await import('@offirmo/universal-debug-api-browser')
		const logger = getLogger({
			name: LIB,
			//suggestedLevel: 'error',
			//suggestedLevel: 'warn',
			//suggestedLevel: 'verbose',
			suggestedLevel: 'silly',
		})
		_setꓽlogger(logger)
	}
	catch (err) {
		console.error(err)
	}

	console.log(`🗂 Logger up with level "${getꓽlogger.getLevel?.()}". Reminder to check your dev tools log level!`)
}

/////////////////////////////////////////////////

export default init
