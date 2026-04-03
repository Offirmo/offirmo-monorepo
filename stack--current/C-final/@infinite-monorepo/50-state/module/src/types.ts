import type { Immutable, JSONObject } from '@monorepo-private/ts--types'
import { type XXError } from '@offirmo/error-utils'
import type {
	InfiniteMonorepoSpec,
} from '@infinite-monorepo/spec'
import type {
	StructuredFsⳇFileManifest,
} from '@infinite-monorepo/structured-file-manifest'
import type {
	Node,
	MultiRepoFilePathⳇRelative,
} from '@infinite-monorepo/graph'
import * as StateLib from './index.ts'

/////////////////////////////////////////////////

export type FileOutputIntent =
	| 'not-present'
	| 'present'              // default content if not present, won't touch if present
	| 'present--exact'       // fully overwrite
	| 'present--containing'  // merge content
	| 'symlink'

interface BaseFileOutput {
	path‿ar?: MultiRepoFilePathⳇRelative // optional if manifest is provided
	parent_node?: Node | Immutable<Node> // if path and needed to resolve the path
	intent: FileOutputIntent
}

export interface FileOutputAbsent extends BaseFileOutput {
	path‿ar: MultiRepoFilePathⳇRelative // mandatory
	intent: 'not-present'
}
export interface FileOutputPresent extends BaseFileOutput {
	intent: 'present' | 'present--exact' | 'present--containing' | 'symlink'
	manifest: StructuredFsⳇFileManifest
	content: Immutable<JSONObject>
}

/////////////////////////////////////////////////

export type AsyncCallbackReducer<T> = (
	state: Immutable<State>,
	result: T | Error,
) => Immutable<State>

export interface SubStateⳇFactsFile {
	manifest: StructuredFsⳇFileManifest // useful to validate compat if concurrent requests
	content:
		| undefined  // not loaded yet (promise pending)
		| null       // null = file not found
		| 'error'    // issue reading this structured file, ex. parse error
		| JSONObject // structured result
	// those props are only present when content is undefined
	ↆretrieval: Promise<JSONObject>
	pending_callbacks?: Array<AsyncCallbackReducer<JSONObject | null>>
	_error?: XXError
}

export interface State {
	spec: InfiniteMonorepoSpec

	graphs: {
		// different graph nodes may overlap, so we store them separately
		// ex. repo root may also be the workspace root
		nodesⵧscm: { [id: string]: Node & { status: 'new' | 'analyzed' } }
		nodesⵧworkspace: { [id: string]: Node & { status: 'new' | 'analyzed' } }
	}

	file_manifests: Record<MultiRepoFilePathⳇRelative, StructuredFsⳇFileManifest>

	facts: {
		files: {
			// would be pre-existing files, discovered on-demand
			[path: string]: SubStateⳇFactsFile
		}
	}

	output_files: {
		[path: string]: FileOutputAbsent | FileOutputPresent
	}
}
