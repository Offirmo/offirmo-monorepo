/*
WebPropertyEntryPointSpec
⇲ WebProperty
	⇲ ThingWithOnlinePresence
		⇲ WithOnlinePresence
		⇲ Thing
			↳ Author
*/
import {
	getꓽgravatar_url,
	type WebPropertyEntryPointSpec,
	type WebProperty,
	type ThingWithOnlinePresence,
	type WithOnlinePresence,
	type Thing,
	type Author,
	type SocialNetworkLink,
	type Url‿str,
	type Email‿str,
} from '@offirmo-private/generator--website-entry-points'

/////////////////////////////////////////////////

import { AUTHOR } from './author--ye.js'

/////////////////////////////////////////////////

const THING: Thing = {
	lang: 'en',
	description: `AI Magic 8 ball`,
	author: AUTHOR,
	since‿y: 2024,
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://yvem.github.io/applied-ai--8ball/',
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'https://github.com/Yvem/applied-ai--8ball/issues',
}

/////////////////////////////////////////////////
// Ok now we're having a website

const WEB_PROPERTY: WebProperty = {
	...THINGⵧONLINE,

	title: THING.description,
	icon: { emoji: '🎱' },
	content: {
		html: [
			`
<main>
	TODO
</main>
			`
		],
		//html__root__attributes: [],
		//css: [],
		//js: []
	},
	features: [
		//'cssⳇbox-layout--natural',
		//'normalize-url-trailing-slash',
		//'cssⳇframework--offirmo',
	],

	/////// SOCIAL
	// TODO

	/////// POLISH
	// https://www.canva.com/colors/color-palettes/spoonfull-of-delight/
	// https://www.canva.com/colors/color-palettes/deep-merlot/
	//colorⵧbackground: '#0c0c1e', // https://www.canva.com/colors/color-meanings/dark-blue/
	//colorⵧforeground: '#fdf4e3',
	//colorⵧtheme:      '#5c97b8',
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEB_PROPERTY,

	//preset: 'blog',

	/////// PWA
	// (not a PWA)

	/////// SRC
	// TODO refine

	/////// META
	host: 'github-pages',
	env: 'prod',
	isꓽpublic: true,
	isꓽdebug: false,
}

/////////////////////////////////////////////////

export { SPEC }
