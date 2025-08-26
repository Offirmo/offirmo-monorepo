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

export type AsyncCallbackReducer = <T>(
	state: Immutable<State>,
	result: T | null,
	error: null | Error,
) => Immutable<State>

export interface State {
	spec: InfiniteMonorepoSpec

	graph: {
		nodesⵧall: { [path: string]: Node & { status: 'new' | 'analyzed' } }
	}

	file_manifests: Record<MultiRepoRelativeFilePath, StructuredFsⳇFileManifest>

	// XXX
	files_existing: Record<
		AbsoluteFilePath,
		{
			manifest_key: MultiRepoRelativeFilePath
			abspath: AbsoluteFilePath

			data: unknown // TODO
		}
	>

	pending_async_ops: {
		[key: string]: Promise<Reducer>
	}

	//file_output: Array<StructuredFsOutput>
}
