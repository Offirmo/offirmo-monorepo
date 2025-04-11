//import { getLogger } from '@offirmo/practical-logger-core'
//import { getLogger } from '@offirmo/universal-debug-api-browser'
import { _request_install_better_console_groups_if_not_already } from '@offirmo-private/better-console-groups'

import { LIB } from '../../consts.ts'

/////////////////////////////////////////////////

_request_install_better_console_groups_if_not_already()

/////////////////////////////////////////////////

const logger = console
/*const logger = getLogger({
	name: LIB,
	//suggestedLevel: 'error',
	//suggestedLevel: 'warn',
	//suggestedLevel: 'verbose',
	suggestedLevel: 'silly',
})*/

/////////////////////////////////////////////////

export default logger
