#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'
import * as SVG from '@offirmo-private/generator--svg'

import { type HtmlDocumentSpec, getꓽhtml‿str } from '@offirmo-private/generator--html'

import { AUTHOR } from '@offirmo-private/marketing'
import { FeatureSnippets, HtmlMetas, Links } from '../../src'

/////////////////////////////////////////////////

const THING: Thing = {
	lang: 'en',
	description: 'Offirmo’s personal blog about tech, software and gamedev…',
	author: AUTHOR,
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

/////////////////////////////////////////////////
const SPEC: HtmlDocumentSpec = {
	lang: THINGⵧONLINE.lang,

	content: {
		title: 'Offirmo - Fullstack Developer',
		features: [
			'cssⳇbox-layout--natural',
			'normalize-url-trailing-slash',
			'cssⳇfoundation--offirmo',
			//'cssⳇframework--offirmo',
			//'page-loader--offirmo',
		],
	},

	//links?: Links
	//metas?: Partial<HtmlMetas>
}



	//icon: SVG.createꓽfrom_emoji('👨‍💻'),
	//keywords: [ 'engineer', 'software', 'fullstack', 'developer', 'open-source', 'indie'],



	// Polish
	//colorⵧbackground: 'hsl(337, 16%, 28%)',
	//colorⵧforeground: 'hsl(42, 100%, 87%)',
	//colorⵧtheme:      'hsl(248,  9%, 17%)',

/////////////////////////////////////////////////


const html = getꓽhtml‿str(SPEC)
console.log(html)
