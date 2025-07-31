
import type { PathSegment, AbsolutePath, RelativePath, AnyPath, Immutable, PathSegment } from '@offirmo-private/ts-types'

import type { MonorepoSpec } from '@infinite-monorepo/types'
import * as process from 'node:process'
import { string } from 'prop-types'

/////////////////////////////////////////////////

function search_forꓽroot(starting_point: AnyPath) {
	throw new Error(`Not implemented!`)
}

function findꓽconfig(starting_point?: AnyPath) {
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
	| ({type: 'file--manifest'} & StructuredFsOutputⳇFileManifest)
	| ({type: 'file--full'} & StructuredFsOutputⳇFullFile)
	| ({type: 'file--line--ensure'} & StructuredFsOutputⳇEnsureLine)
	| ({type: 'file--kv--ensure'} & StructuredFsOutputⳇEnsureKeyValue)

/////////////////////////////////////////////////

class Output {
	#queue: Array<StructuredFsOutput> = []

	pushManifest(manifest: StructuredFsOutputⳇFileManifest) {
		this.#queue.push({
			type: 'file--manifest',
			...manifest,
		})
	}
}

/////////////////////////////////////////////////


async function apply() {
	console.log(`Applying...`)

	const config = loadꓽconfig()

	const output: Array<StructuredFsOutput>

	;(function ᐧnvmrc(){
		const file_path: StructuredFsOutput['file_path'] = [ '$MONOREPO_ROOT', '.nvmrc']

		const nvmrcⵧmanifest: StructuredFsOutputⳇFileManifest = {
			file_path,
			intent: 'ensure',
			format: 'text',
		}
		output.push(nvmrcⵧmanifest)

		const nvmrcⵧcontent: StructuredFsOutputⳇFullFile = {
			file_path,
			lines: [ XXX ]
		}
	})()

	// TODO all root files
	// TODO nvmrc



}

/////////////////////////////////////////////////

console.log(`Hi!`)

await apply()
