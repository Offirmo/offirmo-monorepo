import type { Immutable } from '@offirmo-private/ts-types'
import type { AbsoluteFilePath } from '@offirmo-private/ts-types'
import type {
	InfiniteMonorepoSpec,
	Node,
	StructuredFsOutput,
	StructuredFsOutputⳇFileManifest,
	MultiRepoRelativeFilePath,
	StructuredFsⳇFileManifest,
} from '@infinite-monorepo/types'

/////////////////////////////////////////////////

export type Reducer = (
	state: Immutable<State>,
	result: unknown | null,
	error: Error | null,
) => Immutable<State>

export interface State {
	spec: InfiniteMonorepoSpec

	graph: {
		nodesⵧall: { [path: string]: Node & { isꓽanalyzed: boolean } }
	}

	file_manifests: Record<MultiRepoRelativeFilePath, StructuredFsⳇFileManifest>

	files_existing: Record<
		AbsoluteFilePath,
		{
			abspath: AbsoluteFilePath
			manifest: StructuredFsⳇFileManifest
		}
	>

	pending_async_ops: {
		[key: string]: Promise<Reducer>
	}

	//file_output: Array<StructuredFsOutput>
}
