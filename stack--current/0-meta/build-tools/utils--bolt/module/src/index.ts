import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs'

/////////////////////////////////////////////////

type RelPath = string
type AbsPath = string

/////////////////////////////////////////////////

interface Workspace {
	name: string
	path‿abs: AbsPath
}

function getꓽbolt_monorepo__workspaces(MONOREPO_ROOT: AbsPath): Array<Workspace> {
	const MONOREPO_ROOT_PKGᐧJSON = getꓽbolt_monorepo__root_packageᐧjson(MONOREPO_ROOT)

	assert(Object.hasOwn(MONOREPO_ROOT_PKGᐧJSON, 'bolt'), `The bolt monorepo's root package.json should contain the "bolt" key!`)
	assert(Object.hasOwn(MONOREPO_ROOT_PKGᐧJSON.bolt, 'workspaces'), `The bolt monorepo's root package.json should contain the "bolt.workspaces" key!`)

	const MONOREPO_WORKSPACES_RELPATHS = MONOREPO_ROOT_PKGᐧJSON.bolt.workspaces
		.map(p => p.slice(0, -2)) // slice to remove trailing "/*"

	return MONOREPO_WORKSPACES_RELPATHS
		.sort()
		.filter((p: RelPath) => {
			return !p.startsWith('#') // we allow "commenting" a workspace to help "progressive resurrection"
		})
		.map((p: RelPath): Workspace => {
			return {
				name: p,
				path‿abs: path.join(MONOREPO_ROOT, p),
			}
		})
}

/////////////////////////////////////////////////

/*
interface Module {
	name: string
	path‿abs: AbsPath
}

function getꓽbolt_monorepo__modules(): Array<Module> {
	const monorepo__workspaces = getꓽbolt_monorepo__workspaces()

	const MODULES_ABSPATHS = monorepo__workspaces.reduce((acc, val) => {
		const module_dirs = lsDirsSync(val.path‿abs)
		acc.push(...module_dirs)
		return acc
	}, []).sort()
}*/

/////////////////////////////////////////////////

function getꓽbolt_monorepo__root_packageᐧjson(MONOREPO_ROOT: AbsPath): any  {
	return JSON.parse(fs.readFileSync(path.join(MONOREPO_ROOT, 'package.json'), { encoding: 'utf-8' }))
}

/////////////////////////////////////////////////

export {
	getꓽbolt_monorepo__workspaces,
}
