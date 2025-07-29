
/////////////////////////////////////////////////
// https://www.npmjs.com/package/@types/semver?activeTab=code
// specifier / specification /  constraint / range / requirement

//type SemverMajor
type SemverExact = string // ex. 1.2.3
type SemverRange =
	| `^${SemverExact}`
	| `~${SemverExact}`
	| (SemverExact & {})

type CompatibilityDate = string // TODO

/////////////////////////////////////////////////

export const NODE_MAJOR_VERSION = 22


type JsRuntimeKey =
	| 'node' // https://nodejs.org/
	| 'deno' // https://deno.com/
	| 'browserⵧdocument'
	| 'browserⵧworker'
	| 'aws-lambda'
	| 'cloudflare-worker'
	// add more as needed
	| (string & {});


interface JsRuntimeSpec {
	type: JsRuntimeKey
	acceptable_versions: SemverRange
}

/////////////////////////////////////////////////

interface DevRuntimeSpec {
	runtime: RuntimeConfig
	version: SemverExact
}

interface MonorepoSpec {
	runtime_envⵧdev: { [key: string]: JsRuntimeSpec }

	EOL:
		| '\n'

	PATH_SEP:
		| '/'

}

/////////////////////////////////////////////////

const SPEC: Partial<MonorepoSpec> = {
	runtime_envⵧdev: {
		'node': '^24',
	},

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
