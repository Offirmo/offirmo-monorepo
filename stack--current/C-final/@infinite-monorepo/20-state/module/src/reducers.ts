import * as path from 'node:path'
import assert from 'tiny-invariant'
import type { JSONObject, Immutable, AbsolutePath } from '@offirmo-private/ts-types'

import {
	type InfiniteMonorepoSpec,
	type Node,
	type NodeⳇWorkspace,
	type StructuredFsⳇFileManifest,
	type MultiRepoRelativeFilePath,
	type NodeRelativePath,
	PATHVARⵧROOTⵧWORKSPACE,
	PATHVARⵧROOTⵧNODE,
} from '@infinite-monorepo/types'
import { completeꓽspec } from '@infinite-monorepo/defaults'

import type { State, FileOutputAbsent, FileOutputPresent } from './types.ts'
import * as semver from 'semver'

/////////////////////////////////////////////////
const DEBUG = true

function create(): Immutable<State> {
	DEBUG && console.debug('Creating state...')

	return {
		spec: completeꓽspec({}),

		file_manifests: {},

		graph: {
			nodesⵧall: {},
		},

		output_files: {},
	}
}

function onꓽspec_loaded(state: Immutable<State>, spec: InfiniteMonorepoSpec): Immutable<State> {
	DEBUG && console.debug('On spec loaded...', spec.root_path‿abs)

	// as of now, spec = workspace
	const root_node: NodeⳇWorkspace = {
		type: 'workspace',
		path‿abs: spec.root_path‿abs,
		path‿ar: '$WORKSPACE_ROOT$/',
		parent: null,
	}

	return registerꓽnode(
		{
			...state,
			spec,
		},
		root_node,
	)
}

// XXX TODO parent!
function registerꓽnode(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Registering node...', node.path‿abs)

	assert(
		state.graph.nodesⵧall[node.path‿abs] === undefined,
		`Node already registered: ${node.path‿abs}!`,
	)

	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧall: {
				...state.graph.nodesⵧall,
				[node.path‿abs]: {
					...node,
					status: 'new',
				},
			},
		},
	}
}
function reportꓽnodeⵧanalyzed(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Marking node analyzed...', node.path‿abs)

	assert(!!state.graph.nodesⵧall[node.path‿abs], `Node expected: ${node.path‿abs}!`)
	assert(state.graph.nodesⵧall[node.path‿abs]?.status === 'new', `Node not new: ${node.path‿abs}!`)

	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧall: {
				...state.graph.nodesⵧall,
				[node.path‿abs]: {
					...node,
					status: 'analyzed',
				},
			},
		},
	}
}

function declareꓽfile_manifest(
	state: Immutable<State>,
	manifest: StructuredFsⳇFileManifest,
): Immutable<State> {
	DEBUG && console.debug('Declaring manifest...', manifest)

	const existing = state.file_manifests[manifest.path‿ar]
	if (existing) {
		throw new Error(`File manifest already declared for ${manifest.path‿ar}!`)
	}

	return {
		...state,
		file_manifests: {
			...state.file_manifests,
			[manifest.path‿ar]: manifest,
		},
	}
}

function _resolveꓽarpath(
	state: Immutable<State>,
	arpath: MultiRepoRelativeFilePath,
	node?: Immutable<Node> | undefined,
): AbsolutePath {
	const first_segment = arpath.split('/')[0]
	assert(
		!!first_segment && first_segment.startsWith('$') && first_segment.endsWith('$'),
		`Invalid arpath NOT starting with a $PATHVAR$: "${arpath}"!`,
	)

	switch (first_segment) {
		case PATHVARⵧROOTⵧNODE: {
			assert(!!node, `Need a node to resolve ${PATHVARⵧROOTⵧNODE}!`)

			return path.resolve(node.path‿abs, arpath.slice(first_segment.length + 1))
		}
		default:
			throw new Error(`Unknown or unsupported $PATHVAR$: "${first_segment}"!`)
	}
}

/*
function ensureꓽfile_loading(
	state: Immutable<State>,
	parent_node: Immutable<Node>,
	arpath: MultiRepoRelativeFilePath,
): Immutable<State> {
	DEBUG && console.debug('Ensuring load...', arpath, parent_node)

	const path_abs = _resolveꓽarpath(arpath, parent_node)
	if (state.files_existing[path_abs]) {
		DEBUG && console.debug('Already loaded', path_abs)
		return state
	}
	throw new Error('not implemented!')
}*/

function requestꓽfile_output(
	state: Immutable<State>,
	spec: Immutable<FileOutputAbsent>,
): Immutable<State>
function requestꓽfile_output(
	state: Immutable<State>,
	spec: Immutable<FileOutputPresent>,
): Immutable<State>
function requestꓽfile_output(
	state: Immutable<State>,
	spec: Immutable<FileOutputAbsent | FileOutputPresent>,
): Immutable<State> {
	const path‿abs = _resolveꓽarpath(state, spec.path, spec.node)

	const existing = state.output_files[path‿abs]
	if (existing) {
		// TODO 1D merge or check for conflict
		throw new Error(`Not implemented!`)
	}

	return {
		...state,
		output_files: {
			...state.output_files,
			[path‿abs]: spec,
		},
	}
}

/////////////////////////////////////////////////

export {
	create,
	onꓽspec_loaded,
	registerꓽnode,
	reportꓽnodeⵧanalyzed,
	declareꓽfile_manifest,
	requestꓽfile_output,
}
