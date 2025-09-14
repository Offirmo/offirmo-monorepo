import type { Immutable, ImmutableJSONObject } from '@offirmo-private/ts-types'
import type {
	InfiniteMonorepoSpec,
	Node,
	MultiRepoRelativeFilePath,
	StructuredFsⳇFileManifest,
} from '@infinite-monorepo/types'
import * as StateLib from './index.ts'

/////////////////////////////////////////////////

export type FileOutputIntent =
	| 'present--exact'
	| 'present--containing'
	| 'not-present'

interface BaseFileOutput {
	path‿ar?: MultiRepoRelativeFilePath // optional if manifest is provided
	parent_node?: Node | Immutable<Node> // if path and needed to resolve the path
	intent: FileOutputIntent
}

export interface FileOutputAbsent extends BaseFileOutput {
	path‿ar: MultiRepoRelativeFilePath // mandatory
	intent: 'not-present'
}
export interface FileOutputPresent extends BaseFileOutput {
	intent: 'present--exact' | 'present--containing'
	manifest: StructuredFsⳇFileManifest
	content: ImmutableJSONObject
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
		// SCM nodes may overlap with semantic nodes, so we store them separately
		nodesⵧscm: { [id: string]: Node & { status: 'new' | 'analyzed' } }
		nodesⵧsemantic: { [id: string]: Node & { status: 'new' | 'analyzed' } }
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

/////////////////////////////////////////////////

export interface Plugin {
	// on plugin load
	onꓽload?: (state: Immutable<StateLib.State>) => Immutable<StateLib.State>

	// to gather facts (and not opinions!)
	onꓽnodeⵧdiscovered?: (
		state: Immutable<StateLib.State>,
		node: Immutable<Node>,
	) => Immutable<StateLib.State>

	// to reach the ideal state (file outputs)
	onꓽapply?: (state: Immutable<StateLib.State>, node: Immutable<Node>) => Immutable<StateLib.State>
}
