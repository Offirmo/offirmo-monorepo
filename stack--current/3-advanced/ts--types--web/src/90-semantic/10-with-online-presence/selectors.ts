import type { Immutable } from '@offirmo-private/ts-types'
import { normalizeꓽurlⵧhttpₓ } from '@offirmo-private/normalize-string'

import { Url‿str } from '../../01-links/index.js'
import { WithOnlinePresence } from './types.js'

/////////////////////////////////////////////////

function getꓽurlⵧcanonical(wop: Immutable<WithOnlinePresence>): Url‿str {
	return normalizeꓽurlⵧhttpₓ(wop.urlⵧcanonical)
}

/////////////////////////////////////////////////

export {
	getꓽurlⵧcanonical,
}
