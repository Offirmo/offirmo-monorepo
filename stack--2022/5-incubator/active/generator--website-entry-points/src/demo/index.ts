import assert from 'tiny-invariant'
import { Immutable, Author, Thing, ThingWithOnlinePresence } from '@offirmo-private/ts-types'
import * as path from 'node:path'
import * as util from 'node:util'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'

import generateꓽwebsiteᝍentryᝍpoint from '../index.js'
import * as SVG from '../utils/svg/index.js'
import { createꓽfrom_emoji } from '../utils/svg/index.js'
import { HtmlString } from '../generate--index-html/types'
import { Category } from '../types'

/////////////////////////////////////////////////

const EXAMPLEⵧWEBAPPⵧTBRPG2023: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = (() => {
	const AUTHOR: Author = {
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

	const SPEC: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
		...THING_ONLINE,

		preset: 'game',

		title: 'The Boring RPG',
		icon: SVG.createꓽfrom_emoji('⚔️'),
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
			html: [],
			css: [],
			js: [],
		},

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
	}

	return SPEC
})()

/////////////////////////////////////////////////

const result = generateꓽwebsiteᝍentryᝍpoint(
	//EXAMPLEⵧSIMPLE_PAGE
	EXAMPLEⵧWEBAPPⵧTBRPG2023
	//EXAMPLEⵧEXPERIMENTⵧVIEWPORT
	//ADVENTURERS_FANTASY_ILLUSTRATION
)

Object.keys(result).forEach(basename => {
	console.log(`\n📄 ${basename}`)
	console.log(result[basename])
})

/////////////////////////////////////////////////
const dirpath = path.join((process as any).env.PWD, 'dist', 'public')
// TODO rm?
fs.mkdirSync(dirpath, { recursive: true })
Object.keys(result).forEach(basename => {
	const filepath = path.join(dirpath, basename)
	fs.writeFileSync(
		filepath,
		result[basename]!,
		{
			encoding: 'utf8',
		}
	)
})

/////////////////////////////////////////////////
