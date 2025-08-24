import type { AbsolutePath, RelativePath } from '@offirmo-private/ts-types'

import type { MultiRepoRelativeFilePath } from './20-graph.ts'

/////////////////////////////////////////////////

export interface StructuredFsⳇFileManifest {
	path‿ar: MultiRepoRelativeFilePath

	// SSOT: only needed if not inferrable, ex. from the extension
	format?: 'json' | 'text' | 'ts' | 'yaml'

	hints?: {
		// TODO remove trailing spaces
		// TODO remove trailing line
		// TODO ensure line break
		// TODO sortable
		[k: string]: any
	}

	$schema?: `https://${string}/schema.json`
	doc: Array<string>
}

export interface StructuredFsOutputⳇFileManifest extends StructuredFsⳇFileManifest {
	intent: 'ensure' | 'delete'
}

export interface StructuredFsOutputⳇFullFile {
	file_path‿abs: AbsolutePath
	lines: Array<string>
}

export interface StructuredFsOutputⳇEnsureLine {
	file_path‿abs: AbsolutePath
	line: string
}

export interface StructuredFsOutputⳇEnsureKeyValue {
	file_path‿abs: AbsolutePath

	priority:
		| 'default' // can be overriden
		| 'normal' // conflicts between normal will be reported
	// important: TODO see if important

	key_path‿rel: RelativePath
	value: JSON
}

type StructuredFsOutput =
	| ({ type: 'fileⵧmanifest' } & StructuredFsOutputⳇFileManifest)
	| ({ type: 'fileⵧfull' } & StructuredFsOutputⳇFullFile)
	| ({ type: 'fileⵧlineⵧensure' } & StructuredFsOutputⳇEnsureLine)
	| ({ type: 'fileⵧkvⵧensure' } & StructuredFsOutputⳇEnsureKeyValue)

/////////////////////////////////////////////////
