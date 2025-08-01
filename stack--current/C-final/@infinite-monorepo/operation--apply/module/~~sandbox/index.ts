
import type { PathSegment, AbsolutePath, RelativePath, AnyPath, Immutable } from '@offirmo-private/ts-types'

import type { MonorepoSpec } from '@infinite-monorepo/types'
import * as process from 'node:process'

/////////////////////////////////////////////////

function search_forꓽroot(starting_point: AnyPath) {
	throw new Error(`Not implemented!`)
}

function findꓽconfig() {
	const cwd = process.cwd()

}

function loadꓽconfigⵧraw(): Partial<MonorepoSpec> {
	throw new Error(`Not implemented!`)
}

function loadꓽconfig(): Immutable<MonorepoSpec> {
	const raw = loadꓽconfigⵧraw()
	return {
		...raw,
	}
}

/////////////////////////////////////////////////

interface StructuredFsOutputⳇFileManifest {
	file_path: Array<PathSegment>

	intent:
		| 'ensure'
		| 'delete'

	// only set if not inferrable, ex. from the extension
	format?:
		| 'json'
		| 'text'
		| 'ts'
		| 'yaml'

	hints?: {
		// TODO remove trailing spaces
		// TODO remove trailing line
		// TODO ensure line break
		// TODO sortable
		[k: string]: any
	}

	// TODO json schema etc.
	doc: Array<string>
}

interface StructuredFsOutputⳇFullFile {
	file_path: AbsolutePath
	lines: Array<string>
}

interface StructuredFsOutputⳇEnsureLine {
	file_path: AbsolutePath
	line: string
}

interface StructuredFsOutputⳇEnsureKeyValue {
	file_path: AbsolutePath

	priority:
		| 'default' // can be overriden
		| 'normal'  // conflicts between normal will be reported
		// important: TODO see if important

	key_path: RelativePath
	value: JSON
}

type StructuredFsOutput =
	| ({type: 'fileⵧmanifest'} & StructuredFsOutputⳇFileManifest)
	| ({type: 'fileⵧfull'} & StructuredFsOutputⳇFullFile)
	| ({type: 'fileⵧlineⵧensure'} & StructuredFsOutputⳇEnsureLine)
	| ({type: 'fileⵧkvⵧensure'} & StructuredFsOutputⳇEnsureKeyValue)

/////////////////////////////////////////////////

class Output {
	#queue: Array<StructuredFsOutput> = []

	pushManifest(manifest: StructuredFsOutputⳇFileManifest) {
		this.#queue.push({
			type: 'fileⵧmanifest',
			...manifest,
		})
	}

	pushFile(content: StructuredFsOutputⳇFullFile) {
		this.#queue.push({
			type: 'fileⵧfull',
			...content,
		})
	}
}

/////////////////////////////////////////////////


async function apply() {
	console.log(`Applying...`)

	const config = loadꓽconfig()

	const output = new Output()

	;(function nvm(){
		const file_path: StructuredFsOutput['file_path'] = [ '$MONOREPO_ROOT', '.nvmrc']

		const nvmrcⵧmanifest: StructuredFsOutputⳇFileManifest = {
			file_path,
			intent: 'ensure',
			format: 'text',
			doc: [
				'https://github.com/nvm-sh/nvm?tab=readme-ov-file#nvmrc',
				'https://www.npmjs.com/package/nvmrc'
			],
		}
		output.pushManifest(nvmrcⵧmanifest)

		const nvmrcⵧcontent: StructuredFsOutputⳇFullFile = {
			file_path,
			lines: [ XXX ]
		}
		output.pushFile(nvmrcⵧcontent)

	})()

	// TODO all root files
	// TODO nvmrc



}

/////////////////////////////////////////////////

console.log(`Hi!`)

await apply()
