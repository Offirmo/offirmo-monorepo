// TODO 1D follow extends?

import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import strip_bom from 'strip-bom'
import split_lines from 'split-lines'

import type { JSONObject, AnyFilePath } from '@offirmo-private/ts-types'

import type {
	ContentⳇJson5,
	ContentⳇList,
	ContentⳇSingleValue,
	ContentⳇTsImport,
	ContentⳇYaml,
	StructuredFileFormatⳇParser,
	StructuredFileFormat,
} from '../types.ts'
import { inferꓽformat_from_path } from '../common/index.ts'

/////////////////////////////////////////////////

async function ↆloadꓽfile(
	file_path: AnyFilePath,
	hints?: { format?: StructuredFileFormat },
): Promise<JSONObject> {
	let content: string | undefined = undefined

	const format: StructuredFileFormat | undefined = await (hints?.format
		|| inferꓽformat_from_path(file_path)
		|| (async () => {
			// load the content and try to recognize it
			content = (
				await fs
					.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
					.then(strip_bom)
			).trim()
			switch (true) {
				case content.startsWith('{'):
					return 'json5'
				case content.startsWith('%'):
					return 'yaml'
				default:
					break
			}

			return undefined
		})())

	switch (format) {
		case 'import':
			return await ↆloadꓽfileⵧimport(file_path)
		case 'json5':
		case 'jsonc':
		case 'json':
			return await ↆloadꓽfileⵧjson5(file_path, content)
		case 'yaml':
			return await ↆloadꓽfileⵧyaml(file_path, content)
		case 'list':
			return await ↆloadꓽfileⵧlist(file_path, content)
		case 'single-value':
			return await ↆloadꓽfileⵧsingle_value(file_path, content)
		case undefined:
			throw new Error(
				`File format not recognized! Please extend this lib or provide a hint! [${file_path}]`,
			)
		default:
			throw new Error(`Parser hint: ${hints?.format} not implemented!`)
	}
}

/////////////////////////////////////////////////

async function ↆloadꓽfileⵧimport(file_path: AnyFilePath): Promise<ContentⳇTsImport> {
	const ೱdata = import(path.resolve(process.cwd(), file_path)).then(x => x.default as any)
	return await ೱdata
}

async function ↆloadꓽfileⵧjson5(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<ContentⳇJson5> {
	const ↆpkgꓽjson5 = import('json5').then(x => (x as any).default as typeof import('json5'))
	const ↆcontent‿raw =
		content_hint ?
			Promise.resolve(content_hint)
		:	fs.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
	const [JSON5, content] = await Promise.all([ↆpkgꓽjson5, ↆcontent‿raw.then(strip_bom)])
	return JSON5.parse(content) as JSONObject
}

async function ↆloadꓽfileⵧyaml(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<ContentⳇYaml> {
	const ↆpkgꓽyaml = import('yaml').then(x => (x as any).default as typeof import('yaml'))
	const ↆcontent‿raw =
		content_hint ?
			Promise.resolve(content_hint)
		:	fs.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
	const [yaml, content] = await Promise.all([ↆpkgꓽyaml, ↆcontent‿raw.then(strip_bom)])
	return yaml.parse(content) as JSONObject
}

async function ↆloadꓽfileⵧlist(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<ContentⳇList> {
	const ↆcontent‿raw =
		content_hint ?
			Promise.resolve(content_hint)
		:	fs.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
	const content = await ↆcontent‿raw.then(strip_bom)
	const lines = split_lines(content)
		.map(l => l.trim())
		.filter(l => !l.startsWith('//') && !l.startsWith('#')) // TODO 1D keep comments
	return {
		entries: lines.map(l => l.trim()).filter(l => !!l),
	}
}

async function ↆloadꓽfileⵧsingle_value(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<ContentⳇSingleValue> {
	let lines = (await ↆloadꓽfileⵧlist(file_path, content_hint)).entries
	assert(lines.length > 0, `Single-value file is empty!`)
	assert(lines.length === 1, `Single-value file has multiple lines!`)

	return {
		value: lines[0]!,
	}
}

/////////////////////////////////////////////////

export {
	type StructuredFileFormatⳇParser,
	ↆloadꓽfile,
	ↆloadꓽfileⵧjson5,
	ↆloadꓽfileⵧlist,
	ↆloadꓽfileⵧsingle_value,
	ↆloadꓽfileⵧimport,
}
