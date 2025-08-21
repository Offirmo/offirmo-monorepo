import type { Immutable } from '@offirmo-private/ts-types'

import type { InfiniteMonorepoSpec } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

const MONOREPO_SPEC_DEFAULT: Immutable<InfiniteMonorepoSpec> = {
	runtimeⵧlocal: 'node',
	namespace: `@monorepo`,
	workspaces: [],
	package_manager: 'yarn--berry',
	EOL: '\n',
	PATH_SEP: '/',
	root_path: 'NOT_YET_LOADED/',
	_config_fileⵧroot: undefined,
}

function completeꓽspec(
	spec: Immutable<Partial<InfiniteMonorepoSpec>>,
): Immutable<InfiniteMonorepoSpec> {
	return {
		...MONOREPO_SPEC_DEFAULT,
		...spec,
	}
}

/////////////////////////////////////////////////

export { MONOREPO_SPEC_DEFAULT, completeꓽspec }
