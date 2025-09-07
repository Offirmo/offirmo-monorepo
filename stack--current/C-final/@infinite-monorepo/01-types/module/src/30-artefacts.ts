import type { AbsolutePath, RelativePath } from '@offirmo-private/ts-types'
import type { StructuredFileFormat } from '@infinite-monorepo/read-write-any-structured-file'
import type { MultiRepoRelativeFilePath } from './20-graph.ts'

/////////////////////////////////////////////////

export interface StructuredFsⳇFileManifest {
	path‿ar: MultiRepoRelativeFilePath

	// SSOT: only needed if not inferrable, ex. from the extension
	format?: StructuredFileFormat

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

//	priority:
//	| 'default' // can be overriden
//| 'normal' // conflicts between normal will be reported
// important: TODO see if important

/////////////////////////////////////////////////
