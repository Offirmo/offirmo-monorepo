import type {
	SemVerⳇExact,
	SemVerⳇRange,
	PathSeparator,
	EndOfLine,
	AbsoluteDirPath,
	AbsoluteFilePath,
} from '@monorepo-private/ts--types'

import type { VersionSpecification } from './01-primitives.ts'
import type {
	LocalJsRuntimeKey,
	JsRuntimeSpec,
	PackageManagerKey,
	PackageManagerSpec,
} from './10-tools.ts'

/////////////////////////////////////////////////

export interface ToolSpec extends VersionSpecification {
	name: string
	executable?: string // to test for presence in the path
	requirement_level: 'required' | 'recommended' | 'optional'
}

/////////////////////////////////////////////////

export interface InfiniteMonorepoSpec {
	/////// RUNTIME ///////

	// the runtime used to do monorepo operations such as running tasks, building, etc.
	// (should we support multiple at once? Not for now, complex, need an actual use case)
	runtimeⵧlocal: LocalJsRuntimeKey | JsRuntimeSpec<LocalJsRuntimeKey>

	/////// GRAPH ///////
	root_path‿abs: AbsoluteDirPath
	workspaces: Array<string> // TODO refine

	/////// TOOLING ///////
	package_manager: PackageManagerKey | PackageManagerSpec
	//runtime_envⵧdev: { [key: string]: JsRuntimeSpec }

	/////// CODEGEN ///////
	namespace: `@${string}` // will be suffixed with -private
	EOL: EndOfLine // useful?
	PATH_SEP: PathSeparator // useful?

	/////// META ///////
	_config_fileⵧroot: AbsoluteFilePath | null | undefined
}
