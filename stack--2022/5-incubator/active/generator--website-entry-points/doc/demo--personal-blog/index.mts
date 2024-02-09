#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types'
import generateꓽwebsiteᝍentryᝍpoint, { type WebPage, type WebsiteEntryPointSpec } from '@offirmo-private/generator--website-entry-points'
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
}

/////////////////////////////////////////////////
// Ok now we're a web page
const WEB_PAGE: WebPage = {
	...THINGⵧONLINE,

	title: 'Offirmo - Fullstack Developer',
	icon: SVG.createꓽfrom_emoji('👨‍💻'),
	keywords: [ 'engineer', 'software', 'fullstack', 'developer', 'open-source', 'indie'],

	// XXX TODO semantic
	content: {
		critical: {
			css: [
				'snippet:natural-box-layout',
			],
			js: [
				'snippet:normalize-trailing-slash',
			]
		},
		html: [
			//'snippet:react-root',
		],
		css: [
		],
		js: [
		],
	},
}

/////////////////////////////////////////////////
const SPEC: WebsiteEntryPointSpec = {
	...WEB_PAGE,

	preset: 'blog',
}

/////////////////////////////////////////////////


await generateꓽwebsiteᝍentryᝍpoint(SPEC, path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'))
