import type { SemVerⳇExact, SemVerⳇRange, PathSeparator, EndOfLine } from '@offirmo-private/ts-types'
import { getꓽdefault_namespace } from '@offirmo-private/monorepo--decisions'

/////////////////////////////////////////////////

export interface VersionSpecification {
	versionsⵧacceptable:
		| SemVerⳇRange
		//| 'auto' // pick the most sensible
		//| 'latest'
		//| 'LTS' // TODO review
		//| 'current'
		// default (built-in) aliases: node, stable, unstable, iojs, system

	// recommended, ex.
	// - bc. pre-installed in CI
	versionⵧrecommended?: SemVerⳇExact
}

/////////////////////////////////////////////////

export type JsRuntimeKey =
	| 'minimum-common-api' // https://github.com/WinterTC55/proposal-minimum-common-api https://blog.cloudflare.com/introducing-the-wintercg/
	| 'node' // https://nodejs.org/
	| 'deno' // https://deno.com/
	| 'bun'  // https://bun.com/
	| 'browserⵧdocument'
	| 'browserⵧworker'
	| 'aws-lambda'
	| 'cloudflare-worker'
	// …contributions welcome!
	| (string & {});

export type LocalJsRuntimeKey = Extract<
	JsRuntimeKey,
		| 'node'
		| 'deno'
		| 'bun'
	>

export interface JsRuntimeSpec<_JsRuntimeKey = JsRuntimeKey> extends VersionSpecification {
	name: _JsRuntimeKey
}

/////////////////////////////////////////////////

export type PackageManagerKey =
	| 'bolt'
	| 'npm'
	| 'pnpm'
	| 'yarn--v1'
	| 'yarn--berry'
	| 'deno'
	| 'bun' // https://bun.com/docs/install/workspaces
	| (string & {});

export interface PackageManagerSpec extends VersionSpecification {
	name: PackageManagerKey
}

/////////////////////////////////////////////////

export interface ToolSpec extends VersionSpecification {
	name: string
	executable?: string // to test for presence in the path
	requirement_level:
		| 'required'
		| 'recommended'
		| 'optional'
}

/////////////////////////////////////////////////

export interface MonorepoSpec {

	/////// RUNTIME ///////

	// the runtime used to do monorepo operations such as running tasks, building, etc.
	// (should we support multiple at once? Not for now, complex, need actual use case)
	runtimeⵧlocal: LocalJsRuntimeKey | JsRuntimeSpec<LocalJsRuntimeKey>

	/////// WORKSPACES ///////
	namespace: `@${string}` // will be suffixed with -private
	workspaces: Array<string> // TODO refine

	/////// TOOLING ///////
	package_manager: PackageManagerKey | PackageManagerSpec
	//runtime_envⵧdev: { [key: string]: JsRuntimeSpec }

	/////// CODEGEN ///////
	EOL: EndOfLine // useful?
	PATH_SEP: PathSeparator // useful?
}
