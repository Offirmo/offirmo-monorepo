/* Code allowing to register an asset usage,
 * so that we can credits the creators
 * and display an attribution in-app for certain major assets.
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { Author, Thing, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////
/* Reminder:
ThingWithOnlinePresence
	↳ contact?: Url‿str // if not provided, default to author's Ideally should be a "contact center" https://docs.aws.amazon.com/connect/latest/adminguide/connect-concepts.html
	↳ contactⵧsecurity?: Url‿str // if not provided, default to contact
	↳ contactⵧsupport?: Url‿str // if not provided, default to contact
	⇲ WithOnlinePresence
		↳ urlⵧcanonical: Url‿str
		↳ urlsⵧsocial?: SocialNetworkLink[]
	⇲ Thing
		↳ lang?: IETFLanguageType
		↳ description: string // must be simple, a paragraph at most
		↳ author: Author | undefined // undef = unknown :-(
			↳ name: string
			↳ intro?: string // very short intro. TODO refine
			↳ email?: Email‿str
			↳ contact?: Url‿str // should NOT duplicate email
		↳ since‿y?: number // for copyright notice

const AUTHOR = {
	name: 'Offirmo',
	intro: 'software engineer, open-source developer & creator',
	email: EMAIL,
	contact: ...
	urlⵧcanonical: WEBSITE,
	urlsⵧsocial: [SOCIAL_LINKⵧARTSTATION, SOCIAL_LINKⵧGITHUB, SOCIAL_LINKⵧINSTAGRAM, SOCIAL_LINKⵧPRODUCTHUNT, SOCIAL_LINKⵧREDDIT, SOCIAL_LINKⵧTWITTER],
}
const THING: Thing = {
	description: 'The Boring RPG',
	author: AUTHOR,
	since‿y: 2016,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://www.online-adventur.es/apps/the-boring-rpg/',
	...(AUTHOR.urlsⵧsocial && {urlsⵧsocial: AUTHOR.urlsⵧsocial}),
}
/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'https://github.com/Offirmo/offirmo-monorepo/issues',
}
*/
/////////////////////////////////////////////////

interface AssetStore {
	assetsⵧall: Set<Immutable<Thing>>
	assetsⵧrecents: Array<Immutable<Thing>>
}

const STORE: AssetStore = {
	assetsⵧall: new Set<Immutable<Thing>>(),
	assetsⵧrecents: [],
}

/////////////////////////////////////////////////


// "fire and forget"
// called by the asset file itself on load,
// whether it’s used or not
function registerꓽasset_usageⵧload(asset: Immutable<Thing>): void {
	STORE.assetsⵧall.add(asset)
}

// "fire and forget"
// called by the user of the asset
// so that we can show "currently/recently" used assets
function registerꓽasset_usageⵧstart(asset: Immutable<Thing>): void {
	if (STORE.assetsⵧrecents.includes(asset))
		return

	STORE.assetsⵧall.add(asset)
	STORE.assetsⵧrecents.unshift(asset)
	STORE.assetsⵧrecents = STORE.assetsⵧrecents.slice(0, 12)
}

// "fire and forget"
// call is optional
function registerꓽasset_usageⵧend(asset: Immutable<Thing>): void {
	// useful? TODO if useful
}

// return all currently registered assets
function getꓽassetsⵧall(): Immutable<Set<Immutable<Thing>>> {
	return STORE.assetsⵧall
}

// return the most recently used/loaded assets
function getꓽassetsⵧrecents(n = 12): Immutable<Array<Immutable<Thing>>> {
	return STORE.assetsⵧrecents
}

/////////////////////////////////////////////////

export {
	type Author,
	type Thing,
	type WithOnlinePresence,
	type ThingWithOnlinePresence,

	registerꓽasset_usageⵧload,
	registerꓽasset_usageⵧstart,
	registerꓽasset_usageⵧend,
	getꓽassetsⵧall,
	getꓽassetsⵧrecents,
}
