import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { MultiMonorepoSpec, Node, StructuredFsOutput, StructuredFsOutputⳇFullFile, StructuredFsOutputⳇFileManifest, NodeⳇWorkspace } from '@infinite-monorepo/types'
import { completeꓽspec } from '@infinite-monorepo/defaults'

import type { State } from './types.ts'


/////////////////////////////////////////////////

function create(): Immutable<State> {
	return {
		spec: completeꓽspec({}),

		graph: {
			nodesⵧall: {},
		},

		file_manifests: [],

		file_output: [],
	}
}

function onꓽspec_loaded(state: Immutable<State>, spec: MultiMonorepoSpec): Immutable<State> {
	// as of now, spec = workspace
	const root_node: NodeⳇWorkspace = {
		type: 'workspace',
		path: spec.root_path,
	}

	return registerꓽnode({
		...state,
		spec,
	}, root_node)
}

function registerꓽnode(state: Immutable<State>, node: Node): Immutable<State> {
	assert(state.graph.nodesⵧall[node.path] === undefined, `Node already registered: ${node.path}!`)
	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧall: {
				...state.graph.nodesⵧall,
				[node.path]: node,
			}
		}
	}
}

function declareꓽfile_manifest(manifest: StructuredFsOutputⳇFileManifest): Immutable<State> {
	throw new Error(`Not implemented!`)
}

function requestꓽfile_output(content: StructuredFsOutputⳇFullFile): Immutable<State> {
	throw new Error(`Not implemented!`)
}

/////////////////////////////////////////////////

export {
	create,
	onꓽspec_loaded,
}
