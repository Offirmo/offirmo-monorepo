/* Type definition of an asset,
 * aiming at properly crediting the author(s)
 */

import { Url‿str, Author, Thing, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'

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

interface Asset extends Thing {
	// to help with searching/displaying assets when giving credits
	type:
		| 'image' | 'imageⵧbackground' | 'imageⵧicon' | 'imageⵧcursor' | 'imageⵧillustration'
		| 'sound' | 'soundⵧmusic'
		| 'font'
		| 'code'
	// TODO learning, inspiration... ?
	url?: Url‿str
}

/////////////////////////////////////////////////

export {
	type Asset,

	// for convenience
	type Author,
	type Thing,
	type WithOnlinePresence,
	type ThingWithOnlinePresence,
}
