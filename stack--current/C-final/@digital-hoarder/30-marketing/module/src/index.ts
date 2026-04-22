import type {
	Author,
	SocialNetworkLink,
	Url‿str,
	Thing,
	WithOnlinePresence,
	ThingWithOnlinePresence,
} from '@monorepo-private/ts--types--web'

import type { WebProperty } from '@monorepo-private/generator--website-entry-points'
import { AUTHOR } from '@monorepo-private/marketing/pro'

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
	description: 'Senior Dev Mental Models',
	author: AUTHOR,
	since‿y: 2026,
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'TODO',
	urlsⵧsocial: [
		// TODO
		//const SOCIAL_LINKⵧGITHUB: SocialNetworkLink      = { network: 'github',      handle: 'TODO',   url: 'https://github.com/TODO'           }
	],
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'https://github.com/Offirmo/offirmo-monorepo/issues', // TODO
}

/////////////////////////////////////////////////
// Ok now we're having a website

const WEBSITE: WebProperty = {
	...THINGⵧONLINE,

	title: 'Dev Mental Models',
	icon: {
		emoji: '💡',
		//svg: path.join(__dirname, './icon--rpg.svg'),
	},
	keywords: ['documentation', 'web3'],
	content: {},
	features: [
		'cssⳇbox-layout--natural',
		'cssⳇviewport--full',
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
	colorⵧbackground: 'white',
	colorⵧforeground: 'black',
	colorⵧtheme: '#e5d8bd',
}

/////////////////////////////////////////////////

export { AUTHOR, WEBSITE }
