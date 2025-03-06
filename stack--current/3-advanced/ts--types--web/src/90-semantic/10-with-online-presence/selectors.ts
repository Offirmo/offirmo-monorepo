import type { Immutable } from '@offirmo-private/ts-types'
import { normalizeꓽurlⵧhttpₓ } from '@offirmo-private/normalize-string'

import type { Url‿str } from '../../01-links/index.ts'
import type { WithOnlinePresence } from './types.ts'

/////////////////////////////////////////////////

function getꓽurlⵧcanonical(wop: Immutable<WithOnlinePresence>): Url‿str {
	return normalizeꓽurlⵧhttpₓ(wop.urlⵧcanonical)
}

/////////////////////////////////////////////////

export {
	getꓽurlⵧcanonical,
}
