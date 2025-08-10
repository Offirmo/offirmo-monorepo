import type { AbsolutePath, PathSegment, RelativePath } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export interface StructuredFsOutputⳇFileManifest {
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

export interface StructuredFsOutputⳇFullFile {
	file_path: AbsolutePath
	lines: Array<string>
}

export interface StructuredFsOutputⳇEnsureLine {
	file_path: AbsolutePath
	line: string
}

export interface StructuredFsOutputⳇEnsureKeyValue {
	file_path: AbsolutePath

	priority:
		| 'default' // can be overriden
		| 'normal'  // conflicts between normal will be reported
	// important: TODO see if important

	key_path: RelativePath
	value: JSON
}

export type StructuredFsOutput =
	| ({type: 'fileⵧmanifest'} & StructuredFsOutputⳇFileManifest)
	| ({type: 'fileⵧfull'} & StructuredFsOutputⳇFullFile)
	| ({type: 'fileⵧlineⵧensure'} & StructuredFsOutputⳇEnsureLine)
	| ({type: 'fileⵧkvⵧensure'} & StructuredFsOutputⳇEnsureKeyValue)

/////////////////////////////////////////////////
