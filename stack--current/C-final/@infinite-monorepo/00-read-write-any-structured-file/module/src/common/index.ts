import * as path from 'node:path'
import type { JSONObject, AnyFilePath, Immutable } from '@offirmo-private/ts-types'

import type {
	ContentⳇJson5,
	ContentⳇList,
	ContentⳇSingleValue,
	ContentⳇTsImport,
	ContentⳇYaml,
	StructuredFileFormat,
	StructuredFileFormatⳇParser,
} from '../types.ts'

/////////////////////////////////////////////////

function inferꓽformat_from_path(file_path: AnyFilePath): StructuredFileFormat | undefined {
	const basename = path.basename(file_path)
	const basename‿lc = basename.toLowerCase()
	const ᐧext‿lc = path.extname(basename‿lc)

	// extension is the strongest hint
	switch (ᐧext‿lc) {
		case '.json':
			return 'json'
		case '.jsonc':
			return 'jsonc'
		case '.json5':
			return 'json5'
		case '.js':
		case '.cjs':
		case '.mjs':
		case '.ts':
		case '.mts':
			return 'import'
		case '.yml':
		case '.yaml':
			return 'yaml'
		default:
			break
	}

	// then exact file match
	switch (basename‿lc) {
		case '.nvmrc':
			return 'single-value'
		default:
			break
	}

	// other hints
	switch (true) {
		case basename‿lc.endsWith('ignore'):
			// .gitignore .prettierignore etc.
			return 'list'
		default:
			break
	}

	return undefined
}
/*
function inferꓽformat_from_content_shape(
	content: Immutable<JSONObject>,
): StructuredFileFormat | undefined {
	return undefined
}
*/

/////////////////////////////////////////////////

export { inferꓽformat_from_path }
