export * from 'node:fs'
export * from './ls/index.mjs'
export * as json from './json/index.mjs'

// strange but the `export *` doesn't re-export everything???
//export * from 'fs-extra'
import fse from 'fs-extra'
const {
	//Async
	copy,
	emptyDir,
	ensureFile,
	ensureDir,
	ensureLink,
	ensureSymlink,
	mkdirp,
	mkdirs,
	move,
	outputFile,
	outputJson,
	pathExists,
	readJson,
	remove,
	writeJson,
	//Sync
	copySync,
	emptyDirSync,
	ensureFileSync,
	ensureDirSync,
	ensureLinkSync,
	ensureSymlinkSync,
	mkdirpSync,
	mkdirsSync,
	moveSync,
	outputFileSync,
	outputJsonSync,
	pathExistsSync,
	readJsonSync,
	removeSync,
	writeJsonSync,
} = fse
export {
	//Async
	copy,
	emptyDir,
	ensureFile,
	ensureDir,
	ensureLink,
	ensureSymlink,
	mkdirp,
	mkdirs,
	move,
	outputFile,
	outputJson,
	pathExists,
	readJson,
	remove,
	writeJson,
	//Sync
	copySync,
	emptyDirSync,
	ensureFileSync,
	ensureDirSync,
	ensureLinkSync,
	ensureSymlinkSync,
	mkdirpSync,
	mkdirsSync,
	moveSync,
	outputFileSync,
	outputJsonSync,
	pathExistsSync,
	readJsonSync,
	removeSync,
	writeJsonSync,
}

// export DEBUG
//import fs from 'fs'
//import * as json from './json/index.mjs'
//import * as ls from './ls/index.mjs'
//console.log('XXXXXXXX fs\n', Object.keys(fs).sort().filter(k => k[0].toLowerCase() === k[0]).join('\n'))
//console.log('XXXXXXXX fse\n', Object.keys(fse).sort().filter(k => k[0].toLowerCase() === k[0]).join('\n'))
