import type { MonorepoSpec } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

// TODO remove
export const NODE_MAJOR_VERSION = 22

/////////////////////////////////////////////////

const SPEC: Partial<MonorepoSpec> = {
	//runtimeⵧlocal: 'node',

	namespace: '@offirmo',

	package_manager: 'bolt',
	workspaces: [
		"0-meta/build-tools/*",

		"1-isomorphic/1-libs--simple/*",
		"1-isomorphic/2-libs--cross-cutting/*",
		"1-isomorphic/3-libs--advanced/*",
		"1-isomorphic/X-incubator/active/*",

		"2-engine--winter/*",

		"3-engine--node/0-dev-tools/*",
		"3-engine--node/1-libs--simple/*",
		"3-engine--node/2-libs--cross-cutting/*",
		"xx3-engine--node/X-incubator/active/*    <-- nothing",

		"4-engine--browser/0-dev-tools/*",
		"4-engine--browser/1-libs--simple/*",
		"4-engine--browser/2-libs--cross-cutting/*",
		"4-engine--browser/X-incubator/active/*",

		"7-multimorphic/libs--rpg/*",

		"B-backend/*",

		"C-final/api--placeholders/*",
		"C-final/single-pkg/*",
		"C-final/tbrpg/1-logic/*"
	],

}

export default SPEC
