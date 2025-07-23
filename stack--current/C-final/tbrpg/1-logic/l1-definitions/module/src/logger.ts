import { getLogger } from '@offirmo/universal-debug-api-placeholder'

import { APP } from './consts.ts'

export function getꓽlogger() {
	return getLogger({
		name: APP,
	})
}
