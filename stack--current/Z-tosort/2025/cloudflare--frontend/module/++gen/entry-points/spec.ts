import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import type { Thing, SocialNetworkLink, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'
import type { WebProperty, WebPropertyEntryPointSpec } from '@offirmo-private/generator--website-entry-points'

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

import { AUTHOR } from '@offirmo-private/marketing'

const THING: Thing = {
	description: 'An advanced demo web app on Cloudflare',
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
		emoji: '🛠',
		//svg: path.join(__dirname, './icon--rpg.svg'),
	},
	keywords: [ 'demo' ],
	content: {},
	features: [
		'cssⳇbox-layout--natural',
		'normalize-url-trailing-slash',
		'cssⳇframework--offirmo',
		'htmlⳇreact-root',
		//'page-loader--offirmo',
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
