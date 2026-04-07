import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { ೱoutputꓽfile } from '@monorepo-private/fs--output-file'

import assert from '@monorepo-private/assert/v1'
import * as Prettier from 'prettier'
import type { Immutable, PathⳇAbsolute } from '@monorepo-private/ts--types'

import { DIR_FILES_TO_SERVE } from './consts.ts'
import type { EntryPoints, WebPropertyEntryPointSpec } from './types.ts'

import { needsꓽwebmanifest, getꓽbasenameⵧwebmanifest, shouldꓽgenerateꓽjscode } from './selectors/index.ts'

import generateꓽhtml from './generate--html/index.ts'
import generateꓽicons from './generate--icons/index.ts'
import generateꓽmisc_root_files from './generate--misc-root-files/index.ts'
import generateꓽsource_code from './generate--src/index.ts'
import generateꓽwebmanifest from './generate--webmanifest/index.ts'
import generateꓽwell_known from './generate--well-known/index.ts'

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
		// XXX
		'~~gen/logs/spec.json': JSON.stringify(spec, undefined, '	'),
	}
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
async function writeꓽwebsiteᝍentryᝍpoints(entries: Immutable<EntryPoints>, targetDir: PathⳇAbsolute): Promise<EntryPoints> {
	targetDir = path.normalize(targetDir)
	assert(path.isAbsolute(targetDir), `dir must be absolute, got "${targetDir}"`)
	console.log(`📁 ${targetDir}`)

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
					case '.jsonc':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'json' })
						break
					case '.ts':
						assert(typeof file__content === 'string', `file ${file__path} should be a string!`)
						file__content = await Prettier.format(file__content, { ...PRETTIER_OPTIONS, parser: 'typescript' })
						break
					case '.ts':
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

			return await ೱoutputꓽfile(file__path, file__content, {
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
	targetDir: PathⳇAbsolute,
	options: {
		rm?: boolean
	} = {},
): Promise<EntryPoints> {
	const entries = getꓽwebsiteᝍentryᝍpoints(spec)

	if (options.rm) {
		await fs.rm(targetDir, { recursive: true, force: true })
	}

	return writeꓽwebsiteᝍentryᝍpoints(entries, targetDir)
}

/////////////////////////////////////////////////

export {
	getꓽwebsiteᝍentryᝍpoints,
	writeꓽwebsiteᝍentryᝍpoints,
	generateꓽwebsiteᝍentryᝍpoints,
}
