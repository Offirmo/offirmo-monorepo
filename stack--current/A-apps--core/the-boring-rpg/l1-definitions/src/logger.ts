import { getLogger } from '@offirmo/universal-debug-api-placeholder'

import { PRODUCT } from './consts.js'


export function getꓽlogger() {
	return getLogger({
		name: PRODUCT,
	})
}
