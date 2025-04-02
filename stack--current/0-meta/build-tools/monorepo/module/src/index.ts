import { strict as assert } from 'node:assert'
import * as path from 'node:path'
import * as fs from 'node:fs'
import { lsDirsSync } from '@offirmo-private/fs--ls'
import { getꓽbolt_monorepo__workspaces } from '@offirmo-private/utils--bolt'

import { MONOREPO_ROOT } from './consts.ts'

/////////////////////////////////////////////////

type AbsPath = string

function getꓽdefault_namespace(module_details: {
	root‿abspath: AbsPath,
	isꓽpublished: boolean,
}) {
	if (module_details.root‿abspath.includes('the-boring-rpg'))
		return '@tbrpg'

	if (module_details.root‿abspath.includes('9-rpg'))
		return '@oh-my-rpg'

	return module_details.isꓽpublished
		? '@offirmo'
		: '@offirmo-private'
}

function getꓽall_known_pure_module__dirs‿abspath(): Array<AbsPath> {
	// we're currently using bolt
	// TODO one day out-of-source build from a flat list of pure modules
	const workspaces = getꓽbolt_monorepo__workspaces(MONOREPO_ROOT)

	return workspaces.reduce((acc, workspace) => {
			const subdirs = lsDirsSync(workspace.path‿abs, { full_path: true })
				.map(p => path.join(p, 'module'))
				.filter(p => fs.existsSync(p))
				.filter(p => !p.includes('~~'))

			return acc.concat(subdirs)
		}, [] as Array<AbsPath>)
		.sort()
}

/////////////////////////////////////////////////

export {
	getꓽdefault_namespace,
	getꓽall_known_pure_module__dirs‿abspath,
}
