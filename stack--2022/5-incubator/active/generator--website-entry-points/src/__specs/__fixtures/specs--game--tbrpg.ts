import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { Author, Thing, SocialNetworkLink, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'
import { AUTHOR } from '@offirmo-private/marketing'

import { type WebProperty, type WebPropertyEntryPointSpec } from '../..'

/////////////////////////////////////////////////
/*
WebPropertyEntryPointSpec
⇲ WebProperty
	⇲ ThingWithOnlinePresence
		⇲ WithOnlinePresence
		⇲ Thing
			↳ Author
*/
/////////////////////////////////////////////////

const THING: Thing = {
	lang: 'en',
	description: 'The Boring RPG',
	author: AUTHOR,
	since‿y: 2016,
}

const SOCIAL_LINKⵧREDDIT: SocialNetworkLink = { network: 'reddit', handle: 'r/boringrpg', url: 'https://www.reddit.com/r/boringrpg/' } satisfies SocialNetworkLink
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://www.online-adventur.es/apps/the-boring-rpg/',
	urlsⵧsocial: [
		SOCIAL_LINKⵧREDDIT
	]
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'https://github.com/Offirmo/offirmo-monorepo/issues',
}

/////////////////////////////////////////////////
// Ok now we're having a website

const WEBSITE: WebProperty = {
	...THINGⵧONLINE,

	title: 'The Boring RPG',
	icon: {
		emoji: '⚔️',
		svg: path.join(__dirname, './icon--rpg.svg'),
	},
	keywords: [],
	content: {},
	features: ['cssⳇbox-layout--natural', 'normalize-url-trailing-slash', 'cssⳇfoundation--offirmo'],

	/////// SOCIAL
	// TODO

	/////// POLISH
	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme: 'hsl(248,  9%, 17%)',
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	preset: 'game',

	/////// PWA

	/////// SRC
	// TODO refine

	/////// META
	isꓽpublic: false,
	isꓽdebug: true,
}

/////////////////////////////////////////////////

export {
	SPEC,
}
