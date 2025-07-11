import * as path from 'node:path'
import * as fs from 'node:fs'
import * as fsp from 'node:fs/promises'


export function outputFileSync() {
	throw new Error(`Not implemented!`)
}

export function ೱoutputꓽfile(...args: Parameters<typeof fsp.writeFile>): ReturnType<typeof fsp.writeFile> {

	return Promise.try(function ensure_parent_dir() {
		const file = args[0]

		if (typeof file === 'string')
			return fsp.mkdir(path.dirname(file), { recursive: true })

		return undefined
		})
		.then(() => {
			return fsp.writeFile(...args)
		})
}
