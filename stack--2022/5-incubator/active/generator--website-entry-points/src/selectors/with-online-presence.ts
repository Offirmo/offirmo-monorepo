import assert from 'tiny-invariant'
import { WithOnlinePresence, Url‿str, Immutable } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function getꓽurlⵧcanonical(wop: Immutable<WithOnlinePresence>): Url‿str {
	return normalize_unicode(wop.urlⵧcanonical).trim()
}

/*
	urlsⵧsocial?: SocialNetworkLink[]
 */

/////////////////////////////////////////////////

export {
	getꓽurlⵧcanonical,
}
