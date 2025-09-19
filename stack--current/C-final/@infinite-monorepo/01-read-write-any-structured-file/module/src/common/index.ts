import * as path from 'node:path'
import type { JSONObject, AnyFilePath, Immutable, JSON } from '@offirmo-private/ts-types'

import type { StructuredFileFormat } from '../types.ts'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

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

function _getꓽjson__type(a: Immutable<JSON>): 'object' | 'array' | 'primitive' | 'undef' {
	if (a === undefined) {
		return 'undef'
	}

	if (Array.isArray(a)) {
		return 'array'
	}

	if (a === null) return 'primitive'
	if (['string', 'number', 'boolean'].includes(typeof a)) return 'primitive'

	if (isꓽobjectⵧliteral(a as any)) {
		return 'object'
	}

	throw new Error('Incorrect JSON!')
}

function mergeꓽjson(a: Immutable<JSON>, b: Immutable<JSON>): Immutable<JSON> {
	if (a === undefined) {
		return b
	}
	if (b === undefined) {
		return a
	}

	const ta = _getꓽjson__type(a)
	const tb = _getꓽjson__type(b)
	if (ta !== tb) {
		throw new Error(`Cannot merge different JSON types: ${ta} vs ${tb}!`)
	}
	switch (ta) {
		case 'primitive':
			if (a === b) return a
			throw new Error(`Cannot merge conflicting primitive JSON values: ${a} vs ${b}!`)
		case 'array':
			// TODO set for uniqueness!
			return [...(a as JSON[]), ...(b as JSON[])].sort()
		case 'object': {
			const result: Immutable<JSONObject> = {}
			const k1 = Object.keys(a as JSONObject)
			const k2 = Object.keys(b as JSONObject)
			const all_keys = Array.from(new Set([...k1, ...k2])).sort()
			for (const k of all_keys) {
				result[k] = mergeꓽjson((a as Immutable<JSONObject>)[k], (b as Immutable<JSONObject>)[k])
			}
			return result
		}
		default:
			throw new Error('Unexpected JSON type!')
	}
}

/////////////////////////////////////////////////

export { inferꓽformat_from_path, mergeꓽjson }
