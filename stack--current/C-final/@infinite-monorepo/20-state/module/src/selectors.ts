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

function getꓽnodesⵧnew(state: Immutable<State>): Immutable<Array<Node>> {
	return Object.values(state.graph.nodesⵧall).filter(node => node.status === 'new')
}

function getꓽfile__content(state: Immutable<State>): Immutable<Array<Node>> {
	return Object.values(state.graph.nodesⵧall).filter(node => node.status === 'new')
}

/////////////////////////////////////////////////

export { getꓽnodesⵧnew }
