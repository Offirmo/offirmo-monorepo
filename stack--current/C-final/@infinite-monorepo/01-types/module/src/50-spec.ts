import type { SemVerⳇExact, SemVerⳇRange, PathSeparator, EndOfLine } from '@offirmo-private/ts-types'

import type { VersionSpecification } from './01-primitives.ts'
import type { LocalJsRuntimeKey, JsRuntimeSpec, PackageManagerKey, PackageManagerSpec } from './10-tools.ts'

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
