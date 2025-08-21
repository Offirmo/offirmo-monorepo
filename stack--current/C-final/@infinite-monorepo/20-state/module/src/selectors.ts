import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type {
	InfiniteMonorepoSpec,
	Node,
	StructuredFsOutput,
	StructuredFsOutputⳇFileManifest,
	MultiRepoRelativeFilePath,
	StructuredFsⳇFileManifest,
} from '@infinite-monorepo/types'

import type { State } from './types.ts'

/////////////////////////////////////////////////

function getꓽnodesⵧnot_analyzed(state: Immutable<State>): Immutable<Array<Node>> {
	return Object.values(state.graph.nodesⵧall).filter(node => !node.isꓽanalyzed)
}

/////////////////////////////////////////////////

export { getꓽnodesⵧnot_analyzed }
