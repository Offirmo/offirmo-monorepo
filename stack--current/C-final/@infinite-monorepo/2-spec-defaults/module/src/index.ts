import type { Immutable } from '@offirmo-private/ts-types'

import type { MonorepoSpec } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

const MONOREPO_SPEC_DEFAULT: Immutable<MonorepoSpec> = {
	runtimeⵧlocal: 'node',
	namespace: `@acme`,
	workspaces: [],
	package_manager: 'yarn--berry',
	EOL: '\n',
	PATH_SEP: '/'
}

function completeꓽspec(spec: Immutable<Partial<MonorepoSpec>>): Immutable<MonorepoSpec> {
	return {
		...MONOREPO_SPEC_DEFAULT,
		...spec,
	}
}

/////////////////////////////////////////////////

export {
	MONOREPO_SPEC_DEFAULT,
	completeꓽspec,
}
