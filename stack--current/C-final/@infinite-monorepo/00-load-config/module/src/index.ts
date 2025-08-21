import * as process from 'node:process'
import * as path from 'node:path'

import type { JSONObject, AbsoluteDirPath, AbsoluteFilePath } from '@offirmo-private/ts-types'
import { lsDirsSync } from '@offirmo-private/fs--ls'

/////////////////////////////////////////////////

interface Options {
	defaults?: JSONObject
}

async function loadꓽconfig(
	radix: string,
	options: Options = {},
): Promise<[JSONObject, AbsoluteDirPath, AbsoluteFilePath | null]> {
	const cwd = process.cwd()
	const segments = cwd.split(path.sep)

	while (segments.length > 0) {
		const current_path‿abs = segments.join(path.sep)
		const dirs = lsDirsSync(current_path‿abs, {
			full_path: false,
		})
		if (dirs.includes(radix)) {
			const candidate_file_path‿abs = path.join(current_path‿abs, radix, 'index.ts')
			const imported = await import(candidate_file_path‿abs)
			return [imported.default, current_path‿abs + path.sep, candidate_file_path‿abs]
		}

		if (dirs.includes('.git')) {
			// we're at the usual boundary
			if (options.defaults) {
				return [options.defaults, current_path‿abs + path.sep, null]
			}
			break
		}

		segments.pop()
	}

	throw new Error(`No "${radix}/index.ts" found within the closest git repo!`)
}

/////////////////////////////////////////////////

export { loadꓽconfig }
