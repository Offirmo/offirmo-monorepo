import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as path from 'node:path'
import * as util from 'node:util'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'

import generateꓽwebsiteᝍentryᝍpoint from '../index.js'

/////////////////////////////////////////////////


const EXAMPLEⵧSIMPLE_PAGE: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	isꓽpublic: true,
	title: 'The Boring RPG',
}

const EXAMPLEⵧWEBAPPⵧTBRPG2023: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	isꓽpublic: true,
	wantsꓽinstall: 'prompt',
	hasꓽown_navigation: true,
	supportsꓽscreensⵧwith_shape: true,
	canꓽuse_window_controls_overlay: true,
	usesꓽpull_to_refresh: false,

	title: 'The Boring RPG',
	description: '(Browser game) The simplest RPG ever! (indie game, free to play, no account needed)',
	keywords: [ 'game', 'incremental', 'fantasy', 'rpg', 'free', 'indie'],

	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme: 'hsl(248,  9%, 17%)',

	styles: [
		'snippet:natural-box-layout',
		``,
	]
}

const EXAMPLEⵧEXPERIMENTⵧVIEWPORT: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	isꓽpublic: false,
	isꓽdebug: true,

	wantsꓽinstall: 'partial',
	hasꓽown_navigation: true,
	supportsꓽscreensⵧwith_shape: true,
	canꓽuse_window_controls_overlay: true,
	//usesꓽpull_to_refresh: false,

	title: 'Viewport Test 03',
	description: 'Prototype of PWA-compatible page using the full viewport',

	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme: 'hsl(248,  9%, 17%)',

	styles: [
		'snippet:natural-box-layout',
		``,
	]
}

/////////////////////////////////////////////////

const result = generateꓽwebsiteᝍentryᝍpoint(
	//EXAMPLEⵧSIMPLE_PAGE
	//EXAMPLEⵧWEBAPPⵧTBRPG2023
	EXAMPLEⵧEXPERIMENTⵧVIEWPORT
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
