#!/usr/bin/env ts-node

/**
 * yarn refresh--entry-points
 */

import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Thing, SocialNetworkLink, WithOnlinePresence, ThingWithOnlinePresence } from '@monorepo-private/ts--types--web'
import { AUTHOR } from '@monorepo-private/marketing/creator'

import generateꓽwebsiteᝍentryᝍpoints, { type WebProperty, type WebPropertyEntryPointSpec } from '@monorepo-private/generator--website-entry-points'
import { Category } from '@monorepo-private/generator--website-entry-points/src'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
	description: 'A simple PWA for debugging PWA things',
	author: AUTHOR,
	since‿y: 2024,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://www.online-adventur.es/apps/the-boring-rpg/', // TODO
	urlsⵧsocial: [
		// TODO
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

	title: 'PWA debugger',
	icon: {
		emoji: '📲',
	},
	keywords: [ 'devtool', 'PWA' ],
	content: {},
	features: [
		'cssⳇbox-layout--natural',
		'cssⳇviewport--full',
		'normalize-url-trailing-slash',
		//'cssⳇframework--offirmo',
		'htmlⳇreact-root',
		'analytics--google',
		//'site-verification--google',
		//TODO old browser check
	],

	/////// SOCIAL
	// TODO

	/////// POLISH
	colorⵧbackground: '#0047ab',
	colorⵧforeground: 'white',
	colorⵧtheme:      '#003278', // darker
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	/////// PWA
	wantsꓽinstall: 'partial', // TODO prompt
	hasꓽown_navigation: true,
	supportsꓽscreensⵧwith_shape: true,
	canꓽuse_window_controls_overlay: true,
	usesꓽpull_to_refresh: false,


	/////// JS SRC
	generatesꓽjsⵧscaffold: 'offirmo--react',
	content: {
		js: [`import '../app/index.ts'`]
	},

	/////// META
	host: 'netlify',
	isꓽpublic: true,
	isꓽdebug: true,
}

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints(
	SPEC,
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../entry-points'),
	{rm: true},
)
