import assert from 'tiny-invariant'
import { Immutable, AnyPath } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from './types.js'

import {
	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,
	getꓽicon__sizes,
	getꓽicon__path,
} from './selectors.js'
import generateꓽindexᐧhtml from './generate--index-html/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'
import { generateꓽfile as generateꓽicon_file } from './generate--icons/index.js'
import generateꓽhumansᐧtxt from './generate--humans-txt/index.js'
import generateꓽrobotsᐧtxt from './generate--robots-txt/index.js'
import generateꓽsecurityᐧtxt from './generate--security-txt/index.js'
import generateꓽsource_code from './generate--src/index.js'

import * as path from 'node:path'
import * as fs from '@offirmo/cli-toolbox/fs/extra'

/////////////////////////////////////////////////

function getꓽwebsiteᝍentryᝍpoints(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	return {
		// MAIN
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),

		// ICONS
		...getꓽicon__sizes(spec).reduce((acc, size) => {
				acc[getꓽicon__path(spec, size)] = generateꓽicon_file(spec, size)
				return acc
		}, {} as EntryPoints),
		// size-less version
		[getꓽicon__path(spec, null)]: generateꓽicon_file(spec, null),

		// APP
		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	')}),
		...(spec.sourcecode && generateꓽsource_code(spec)),

		// MISC
		'humans.txt': generateꓽhumansᐧtxt(spec),
		'robots.txt': generateꓽrobotsᐧtxt(spec),
		'.well-known/security.txt': generateꓽsecurityᐧtxt(spec),
	}
}

/////////////////////////////////////////////////

async function writeꓽwebsiteᝍentryᝍpoints(entries: Immutable<EntryPoints>, dir: AnyPath): Promise<EntryPoints> {
	const dirpath = dir.startsWith('/')
		? dir
		: path.join(process.cwd(), dir)
	console.log(`📁 ${dirpath}`)
	// TODO rm? too dangerous?

	Object.keys(entries).sort().forEach(basename => {
		console.log(`↳ 📄 ${basename}`)
		//console.log(entries[basename])
	})

	return Promise.all(Object.keys(entries).map(basename => {
			const filepath = path.join(dirpath, basename)
			return fs.outputFile(
					filepath,
					entries[basename]!,
					{
						encoding: 'utf8',
					}
				)
				.catch((err : any) => {
					console.error(`Error while writing ${filepath}`, err)
					throw err
				})
		}))
		.then(() => entries)
}

/////////////////////////////////////////////////

async function generateꓽwebsiteᝍentryᝍpoints(spec: Immutable<WebsiteEntryPointSpec>, dir: AnyPath): Promise<EntryPoints> {
	const entries = getꓽwebsiteᝍentryᝍpoints(spec)
	return writeꓽwebsiteᝍentryᝍpoints(entries, dir)
}

/////////////////////////////////////////////////

export default generateꓽwebsiteᝍentryᝍpoints

export {
	getꓽwebsiteᝍentryᝍpoints,
	writeꓽwebsiteᝍentryᝍpoints,
	generateꓽwebsiteᝍentryᝍpoints,
}
export * from './types.js'
export * as SVG from './utils/svg/index.js'
