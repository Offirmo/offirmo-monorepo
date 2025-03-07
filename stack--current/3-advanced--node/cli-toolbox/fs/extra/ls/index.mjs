import path from 'node:path'

import fs from 'fs-extra'

// hat tip to https://stackoverflow.com/a/24594123/587407
export function lsDirsSync(srcpath, options = {}) {
	options = {
		full_path: true, // because it's what we usually want
		...options,
	}

	let result = fs
		.readdirSync(srcpath, { withFileTypes: true })
		.map(dirent => {
			if (!dirent.parentPath) {
				throw new Error('Missing dirent.parentPath! Are you properly using node >= 20?')
			}
			/*console.log('from dirent:', {
				path: dirent.parentPath,
				name: dirent.name,
				type: dirent.isSymbolicLink()
					? 'symlink'
					: dirent.isDirectory()
						? 'dir'
						: dirent.isFile()
							? 'file'
							: '???'
			})*/
			return dirent
		})
		.filter(dirent => dirent.isDirectory())
		.map(dirent => options.full_path
			? path.join(dirent.parentPath, dirent.name)
			: dirent.name)

	return result.sort()
}

export function lsFilesSync(srcpath, options = {}) {
	options = {
		full_path: true, // because it's what we usually want
		...options,
	}

	let result = fs
		.readdirSync(srcpath, { withFileTypes: true })
		.map(dirent => {
			if (!dirent.parentPath) {
				throw new Error('Missing dirent.parentPath! Are you properly using node >= 20?')
			}
			/*console.log('from dirent:', {
				path: dirent.parentPath,
				name: dirent.name,
				type: dirent.isSymbolicLink()
					? 'symlink'
					: dirent.isDirectory()
						? 'dir'
						: dirent.isFile()
							? 'file'
							: '???'
			})*/
			return dirent
		})
		.filter(dirent => dirent.isFile())
		.map(dirent => options.full_path
			? path.join(dirent.parentPath, dirent.name)
			: dirent.name)

	return result.sort()
}

export function lsFilesRecursiveSync(srcpath) {
	const options = {
		full_path: true, // because it's what we usually want
	}

	let result = lsFilesSync(srcpath, options)
	let dirs = lsDirsSync(srcpath, options)
	dirs.forEach(full_dir => {
		result = [
			...result,
			...lsFilesRecursiveSync(full_dir)
		]
	})

	return result.sort()
}



///////////
export function lsDirsSyncLEGACY(srcpath, options = {}) {
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
export function lsFilesSyncLEGACY(srcpath, options = {}) {
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
