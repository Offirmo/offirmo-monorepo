import type {
	PathSegment,
	AbsolutePath,
	RelativePath,
	AnyPath,
	Immutable, JSONObject, AbsoluteDirPath, AbsoluteFilePath,
} from '@offirmo-private/ts-types'

import type { InfiniteMonorepoSpec } from '@infinite-monorepo/types'

import { loadꓽconfigⵧclosest, loadꓽconfigⵧtopmost } from '@infinite-monorepo/load-config'

import { completeꓽspec } from '@infinite-monorepo/defaults'

/////////////////////////////////////////////////

async function loadꓽspecⵧraw(): Promise<Partial<InfiniteMonorepoSpec>> {
	const {
		data,
		parent_folder_path‿abs,
		exact_file_path‿abs,
		boundary,
	} = await loadꓽconfigⵧtopmost('.monorepo', { boundary: 'git' })
	return {
		...data,
		root_path‿abs: parent_folder_path‿abs,
		_config_fileⵧroot: exact_file_path‿abs,
	}
}

async function loadꓽspec(): Promise<Immutable<InfiniteMonorepoSpec>> {
	const raw = await loadꓽspecⵧraw()
	return completeꓽspec(raw)
}

/////////////////////////////////////////////////

export { loadꓽspec }
