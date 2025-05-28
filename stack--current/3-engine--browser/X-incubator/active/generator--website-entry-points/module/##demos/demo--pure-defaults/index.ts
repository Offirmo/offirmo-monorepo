#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'


import type { Author, Thing, WithOnlinePresence, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'

import { AUTHOR } from '@offirmo-private/marketing'

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

const THING: Thing = {
	author: { name: 'anonymous' },
}

const ONLINE_PRESENCE: WithOnlinePresence = {
	//urlⵧcanonical: AUTHOR.urlⵧcanonical,
	//...(AUTHOR.urlsⵧsocial && {urlsⵧsocial: AUTHOR.urlsⵧsocial}),
}

/////////////////////////////////////////////////
// May NOT be a website!!
// could be a store on amazon, a post on social media...
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,

	contact: 'TODO',
}

/////////////////////////////////////////////////
// Ok now we're having a website

const WEBSITE: WebProperty = {
	...THINGⵧONLINE,

	//title: 'Offirmo - Fullstack Developer',
	//icon: { emoji: '👨‍💻' },
	//keywords: [ 'engineer', 'software', 'fullstack', 'developer', 'open-source', 'indie'],
	/*features: [
		'cssⳇbox-layout--natural',
		'normalize-url-trailing-slash',
		'cssⳇframework--offirmo',
	],*/

	/////// SOCIAL
	// TODO

	/////// POLISH
	/*colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme:      'hsl(248,  9%, 17%)',*/
}

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	host: 'cloudflare--pages',
}


/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints(
	SPEC,
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '~~output'),
	{rm: true},
)
