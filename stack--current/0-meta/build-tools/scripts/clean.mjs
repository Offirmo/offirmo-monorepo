#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

import { fileURLToPath } from 'node:url'
import path from 'node:path'

import meow from 'meow'
import stylize_string from 'chalk'
import fs from 'fs-extra'

/////////////////////

const cli = meow('clean', {
	importMeta: import.meta,
})

/////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PKG_PATH = process.cwd()
const PKG_JSON = JSON.parse(await fs.readFile(path.join(PKG_PATH, 'package.json')))
const PKG_NAME = PKG_JSON.name

const MONOREPO_ROOT_PATH = path.join(__dirname, '../../..')

/////////////////////

//console.log({PKG_PATH, DIST_DIR, DEPS_DIR})
console.log(`🧹  🔻 Cleaning ${stylize_string.bold(PKG_NAME)} [${cli.input}]...`)


Promise.all(cli.input
	.map(dir => {
		switch(dir) {

			case '…dist':
				return fs.remove(path.join(PKG_PATH, 'dist'))

			case '…cache':
				return Promise.all([
					fs.remove(path.join(PKG_PATH, '.cache')), // parcel 1 ?
					fs.remove(path.join(PKG_PATH, 'node_modules/.cache')),
					fs.remove(path.join(PKG_PATH, '.parcel')), // parcel 1
					fs.remove(path.join(PKG_PATH, '.parcel-cache')), // parcel 2
					fs.remove(path.join(MONOREPO_ROOT_PATH, '.parcel-cache')), // parcel 2 shared cache which causes heaps of troubles in monorepos
				])

			default:
				return fs.remove(path.join(PKG_PATH, dir))
		}
	})
)
	.then(() => console.log(`🧹  🔺 Cleaning ${stylize_string.bold(PKG_NAME)} [${cli.input}] done ✔`))
