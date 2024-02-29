import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Url‿str } from '../../01-links/index.js'
import * as ThingSelectors from '../30-thing/selectors.js'

import { ThingWithOnlinePresence } from './types.js'

/////////////////////////////////////////////////
// ThingWithOnlinePresence extends Thing, WithOnlinePresence
export * from '../10-with-online-presence/selectors.js'
export * from '../30-thing/selectors.js'

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

/////////////////////////////////////////////////

export {
	getꓽcontactⵧhuman,
	getꓽcontactⵧsecurity,
}
