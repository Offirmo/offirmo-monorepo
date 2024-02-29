import { Immutable } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

import { Url‿str } from '../../01-links/index.js'
import { WithOnlinePresence } from './types.js'

/////////////////////////////////////////////////

function getꓽurlⵧcanonical(wop: Immutable<WithOnlinePresence>): Url‿str {
	return normalize_unicode(wop.urlⵧcanonical).trim()
}

/////////////////////////////////////////////////

export {
	getꓽurlⵧcanonical,
}
