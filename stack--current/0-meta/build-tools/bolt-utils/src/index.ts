import assert from 'tiny-invariant'
import path from 'node:path'
import fs from 'node:fs'

import { MONOREPO_ROOT, MONOREPO_PKG_JSON_PATH } from './consts.ts'

/////////////////////////////////////////////////

type RelPath = string
type AbsPath = string

interface Workspace {
	name: string
	path‿abs: AbsPath
}

interface Module {
	name: string
	path‿abs: AbsPath
}

function getꓽbolt_monorepo__root_packageᐧjson(): object  {
	return JSON.parse(fs.readFileSync(MONOREPO_PKG_JSON_PATH, { encoding: 'utf-8' }))
}

function getꓽbolt_monorepo__workspaces(): Array<Workspace> {
	const MONOREPO_ROOT_PKGᐧJSON = getꓽbolt_monorepo__root_packageᐧjson()

	assert(Object.hasOwn(MONOREPO_ROOT_PKGᐧJSON, 'bolt'), `No bolt key in the root package.json!`)
	assert(Object.hasOwn(MONOREPO_ROOT_PKGᐧJSON.bolt, 'workspaces'), `No bolt workspaces in the root package.json!`)

	const MONOREPO_WORKSPACES_RELPATHS = MONOREPO_ROOT_PKGᐧJSON.bolt.workspaces
		.map(p => p.slice(0, -2)) // slice to remove trailing "/*"

	return MONOREPO_WORKSPACES_RELPATHS
		.sort()
		.map((p: RelPath): Workspace => ({
			name: p,
			path‿abs: path.join(MONOREPO_ROOT, p),
		})
}

function getꓽbolt_monorepo__modules(): Array<Module> {
	const monorepo__workspaces = getꓽbolt_monorepo__workspaces()

	const MODULES_ABSPATHS = monorepo__workspaces.reduce((acc, val) => {
		const module_dirs = lsDirsSync(val.path‿abs)
		acc.push(...module_dirs)
		return acc
	}, []).sort()
}

/////////////////////////////////////////////////

export {
	getꓽbolt_monorepo__modules,
}
