// TODO 1D follow extends?

import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import type { JSONObject, AnyFilePath, Immutable } from '@offirmo-private/ts-types'

import type {
	ContentⳇJson5,
	ContentⳇList,
	ContentⳇSingleValue,
	ContentⳇYaml,
	StructuredFileFormat,
} from '../types.ts'
import { inferꓽformat_from_path } from '../common/index.ts'

/////////////////////////////////////////////////
/*
async function ೱwriteꓽfile(
	file_path: AnyFilePath,
	format: 'json5',
	content: Immutable<ContentⳇJson5>,
): Promise<void>
async function ೱwriteꓽfile(
	file_path: AnyFilePath,
	format: 'yaml',
	content: Immutable<ContentⳇYaml>,
): Promise<void>
async function ೱwriteꓽfile(
	file_path: AnyFilePath,
	format: 'list',
	content: Immutable<ContentⳇList>,
): Promise<void>
async function ೱwriteꓽfile(
	file_path: AnyFilePath,
	format: 'single-value',
	content: Immutable<ContentⳇSingleValue>,
): Promise<void>*/
async function ೱwriteꓽfile(
	file_path: AnyFilePath,
	content: Immutable<JSONObject>,
	format?: StructuredFileFormat | undefined, // SSOT will be inferred from extension if absent
): Promise<void> {
	format ||=
		inferꓽformat_from_path(file_path)
		|| (() => {
			// infer from content
		})()

	switch (format) {
		case 'json5':
			return await ೱwriteꓽfileⵧjson5(file_path, content)
		case 'yaml':
			return await ೱwriteꓽfileⵧyaml(file_path, content)
		case 'list':
			return await ೱwriteꓽfileⵧlist(file_path, content as any)
		case 'single-value':
			return await ೱwriteꓽfileⵧsingle_value(file_path, content as any)
		default:
			throw new Error(`Writing to format ${format} not implemented!`)
	}
}

/////////////////////////////////////////////////

async function ೱwriteꓽfileⵧjson5(
	file_path: AnyFilePath,
	content: Immutable<ContentⳇJson5>,
): Promise<void> {
	const pkgꓽjson5 = await import('json5').then(x => (x as any).default as typeof import('json5'))
	let content_serialized = pkgꓽjson5.stringify(content)
	await fs.writeFile(path.resolve(process.cwd(), file_path), content_serialized, {
		encoding: 'utf8',
	})
}

async function ೱwriteꓽfileⵧyaml(
	file_path: AnyFilePath,
	content: Immutable<ContentⳇYaml>,
): Promise<void> {
	const pkgꓽyaml = await import('yaml').then(x => (x as any).default as typeof import('yaml'))
	let content_serialized = pkgꓽyaml.stringify(content)
	await fs.writeFile(path.resolve(process.cwd(), file_path), content_serialized, {
		encoding: 'utf8',
	})
}

async function ೱwriteꓽfileⵧlist(
	file_path: AnyFilePath,
	content: Immutable<ContentⳇList>,
): Promise<void> {
	let content_serialized = content.entries.join('\n') + '\n'
	await fs.writeFile(path.resolve(process.cwd(), file_path), content_serialized, {
		encoding: 'utf8',
	})
}

async function ೱwriteꓽfileⵧsingle_value(
	file_path: AnyFilePath,
	content: Immutable<ContentⳇSingleValue>,
): Promise<void> {
	let content_serialized = `${content.value}\n`
	await fs.writeFile(path.resolve(process.cwd(), file_path), content_serialized, {
		encoding: 'utf8',
	})
}

/////////////////////////////////////////////////

export {
	type StructuredFileFormat,
	ೱwriteꓽfile,
	ೱwriteꓽfileⵧjson5,
	ೱwriteꓽfileⵧlist,
	ೱwriteꓽfileⵧsingle_value,
}
