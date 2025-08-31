import assert from 'tiny-invariant'
import type { JSONObject, Immutable, AbsolutePath } from '@offirmo-private/ts-types'

import type {
	InfiniteMonorepoSpec,
	Node,
	NodeⳇWorkspace,
	StructuredFsⳇFileManifest,
	MultiRepoRelativeFilePath, NodeRelativePath,
} from '@infinite-monorepo/types'
import { completeꓽspec } from '@infinite-monorepo/defaults'

import type {
	State,
	FileOutputAbsent, FileOutputPresent,
} from './types.ts'
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
		path‿ar: '$WORKSPACE_ROOT/',
	}

	return registerꓽnode(
		{
			...state,
			spec,
		},
		root_node,
	)
}

function registerꓽnode(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Registering node...', node.path)

	assert(state.graph.nodesⵧall[node.path] === undefined, `Node already registered: ${node.path}!`)
	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧall: {
				...state.graph.nodesⵧall,
				[node.path]: {
					...node,
					status: 'new',
				},
			},
		},
	}
}
function reportꓽnodeⵧanalyzed(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Marking node analyzed...', node.path)

	assert(!!state.graph.nodesⵧall[node.path], `Node expected: ${node.path}!`)
	assert(state.graph.nodesⵧall[node.path].status === 'new', `Node not new: ${node.path}!`)

	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧall: {
				...state.graph.nodesⵧall,
				[node.path]: {
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
	arpath: MultiRepoRelativeFilePath,
	node?: Immutable<Node> | undefined,
): AbsolutePath {
	throw new Error(`Not implemented!`)
}

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
}

function requestꓽfile_output(state: Immutable<State>, spec: Immutable<FileOutputAbsent>): Immutable<State>;
function requestꓽfile_output(state: Immutable<State>, spec: Immutable<FileOutputPresent>): Immutable<State>;
function requestꓽfile_output(state: Immutable<State>, spec: Immutable<FileOutputAbsent | FileOutputPresent>): Immutable<State> {
	const path‿abs = _resolveꓽarpath(spec.path, spec.node)

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
		}
	}
}

/////////////////////////////////////////////////

export {
	create,
	onꓽspec_loaded,
	registerꓽnode,
	reportꓽnodeⵧanalyzed,
	declareꓽfile_manifest,
	ensureꓽfile_loading,
	requestꓽfile_output,
}
