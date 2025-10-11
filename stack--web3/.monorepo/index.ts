import type { MonorepoSpec } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

const SPEC: Partial<MonorepoSpec> = {
	namespace: '@offirmo',
	package_manager: 'pnpm', // 2025/10 we need some unique security features

	workspaces: [
		// TODO autogen
	],
}

/////////////////////////////////////////////////

export default SPEC
