import type { Immutable, JSONObject } from '@offirmo-private/ts-types'
import type { AbsoluteFilePath } from '@offirmo-private/ts-types'
import type {
	InfiniteMonorepoSpec,
	Node,
	StructuredFsOutput,
	StructuredFsOutputⳇFileManifest,
	MultiRepoRelativeFilePath,
	StructuredFsⳇFileManifest, NodeRelativePath,
} from '@infinite-monorepo/types'

/////////////////////////////////////////////////

export type FileOutputIntent =
	| 'present--exact'
	| 'present--containing'
	| 'not-present'

interface BaseFileOutput {
	path: MultiRepoRelativeFilePath
	node?: Node // if needed to resolve the path
	intent: FileOutputIntent
}

export interface FileOutputAbsent extends BaseFileOutput {

}
export interface FileOutputPresent extends BaseFileOutput {
	manifest: StructuredFsⳇFileManifest,
	content: JSONObject,
}

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

	output_files: {
		[path: string]: FileOutputAbsent | FileOutputPresent
	}

	// XXX
	/*files_existing: Record<
		AbsoluteFilePath,
		{
			manifest_key: MultiRepoRelativeFilePath
			abspath: AbsoluteFilePath

			data: unknown // TODO
		}
	>

	pending_async_ops: {
		[key: string]: Promise<Reducer>
	}*/
}
