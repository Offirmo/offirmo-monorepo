#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types'
import generateꓽwebsiteᝍentryᝍpoint, { type WebPage, type WebsiteEntryPointSpec } from '@offirmo-private/generator--website-entry-points'
import { SVG } from '@offirmo-private/generator--website-entry-points/src/utils/svg'

import { AUTHOR } from '@offirmo-private/marketing'

/////////////////////////////////////////////////

const THING: Thing = {
	lang: 'en',
	description: 'Offirmo’s personal blog about tech, software and gamedev…',
	author: AUTHOR,
}

const SPEC: WebsiteEntryPointSpec = (() => {



	const THINGⵧONLINE: ThingWithOnlinePresence = {
		...THING,

		urlⵧcanonical: 'https://www.online-adventur.es/apps/the-boring-rpg/',
		urlsⵧsocial: [
			{ network: 'reddit',      handle: 'r/boringrpg', url: 'https://www.reddit.com/r/boringrpg/' },
			// TODO more
		],

		version: '0.69.1', // TODO auto-link?
		changelog: 'https://github.com/Offirmo/offirmo-monorepo/blob/main/stack--2022/C-apps--clients/the-boring-rpg/client--browser/CHANGELOG.md',
		source: 'https://github.com/Offirmo/offirmo-monorepo/tree/main/stack--2022/C-apps--clients/the-boring-rpg/client--browser',
	}

	const WEB_PAGE: WebPage = {
		...THINGⵧONLINE,

		title: 'The Boring RPG',
		//icon: SVG.createꓽfrom_emoji('⚔️'),
		keywords: [ 'game', 'incremental', 'fantasy', 'rpg', 'free', 'indie'],

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
				'snippet:react-root',
			],
			css: [
			],
			js: [
			],
		},
	}

	const SPEC: WebsiteEntryPointSpec = {
		...WEB_PAGE,

		preset: 'game',

		// PWA
		wantsꓽinstall: 'prompt',
		hasꓽown_navigation: true,
		supportsꓽscreensⵧwith_shape: true,
		canꓽuse_window_controls_overlay: true,
		usesꓽpull_to_refresh: false,

		// Polish
		colorⵧbackground: 'hsl(337, 16%, 28%)', // TODO type
		colorⵧforeground: 'hsl(42, 100%, 87%)',
		colorⵧtheme:      'hsl(248,  9%, 17%)',

		sourcecode: true,

		/////// META
		isꓽdebug: true,
	}

	return SPEC
})()

/////////////////////////////////////////////////


await generateꓽwebsiteᝍentryᝍpoint(SPEC, path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'))
