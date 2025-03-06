import type { Author, Thing, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'

import { AUTHOR } from '@offirmo-private/marketing'

import type { WebProperty, WebPropertyEntryPointSpec } from '../..'

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
	description: 'Offirmo’s personal blog about tech, software and gamedev…',
	author: AUTHOR,
	since‿y: 2016,
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: AUTHOR.urlⵧcanonical,
	...(AUTHOR.urlsⵧsocial && {urlsⵧsocial: AUTHOR.urlsⵧsocial}),
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'https://github.com/Offirmo/offirmo.github.io/issues',
}

/////////////////////////////////////////////////
// Ok now we're having a website


const WEBSITE: WebProperty = {
	...THINGⵧONLINE,

	title: 'Offirmo - Fullstack Developer',
	icon: { emoji: '👨‍💻' },
	keywords: [ 'engineer', 'software', 'fullstack', 'developer', 'open-source', 'indie'],
	content: {
		// TODO
	},
	features: [
		'cssⳇbox-layout--natural',
		'normalize-url-trailing-slash',
		'cssⳇfoundation--offirmo',
	],

	/////// SOCIAL
	// TODO

	/////// POLISH
	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme:      'hsl(248,  9%, 17%)',
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	preset: 'blog',

	/////// PWA
	// (not a PWA)

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
