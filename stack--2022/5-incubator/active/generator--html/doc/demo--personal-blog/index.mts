#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types'
import generateꓽwebsiteᝍentryᝍpoints, { type WebPage, type WebsiteEntryPointSpec } from '@offirmo-private/generator--website-entry-points'
import * as SVG from '../../src/utils/svg/index.js'

import { AUTHOR } from '@offirmo-private/marketing'

/////////////////////////////////////////////////

const THING: Thing = {
	author: AUTHOR,
	lang: 'en',
	description: 'Offirmo’s personal blog about tech, software and gamedev…',
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,

	urlⵧcanonical: AUTHOR.urlⵧcanonical,
	urlsⵧsocial: AUTHOR.urlsⵧsocial,
	// contact will be inherited from author
}
//contact: 'https://github.com/Offirmo/offirmo-monorepo/issues',

/////////////////////////////////////////////////
// Ok now we're a web page
const WEB_PAGE: WebPage = {
	...THINGⵧONLINE,

	title: 'Offirmo - Fullstack Developer',
	icon: SVG.createꓽfrom_emoji('👨‍💻'),
	keywords: [ 'engineer', 'software', 'fullstack', 'developer', 'open-source', 'indie'],

	features: [
		'cssⳇbox-layout--natural',
		'normalize-url-trailing-slash',
		'cssⳇfoundation--offirmo',
		//'cssⳇframework--offirmo',
		//'page-loader--offirmo',
	],

	// Polish
	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme:      'hsl(248,  9%, 17%)',
}

/////////////////////////////////////////////////
const SPEC: WebsiteEntryPointSpec = {
	...WEB_PAGE,

	preset: 'blog',
}

/////////////////////////////////////////////////


await generateꓽwebsiteᝍentryᝍpoints(SPEC, path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'), {rm: false,})