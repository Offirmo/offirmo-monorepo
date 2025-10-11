import type { AnyPath, Immutable } from '@offirmo-private/ts-types'

import type { InfiniteMonorepoSpec } from '@infinite-monorepo/types'

import {
	loadꓽconfigⵧchain,
	loadꓽconfigⵧclosest,
	loadꓽconfigⵧtopmost,
} from '@infinite-monorepo/load-config'

import { completeꓽspec } from '@infinite-monorepo/defaults'

/////////////////////////////////////////////////

// useful to build the graph
async function loadꓽspecⵧchainⵧraw(from?: AnyPath): ReturnType<typeof loadꓽconfigⵧchain> {
	return await loadꓽconfigⵧchain('.monorepo', { ...(from && { from }) })
}

/*
async function loadꓽspecⵧraw(): Promise<Partial<InfiniteMonorepoSpec>> {
	const { data, parent_folder_path‿abs, exact_file_path‿abs, boundary } =
		await loadꓽconfigⵧtopmost('.monorepo', { boundary: 'git' })
	return {
		...data,
		root_path‿abs: parent_folder_path‿abs,
		//_config_fileⵧroot: exact_file_path‿abs,
	}
}

async function loadꓽspec(): Promise<Immutable<InfiniteMonorepoSpec>> {
	const raw = await loadꓽspecⵧraw()
	return completeꓽspec(raw)
}*/

/////////////////////////////////////////////////

export { loadꓽspecⵧchainⵧraw }
