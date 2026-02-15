import { getLogger } from '@offirmo/universal-debug-api-browser'

import { LIB } from '../consts.ts'

/////////////////////////////////////////////////
//console.log('logger.ts')

const logger = getLogger({
	name: LIB,
	//suggestedLevel: 'error',
	suggestedLevel: 'silly',
})

/////////////////////////////////////////////////

export default logger
