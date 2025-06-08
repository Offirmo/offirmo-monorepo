import {
	getꓽlogger,
	_setꓽlogger,
} from '../logger.ts'

import { LIB } from '../../../consts.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	try {
		// x@ts-expect-error during monorepo resurrection, the package below may not yet be available
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
	catch (err: any) {
		if (!err?.message?.includes?.('not yet resurrected')) throw err
	}
}

/////////////////////////////////////////////////

export default init
