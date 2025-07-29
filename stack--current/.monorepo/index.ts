
/////////////////////////////////////////////////
// https://www.npmjs.com/package/@types/semver?activeTab=code
// specifier / specification /  constraint / range / requirement

type SemverMajor
type SemverExact = string // ex. 1.2.3
type SemverRange =
	| `^${SemverExact}`
	| `~${SemverExact}`
	| (SemverExact & {})

/////////////////////////////////////////////////

export const NODE_MAJOR_VERSION = 22

type RuntimeKey =
	| 'node' // https://nodejs.org/
	| 'deno' // https://deno.com/
	// add more as needed
	| (string & {});


interface RuntimeSpec {
	type: RuntimeKey
	acceptable_versions: SemverRange
}

/////////////////////////////////////////////////

interface DevRuntimeSpec {
	runtime: RuntimeConfig
	version: SemverExact
}

interface MonorepoSpec {
	runtimesⵧdev: { [key: string]: RuntimeSpec }

	EOL:
		| '\n'

	PATH_SEP:
		| '/'

}

/////////////////////////////////////////////////

const SPEC: Partial<MonorepoSpec> = {
	runtimesⵧdev: {
		'node':
	}
}
