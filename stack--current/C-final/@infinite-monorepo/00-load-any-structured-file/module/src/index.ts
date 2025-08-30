// TODO 1D follow extends?

import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import strip_bom from 'strip-bom'
import split_lines from 'split-lines'

import type { JSONObject, AnyFilePath } from '@offirmo-private/ts-types'
import { lsDirsSync, lsFilesSync } from '@offirmo-private/fs--ls'

/////////////////////////////////////////////////

type Parser =
	| 'import' // js/ts exporting a default JSONObject
	| 'json5' // https://json5.org/
	| 'yaml'
	//| 'kv-simple' // multiple lines `k v` ex. .yarnrc
	| 'lines' // multiple lines  ex. .gitignore WILL STRIP COMMENTS
	| 'single-value' // single line, ex .nvmrc
	| 'raw' // fallback
// TODO 1D markdown?

/////////////////////////////////////////////////

async function ↆloadꓽfile(file_path: AnyFilePath, hints?: { parser: Parser }): Promise<JSONObject> {
	const basename = path.basename(file_path)
	const basename‿lc = basename.toLowerCase()
	const ᐧext‿lc = path.extname(basename‿lc)

	// extension is the strongest hint
	switch (ᐧext‿lc) {
		case '.json':
		case '.jsonc':
		case '.json5':
			return await ↆloadꓽfileⵧjson5(file_path)
		case '.js':
		case '.cjs':
		case '.mjs':
		case '.ts':
		case '.mts':
			return await ↆloadꓽfileⵧimport(file_path)
		case '.yml':
		case '.yaml':
			return await ↆloadꓽfileⵧyaml(file_path)
		default:
			break
	}

	// then exact file match
	switch (basename‿lc) {
		case '.nvmrc':
			return await ↆloadꓽfileⵧsingle_value(file_path)
		default:
			break
	}

	// at this point, we're guessing
	switch (hints?.parser) {
		case 'import':
			return await ↆloadꓽfileⵧimport(file_path)
		case 'json5':
			return await ↆloadꓽfileⵧjson5(file_path)
		case 'yaml':
			return await ↆloadꓽfileⵧyaml(file_path)
		//case 'kv-simple':
		case 'lines':
			return await ↆloadꓽfileⵧlines(file_path)
		case 'single-value':
			return await ↆloadꓽfileⵧsingle_value(file_path)
		case 'raw':
			break
		case undefined:
			break
		default:
			throw new Error(`Parser hint: ${hints?.parser} not implemented!`)
	}

	switch (true) {
		case basename‿lc.endsWith('ignore'):
			// .gitignore .prettierignore etc.
			return await ↆloadꓽfileⵧlines(file_path)
		default:
			break
	}

	// load the content and try to recognize it
	const content = (
		await fs
			.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
			.then(strip_bom)
	).trim()

	if (hints?.parser === 'raw') {
		return { raw: content }
	}

	switch (true) {
		case content.startsWith('{'):
			return await ↆloadꓽfileⵧjson5(file_path, content)
		case content.startsWith('%'):
			return await ↆloadꓽfileⵧyaml(file_path, content)
		default:
			break
	}

	throw new Error(
		`File format not recognized! Please extend this lib or provide a hint! [${basename}]`,
	)
}

/////////////////////////////////////////////////

async function ↆloadꓽfileⵧjson5(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<JSONObject> {
	const ↆJSON5 = import('json5').then(x => x.default as typeof import('json5'))
	const ↆcontent‿raw =
		content_hint ?
			Promise.resolve(content_hint)
		:	fs.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
	const [JSON5, content] = await Promise.all([ↆJSON5, ↆcontent‿raw.then(strip_bom)])
	return JSON5.parse(content) as JSONObject
}

async function ↆloadꓽfileⵧyaml(file_path: AnyFilePath, content_hint?: string): Promise<JSONObject> {
	const ↆyaml = import('yaml').then(x => x.default as typeof import('yaml'))
	const ↆcontent‿raw =
		content_hint ?
			Promise.resolve(content_hint)
		:	fs.readFile(path.resolve(process.cwd(), file_path), { encoding: 'utf8' })
	const [yaml, content] = await Promise.all([ↆyaml, ↆcontent‿raw.then(strip_bom)])
	return yaml.parse(content) as JSONObject
}

async function ↆloadꓽfileⵧlines(
	file_path: AnyFilePath,
	content_hint?: string,
): Promise<{ entries: string[] }> {
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
): Promise<{ value: string }> {
	let lines = (await ↆloadꓽfileⵧlines(file_path, content_hint)).entries
	assert(lines.length > 0, `Single-value file is empty!`)
	assert(lines.length === 1, `Single-value file has multiple lines!`)

	return {
		value: lines[0]!,
	}
}

async function ↆloadꓽfileⵧimport(file_path: AnyFilePath): Promise<{ value: string }> {
	const ೱdata = import(path.resolve(process.cwd(), file_path)).then(x => x.default as any)
	return await ೱdata
}

/////////////////////////////////////////////////

export {
	type Parser,
	ↆloadꓽfile,
	ↆloadꓽfileⵧjson5,
	ↆloadꓽfileⵧlines,
	ↆloadꓽfileⵧsingle_value,
	ↆloadꓽfileⵧimport,
}
