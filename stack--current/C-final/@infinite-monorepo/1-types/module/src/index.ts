import type { SemVerⳇExact, SemVerⳇRange, PathSeparator, EndOfLine } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export interface VersionRequirement {
	versionsⵧacceptable:
		| SemVerⳇRange
		//| 'LTS' // TODO review
		//| 'current'

	// recommended, ex.
	// - bc. pre-installed in CI
	versionⵧrecommended?: SemVerⳇExact
}

/////////////////////////////////////////////////

export type JsRuntimeKey =
	| 'minimum-common-api' // https://github.com/WinterTC55/proposal-minimum-common-api https://blog.cloudflare.com/introducing-the-wintercg/
	| 'node' // https://nodejs.org/
	| 'deno' // https://deno.com/
	| 'browserⵧdocument'
	| 'browserⵧworker'
	| 'aws-lambda'
	| 'cloudflare-worker'
	// add more as needed
	| (string & {});


export interface JsRuntimeRequirement extends VersionRequirement {
	type: JsRuntimeKey
}

/////////////////////////////////////////////////

export type PackageManager =
	| 'bolt'
	| 'npm'
	| 'pnpm'
	| 'yarn--v1'
	| 'yarn--berry'
	| (string & {});

export interface PackageManagerRequirement extends VersionRequirement {
	name: PackageManager
}

/////////////////////////////////////////////////

export interface ToolRequirement extends VersionRequirement {
	name: string
	executable?: string // to test for presence in the path
	requirement_level:
		| 'required'
		| 'recommended'
		| 'optional'
}

/////////////////////////////////////////////////

export interface MonorepoSpec {
	////////////




	////////////
	package_manager: PackageManager | PackageManagerRequirement

	workspaces: Array<string> // TODO refine

	//runtime_envⵧdev: { [key: string]: JsRuntimeSpec }

	EOL: EndOfLine // useful?

	PATH_SEP: PathSeparator // useful?
}
