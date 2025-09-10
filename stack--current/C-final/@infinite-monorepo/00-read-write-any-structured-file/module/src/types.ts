import type { JSONObject } from '@offirmo-private/ts-types'

export const STRUCTURED_FILE_FORMATS = [
	'import', // js/ts exporting a default JSONObject
	'json5', // https://json5.org/
	'jsonc', // https://jsonc.org/
	'jsoncⵧwith_trailing_comma', // common extension
	'json', // https://www.json.org
	'yaml',
	// csv
	//| 'kv-simple' // multiple lines `k v` ex. .yarnrc
	'list', // multiple lines ex. .gitignore WILL STRIP COMMENTS
	'single-value', // single line, ex .nvmrc
	// last resort
	'text', // no known or supported structure, just text with EOL and trailing line
	'unknown',
] as const
export type StructuredFileFormat = (typeof STRUCTURED_FILE_FORMATS)[number]

export const STRUCTURED_FILE_FORMATS__PARSERS = [
	'import', // js/ts exporting a default JSONObject
	'json5', // can handle any json flavour
	'yaml',
	'list', // multiple lines ex. .gitignore WILL STRIP COMMENTS
	'single-value', // single line, ex .nvmrc
	'text', // no structure, just text
]
export type StructuredFileFormatⳇParser = (typeof STRUCTURED_FILE_FORMATS__PARSERS)[number]

export type ContentⳇTsImport = JSONObject
export type ContentⳇJson5 = JSONObject
export type ContentⳇYaml = JSONObject
export type ContentⳇList = { entries: string[] }
export type ContentⳇSingleValue = { value: string }
export type ContentⳇText = { text: string }
