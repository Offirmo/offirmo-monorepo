import path from 'node:path'

import fs from 'fs-extra'

// hat tip to https://stackoverflow.com/a/24594123/587407
export function lsDirsSync(srcpath, options = {}) {
	options = {
		full_path: true, // because it's what we usually want
		...options,
	}

	let result = fs
		.readdirSync(srcpath)
		.filter(file => fs.statSync(
			path.join(srcpath, file)
		).isDirectory())

	if (options.full_path)
		result = result.map(file => path.join(srcpath, file))

	return result.sort()
}

export function lsFilesSync(srcpath, options = {}) {
	options = {
		full_path: true, // because it's what we usually want
		...options,
	}

	let result = fs
		.readdirSync(srcpath)
		.filter(file => !fs.statSync(
			path.join(srcpath, file)
		).isDirectory())

	if (options.full_path)
		result = result.map(file => path.join(srcpath, file))

	return result.sort()
}
