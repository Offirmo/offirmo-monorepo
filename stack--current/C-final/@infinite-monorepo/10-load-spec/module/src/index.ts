import type {
	PathSegment,
	AbsolutePath,
	RelativePath,
	AnyPath,
	Immutable,
} from '@offirmo-private/ts-types'

import type { InfiniteMonorepoSpec } from '@infinite-monorepo/types'

import { loadꓽconfig } from '@infinite-monorepo/load-config'

import { completeꓽspec } from '@infinite-monorepo/defaults'

/////////////////////////////////////////////////

async function loadꓽspecⵧraw(): Promise<Partial<InfiniteMonorepoSpec>> {
	const [spec, root_dir, spec_file] = await loadꓽconfig('.monorepo')
	return {
		...spec,
		root_path‿abs: root_dir,
		_config_fileⵧroot: spec_file,
	}
}

async function loadꓽspec(): Promise<Immutable<InfiniteMonorepoSpec>> {
	const raw = await loadꓽspecⵧraw()
	return completeꓽspec(raw)
}

/////////////////////////////////////////////////

export { loadꓽspec }
