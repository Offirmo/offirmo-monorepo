#!/usr/bin/env ts-node

import { Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types'
import generateꓽwebsiteᝍentryᝍpoint, { type WebPage, type WebsiteEntryPointSpec } from '@offirmo-private/generator--website-entry-points'
import { SVG } from '@offirmo-private/generator--website-entry-points/src/utils/svg'

/////////////////////////////////////////////////

const WEBAPPⵧTBRPG2023: WebsiteEntryPointSpec = (() => {

	const AUTHOR: Author = { // TODO externalize
		name: 'Offirmo',
		contact: 'offirmo.net@gmail.com',

		urlⵧcanonical: 'https://www.offirmo.net/',

		urlsⵧsocial: [
			{ network: 'artstation',  handle: 'Offirmo',   url: 'https://www.artstation.com/offirmo' },
			{ network: 'github',      handle: 'Offirmo',   url: 'https://github.com/Offirmo' },
			{ network: 'instagram',   handle: 'offirmo',   url: 'https://www.instagram.com/offirmo' },
			{ network: 'reddit',      handle: 'u/Offirmo', url: 'https://www.reddit.com/user/Offirmo' },
			{ network: 'producthunt', handle: '@offirmo',  url: 'https://www.producthunt.com/@offirmo' },
			{ network: 'twitter',     handle: 'Offirmo',   url: 'https://twitter.com/Offirmo' },
		],
	}

	const THING: Thing = {
		lang: 'en',
		description: '(Browser game) The simplest RPG ever! (indie game, free to play, no account needed)',
		author: AUTHOR,
		license: 'UNLICENSED', // the source is open but the game itself is not
	}

	const THING_ONLINE: ThingWithOnlinePresence = {
		...THING,

		urlⵧcanonical: 'https://www.online-adventur.es/apps/the-boring-rpg/',
		urlsⵧsocial: [
			{ network: 'reddit',      handle: 'r/boringrpg', url: 'https://www.reddit.com/r/boringrpg/' },
			// TODO more
		],

		version: '0.69.1',
		changelog: 'https://github.com/Offirmo/offirmo-monorepo/blob/main/stack--2022/C-apps--clients/the-boring-rpg/client--browser/CHANGELOG.md',
		source: 'https://github.com/Offirmo/offirmo-monorepo/tree/main/stack--2022/C-apps--clients/the-boring-rpg/client--browser',
	}

	const WEB_PAGE: WebPage = {
		...THING_ONLINE,

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
		colorⵧbackground: 'hsl(337, 16%, 28%)',
		colorⵧforeground: 'hsl(42, 100%, 87%)',
		colorⵧtheme:      'hsl(248,  9%, 17%)',

		sourcecode: true,

		/////// META
		isꓽdebug: true,
	}

	return SPEC
})()

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoint(WEBAPPⵧTBRPG2023, './src')
