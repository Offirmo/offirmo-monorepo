import assert from 'tiny-invariant'
import * as Prettier from 'prettier'
import { Immutable, AbsolutePath } from '@offirmo-private/ts-types'

import { EntryPoints, WebPropertyEntryPointSpec } from './types.js'

import {
	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧaboutᐧhtml,
	getꓽbasenameⵧcontactᐧhtml,
	getꓽbasenameⵧerrorᐧhtml,
	getꓽbasenameⵧwebmanifest,
	getꓽicon__sizes,
	getꓽicon__path,
	shouldꓽgenerateꓽsourcecode,
} from './selectors/index.js'
import {
	generateꓽindexᐧhtml,
	generateꓽaboutᐧhtml,
	generateꓽcontactᐧhtml,
	generateꓽerrorᐧhtml,
} from './generate--html/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'
import { generateꓽfile as generateꓽicon_file } from './generate--icons/index.js'
import generateꓽhumansᐧtxt from './generate--humans-txt/index.js'
import generateꓽrobotsᐧtxt from './generate--robots-txt/index.js'
import generateꓽsecurityᐧtxt from './generate--security-txt/index.js'
import generateꓽsource_code from './generate--src/index.js'

import * as path from 'node:path'
import * as fs from '@offirmo/cli-toolbox/fs/extra'

/////////////////////////////////////////////////

function getꓽwebsiteᝍentryᝍpoints(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		// MAIN
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),
		[getꓽbasenameⵧaboutᐧhtml(spec)]: generateꓽaboutᐧhtml(spec),
		[getꓽbasenameⵧcontactᐧhtml(spec)]: generateꓽcontactᐧhtml(spec),
		[getꓽbasenameⵧerrorᐧhtml(spec)]: generateꓽerrorᐧhtml(spec),

		// ICONS
		...getꓽicon__sizes(spec).reduce((acc, size) => {
			acc[getꓽicon__path(spec, size)] = generateꓽicon_file(spec, size)
			return acc
		}, {} as EntryPoints),
		// size-less version
		[getꓽicon__path(spec, null)]: generateꓽicon_file(spec, null),

		// APP
		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	')}),
		...(shouldꓽgenerateꓽsourcecode(spec) && generateꓽsource_code(spec)),

		// MISC
		'humans.txt': generateꓽhumansᐧtxt(spec),
		'robots.txt': generateꓽrobotsᐧtxt(spec),
		'.well-known/security.txt': generateꓽsecurityᐧtxt(spec),
	}
}

/////////////////////////////////////////////////
// write to file

const PRETTIER_OPTIONS = {
	printWidth: 120,
	tabWidth: 3,
	useTabs: true,
	semi: false,
	singleQuote: true, jsxSingleQuote: true,
	quoteProps: 'consistent',
	arrowParens: 'avoid',

} satisfies Partial<Prettier.RequiredOptions>

// dir must be absolute bc. from where would we resolve it?
async function writeꓽwebsiteᝍentryᝍpoints(entries: Immutable<EntryPoints>, targetDir: AbsolutePath): Promise<EntryPoints> {
	targetDir = path.normalize(targetDir)
	assert(path.isAbsolute(targetDir), `dir must be absolute, got "${targetDir}"`)
	console.log(`📁 ${targetDir}`)
	// TODO rm? too dangerous?

	Object.keys(entries).sort().forEach(basename => {
		console.log(`↳ 📄 ${basename}`)
		//console.log(entries[basename])
	})

	return Promise.all(Object.keys(entries).map(async (basename) => {
			const file__path = path.join(targetDir, basename)
			let file__content = entries[basename]!

			switch (path.extname(file__path)) {
				case '.html':
					file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: "html" })
					break
				case '.css':
					file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: "css" })
					break
				case '.json':
					file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: "json" })
					break
				case '.ts':
					file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: "typescript" })
					break
				case '.js':
					file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: "acorn" })
					break
				default:
					break
			}

			return fs.outputFile(
					file__path,
					file__content,
					{
						encoding: 'utf8',
					}
				)
				.catch((err : any) => {
					console.error(`Error while writing ${file__path}`, err)
					throw err
				})
		}))
		.then(() => entries)
}

/////////////////////////////////////////////////

async function generateꓽwebsiteᝍentryᝍpoints(spec: Immutable<WebPropertyEntryPointSpec>, targetDir: AbsolutePath, options: {
	rm?: boolean,
} = {}): Promise<EntryPoints> {
	const entries = getꓽwebsiteᝍentryᝍpoints(spec)

	if (options.rm) {
		await fs.remove(targetDir);
	}

	return writeꓽwebsiteᝍentryᝍpoints(entries, targetDir)
}

/////////////////////////////////////////////////

export default generateꓽwebsiteᝍentryᝍpoints

export {
	getꓽwebsiteᝍentryᝍpoints,
	writeꓽwebsiteᝍentryᝍpoints,
	generateꓽwebsiteᝍentryᝍpoints,
}
export * from './types.js'
