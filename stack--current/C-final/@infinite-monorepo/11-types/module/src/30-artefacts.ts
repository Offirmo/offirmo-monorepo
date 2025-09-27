import type { AbsolutePath, RelativePath } from '@offirmo-private/ts-types'
import type { StructuredFileFormat } from '@infinite-monorepo/read-write-any-structured-file'
import type { MultiRepoRelativeFilePath } from './20-graph.ts'

/////////////////////////////////////////////////

export interface StructuredFsⳇFileManifest {
	path‿ar: MultiRepoRelativeFilePath

	// SSOT: only needed if not inferrable, ex. from the extension
	format?: StructuredFileFormat

	hints?: {
		comment_prefixⵧsingle_line?: string | null
		sort_siblings?: boolean
		trailing_line?: 'ensure-present' | 'ensure-absent'
		trim_trailing_spaces?: boolean
	}

	$schema?: `https://www.schemastore.org/${string}.json`
	doc: Array<string>
}

export const DEFAULT_HINTS: NonNullable<StructuredFsⳇFileManifest['hints']> = {
	comment_prefixⵧsingle_line: null,
	sort_siblings: true,
	trailing_line: 'ensure-present',
	trim_trailing_spaces: true,
}

/////////////////////////////////////////////////
