import process from 'node:process'
import path from 'node:path'

import type { JSONObject } from '@offirmo-private/ts-types'
import { lsDirsSync } from '@offirmo-private/fs--ls'

/////////////////////////////////////////////////

interface Options {}

async function loadꓽconfig(radix: string, options: Options = {}): Promise<JSONObject> {
	const cwd = process.cwd()
	const segments = cwd.split(path.sep)

	while (segments.length > 0) {
		const current_path = segments.join(path.sep)
		const dirs = lsDirsSync(current_path, {
			full_path: false,
		})
		if (dirs.includes(radix)) {
			const target = path.join(current_path, radix, 'index.ts')
			const imported = await import(target)
			console.log(`${target} =`, imported)
			return imported.default
		}

		if (dirs.includes('.git')) {
			// we're at the usual boundary
			break
		}

		segments.pop()
	}

	throw new Error(`No "${radix}/index.ts" found within the closest git repo!`)
}

/////////////////////////////////////////////////

export {
	loadꓽconfig,
}
