import {
	getꓽlogger,
	_setꓽlogger,
} from '../logger.ts'

import { LIB } from '../../../consts.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	try {
		// @ts-expect-error
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
}

/////////////////////////////////////////////////

export default init
