import { getLogger } from '@offirmo/universal-debug-api-placeholder'

import { PRODUCT } from './consts.js'


export function get_logger() {
	return getLogger({
		name: PRODUCT,
	})
}
