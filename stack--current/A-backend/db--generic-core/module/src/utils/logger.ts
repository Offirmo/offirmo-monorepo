import { getLogger } from '@offirmo/universal-debug-api-placeholder'

import { LIB } from '../consts.ts'

////////////////////////////////////

export const logger = getLogger({
	name: LIB,
	//suggestedLevel: 'silly',
	//suggestedLevel: 'log',
	//suggestedLevel: 'warn',
})
logger.info('logger ready', { logger_level: logger.getLevel() })

export default logger
