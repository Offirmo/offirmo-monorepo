import { createLogger } from '@offirmo/practical-logger-core'
//import chalk from 'chalk'

import { APP } from '../consts'
import { CHANNEL } from './channel'

/////////////////////////////////////////////////

//const logger = console
const logger = createLogger({
	name: APP,
	suggestedLevel: CHANNEL === 'dev' ? 'silly' : 'warning',
})

console.log('\n\n')
logger.info(`❄️ Cold start of "${APP}"`, { logger_level: logger.getLevel(), CHANNEL })
//logger.info('ENV', process.env)

export default logger

//console.log(`XXX`, chalk.red.bold('test chalk'))
