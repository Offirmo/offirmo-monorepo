import type {
	Author,
	SocialNetworkLink,
	Url‿str,
	Thing,
	WithOnlinePresence,
	ThingWithOnlinePresence,
} from '@monorepo-private/ts--types--web'

import type { WebProperty } from '@monorepo-private/generator--website-entry-points'

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

//const SOCIAL_LINKⵧGITHUB: SocialNetworkLink      = { network: 'github',      handle: 'TODO',   url: 'https://github.com/TODO'           }
//const SOCIAL_LINKⵧTWITTER: SocialNetworkLink     = { network: 'twitter',     handle: 'TODO',       url: 'https://x.com/@TODO'          }

const AUTHOR: Author = {
	name: 'TODO persona',
	intro: 'Web3 engineer',
	//email: EMAIL,

	urlⵧcanonical: 'TODO',

	urlsⵧsocial: [
		//SOCIAL_LINKⵧGITHUB,
		//SOCIAL_LINKⵧTWITTER
	],
}

/////////////////////////////////////////////////

const THING: Thing = {
	lang: 'en',
	description: 'Useful builder docs in a single place',
	author: AUTHOR,
	since‿y: 2026,
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'TODO',
	urlsⵧsocial: [
		// TODO
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

	title: 'Dev Docs Web3',
	icon: {
		emoji: '🧱',
		//svg: path.join(__dirname, './icon--rpg.svg'),
	},
	keywords: ['documentation', 'web3'],
	content: {},
	features: [
		'cssⳇbox-layout--natural',
		'cssⳇviewport--full',
		'normalize-url-trailing-slash',
		'cssⳇframework--offirmo',
		//'htmlⳇreact-root',
		//'page-loader--offirmo',
		//'analytics--google',
		//'site-verification--google',
	],

	/////// SOCIAL
	// TODO

	/////// POLISH
	colorⵧbackground: '#17191C',
	colorⵧforeground: '#FE6F39',
	colorⵧtheme: '#17191C',
}

/////////////////////////////////////////////////

export { AUTHOR, WEBSITE }
