import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as path from 'node:path'
import * as util from 'node:util'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'

import generateꓽwebsiteᝍentryᝍpoint from '../index.js'

/////////////////////////////////////////////////


const EXAMPLEⵧSIMPLE_PAGE: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	title: 'The Boring RPG',
}

const EXAMPLEⵧWEBAPPⵧTBRPG2023: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	semanticⳇisꓽpwa: 'installable',

	title: 'The Boring RPG',
	description: '(Browser game) The simplest RPG ever! (indie game, free to play, no account needed)',
	keywords: [ 'game', 'incremental', 'fantasy', 'rpg', 'free', 'indie'],
}

/////////////////////////////////////////////////

const result = generateꓽwebsiteᝍentryᝍpoint(
	//EXAMPLEⵧSIMPLE_PAGE
EXAMPLEⵧWEBAPPⵧTBRPG2023
)

Object.keys(result).forEach(basename => {
	console.log(`\n📄 ${basename}`)
	console.log(result[basename])
})

/////////////////////////////////////////////////
const dirpath = path.join((process as any).env.PWD, '..', 'dist', 'public')
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
