import assert from 'tiny-invariant'
import { Immutable, ThingWithOnlinePresence, Url‿str } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

import * as ThingSelectors from './thing.js'
import * as WithOnlinePresenceSelectors from './with-online-presence.js'

/////////////////////////////////////////////////

// should not be called "naked", this is a fallback for a semantic contact need
function _getꓽcontact(thing: Immutable<ThingWithOnlinePresence>): Url‿str {
	const url = thing.contact || ThingSelectors.getꓽauthor__contact(thing)
	assert(url, 'Thing: should have at last a point of contact!')
	return url
}

function getꓽcontactⵧhuman(thing: Immutable<ThingWithOnlinePresence>): Url‿str {
	return _getꓽcontact(thing)
}

function getꓽcontactⵧsecurity(thing: Immutable<ThingWithOnlinePresence>): Url‿str {
	return thing.contactⵧsecurity || _getꓽcontact(thing)
}

/*
	contactⵧsupport?: Url‿str // if not provided, default to contact
 */

/////////////////////////////////////////////////

export {
	getꓽcontactⵧhuman,
	getꓽcontactⵧsecurity,
}
