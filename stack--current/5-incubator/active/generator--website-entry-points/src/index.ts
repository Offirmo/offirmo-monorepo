import * as path from 'node:path'
import * as fs from '@offirmo/cli-toolbox/fs/extra'
import assert from 'tiny-invariant'
import * as Prettier from 'prettier'
import { Immutable, AbsolutePath } from '@offirmo-private/ts-types'

import { EntryPoints, WebPropertyEntryPointSpec } from './types.js'

import { needsꓽwebmanifest, getꓽbasenameⵧwebmanifest, shouldꓽgenerateꓽjscode } from './selectors/index.js'

import generateꓽhtml from './generate--html/index.js'
import generateꓽicons from './generate--icons/index.js'
import generateꓽmisc_root_files from './generate--misc-root-files/index.js'
import generateꓽsource_code from './generate--src/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'
import generateꓽwell_known from './generate--well-known/index.js'

/////////////////////////////////////////////////

function getꓽwebsiteᝍentryᝍpoints(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		...generateꓽhtml(spec),
		...generateꓽicons(spec),
		...generateꓽwell_known(spec),
		...generateꓽmisc_root_files(spec),

		// PWA
		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	') }),

		// JS SRC
		...(shouldꓽgenerateꓽjscode(spec) && generateꓽsource_code(spec)),

		// meta
		'~~gen/logs/spec.json': JSON.stringify(spec, undefined, '	'),
	}
}

// for unit testing
function __getꓽwebsiteᝍentryᝍpoints__specs(spec: Immutable<WebPropertyEntryPointSpec>): {
	[relpath: string]: any // TODO better type
} {
	throw new Error('NIMP!')
}

/////////////////////////////////////////////////
// write to file

const PRETTIER_OPTIONS = {
	printWidth: 120,
	tabWidth: 3,
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	quoteProps: 'consistent',
	arrowParens: 'avoid',
} satisfies Partial<Prettier.RequiredOptions>

// dir must be absolute bc. from where would we resolve it?
async function writeꓽwebsiteᝍentryᝍpoints(entries: Immutable<EntryPoints>, targetDir: AbsolutePath): Promise<EntryPoints> {
	targetDir = path.normalize(targetDir)
	assert(path.isAbsolute(targetDir), `dir must be absolute, got "${targetDir}"`)
	console.log(`📁 ${targetDir}`)
	// TODO rm? too dangerous?

	Object.keys(entries)
		.sort()
		.forEach(basename => {
			console.log(`↳ 📄 ${basename}`)
			//console.log(entries[basename])
		})

	return Promise.all(
		Object.keys(entries).map(async basename => {
			const file__path = path.join(targetDir, basename)
			let file__content = entries[basename]!

			try {
				switch (path.extname(file__path)) {
					case '.html':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'html' })
						break
					case '.css':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'css' })
						break
					case '.json':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'json' })
						break
					case '.ts':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'typescript' })
						break
					case '.js':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'acorn' })
						break
					default:
						break
				}
			} catch (prettier_err) {
				console.warn(`Error while formatting ${file__path}`, prettier_err)
				console.error("------\ncontent:\n", file__content, '\n------')
				// swallow the error, write the un-minified content for analysis
			}

			// privacy
			if (typeof file__content === 'string')
				file__content = file__content.replace(process.env['HOME'] ?? '$HOME', '~')

			return fs
				.outputFile(file__path, file__content, {
					...(typeof file__content === 'string' && { encoding: 'utf8' }),
				})
				.catch((err: any) => {
					console.error(`Error while writing ${file__path}`, err)
					throw err
				})
		}),
	).then(() => entries)
}

/////////////////////////////////////////////////

async function generateꓽwebsiteᝍentryᝍpoints(
	spec: Immutable<WebPropertyEntryPointSpec>,
	targetDir: AbsolutePath,
	options: {
		rm?: boolean
	} = {},
): Promise<EntryPoints> {
	const entries = getꓽwebsiteᝍentryᝍpoints(spec)

	if (options.rm) {
		await fs.remove(targetDir)
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
