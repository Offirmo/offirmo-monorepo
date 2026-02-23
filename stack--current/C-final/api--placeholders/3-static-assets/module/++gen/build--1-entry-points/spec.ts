import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import type { Thing, SocialNetworkLink, WithOnlinePresence, ThingWithOnlinePresence } from '@monorepo-private/ts--types--web'
import type { WebProperty, WebPropertyEntryPointSpec } from '@monorepo-private/generator--website-entry-points'

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

import { AUTHOR } from '@monorepo-private/marketing/creator'

const THING: Thing = {
	description: 'Placeholders generator',
	author: AUTHOR,
	since‿y: 2025,
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'todo',
	//urlsⵧsocial: []
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

	title: 'HW-C-A',
	icon: {
		emoji: '🏗️',
	},
	keywords: [ 'saas' ],
	content: {
		html: [
			`<img src="./api/v1/placeholder.svg">`,
		]
	},
	features: [
		//'cssⳇbox-layout--natural',
		'cssⳇframework--offirmo',

		'normalize-url-trailing-slash',

		//'analytics--google',
		//'site-verification--google',
	],

	/////// SOCIAL
	// TODO

	/////// POLISH
	//colorⵧbackground: 'hsl(337, 16%, 28%)',
	//colorⵧforeground: 'hsl(42, 100%, 87%)',
	//colorⵧtheme:      'hsl(248,  9%, 17%)',
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	//preset: ,

	/////// PWA
	// TODO refine

	/////// SRC
	// TODO refine

	/////// META
	// No! see consumer
}

/////////////////////////////////////////////////

export {
	SPEC,
}
