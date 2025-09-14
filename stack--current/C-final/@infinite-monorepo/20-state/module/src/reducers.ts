import * as path from 'node:path'
import assert from 'tiny-invariant'
import type {
	JSONObject,
	Immutable,
	AbsolutePath,
	JSON,
	AbsoluteDirPath,
} from '@offirmo-private/ts-types'
import { loadꓽspecⵧchainⵧraw } from '@infinite-monorepo/load-spec'

import {
	type InfiniteMonorepoSpec,
	type Node,
	type NodeⳇWorkspace,
	type StructuredFsⳇFileManifest,
	type MultiRepoRelativeFilePath,
	PATHVARⵧROOTⵧNODE,
	PATHVARⵧROOTⵧREPO,
	PATHVARⵧROOTⵧWORKSPACE,
	type NodeⳇRepo,
} from '@infinite-monorepo/types'
import { completeꓽspec } from '@infinite-monorepo/defaults'

import type { State, FileOutputAbsent, FileOutputPresent } from './types.ts'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

/////////////////////////////////////////////////
const DEBUG = true

function create(): Immutable<State> {
	DEBUG && console.debug('Creating state...')

	return {
		spec: completeꓽspec({}),

		file_manifests: {},

		graph: {
			nodesⵧscm: {},
			nodesⵧsemantic: {},
		},

		output_files: {},
	}
}

function onꓽspec_chain_loaded(
	state: Immutable<State>,
	spec_chain: Awaited<ReturnType<typeof loadꓽspecⵧchainⵧraw>>,
): Immutable<State> {
	DEBUG && console.debug('On spec chain loaded...')

	// traverse the chain, discovering nodes
	const PENDING: AbsoluteDirPath = 'PENDING/'
	const nodeⵧscm_root: NodeⳇRepo = {
		type: 'repository',
		path‿abs: PENDING,
		path‿ar: `${PATHVARⵧROOTⵧREPO}/`,
		parent_id: null,
	}
	const nodeⵧworkspace_root: NodeⳇWorkspace = {
		type: 'workspace',
		path‿abs: PENDING,
		path‿ar: `${PATHVARⵧROOTⵧWORKSPACE}/`,
		parent_id: null,
	}
	let topmost_spec_under_workspace: InfiniteMonorepoSpec | undefined

	spec_chain.forEach(result => {
		//console.log('Spec loaded:', result)

		if (result.boundary === 'git') {
			if (nodeⵧscm_root.path‿abs === PENDING) {
				nodeⵧscm_root.path‿abs = result.parent_folder_path‿abs
				state = registerꓽnode(state, nodeⵧscm_root)
			} else {
				// must be a git submodule, ignore
			}
		}

		// reminder that scm root and workspace can be the same
		if (result.data) {
			if (nodeⵧworkspace_root.path‿abs === PENDING) {
				assert(nodeⵧscm_root.path‿abs !== PENDING, `SCM root must be known before workspace!`)
				nodeⵧworkspace_root.path‿abs = result.parent_folder_path‿abs
				topmost_spec_under_workspace = nodeⵧworkspace_root.spec = result.data
				state = registerꓽnode(state, nodeⵧworkspace_root)
			} else {
				// must be a subfolder modifier, ignore
				// TODO 1D handle config not at root of workspace
				topmost_spec_under_workspace ||= result.data
			}
		}
	})
	assert(nodeⵧscm_root.path‿abs !== PENDING, `SCM root must exist!`)

	if (nodeⵧworkspace_root.path‿abs === PENDING) {
		// do a second pass using package.json as a hint
		spec_chain.forEach(result => {
			//console.log('Spec loaded:', result)
			if (result.hasꓽpackageᐧjson) {
				if (nodeⵧworkspace_root.path‿abs === PENDING) {
					nodeⵧworkspace_root.path‿abs = result.parent_folder_path‿abs
					nodeⵧworkspace_root.spec = topmost_spec_under_workspace
					state = registerꓽnode(state, nodeⵧworkspace_root)
				} else {
					// must be a subfolder modifier, ignore
				}
			}
		})
	}
	assert(nodeⵧworkspace_root.path‿abs !== PENDING, `Workspace root must exist!`)

	return state
}

// XXX TODO link parent!
function registerꓽnode(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Registering node...', node.path‿abs, node.type)

	if (node.type === 'repository') {
		assert(
			state.graph.nodesⵧscm[node.path‿abs] === undefined,
			`SCM node already registered: ${node.path‿abs}!`,
		)

		return {
			...state,
			graph: {
				...state.graph,
				nodesⵧscm: {
					...state.graph.nodesⵧscm,
					[node.path‿abs]: {
						...node,
						status: 'new',
					},
				},
			},
		}
	}

	assert(
		state.graph.nodesⵧsemantic[node.path‿abs] === undefined,
		`Semantic node already registered: ${node.path‿abs}!`,
	)

	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧsemantic: {
				...state.graph.nodesⵧsemantic,
				[node.path‿abs]: {
					...node,
					status: 'new',
				},
			},
		},
	}
}
function reportꓽnodeⵧanalyzed(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug('Marking node analyzed...', node.path‿abs, node.type)

	if (node.type === 'repository') {
		assert(!!state.graph.nodesⵧscm[node.path‿abs], `Node expected: ${node.path‿abs}!`)
		assert(
			state.graph.nodesⵧscm[node.path‿abs]?.status === 'new',
			`Node not new: ${node.path‿abs}!`,
		)

		return {
			...state,
			graph: {
				...state.graph,
				nodesⵧscm: {
					...state.graph.nodesⵧscm,
					[node.path‿abs]: {
						...node,
						status: 'analyzed',
					},
				},
			},
		}
	}

	assert(!!state.graph.nodesⵧsemantic[node.path‿abs], `Node expected: ${node.path‿abs}!`)
	assert(
		state.graph.nodesⵧsemantic[node.path‿abs]?.status === 'new',
		`Node not new: ${node.path‿abs}!`,
	)

	return {
		...state,
		graph: {
			...state.graph,
			nodesⵧsemantic: {
				...state.graph.nodesⵧsemantic,
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
		const is_equal = manifest === existing
		assert(is_equal, `Conflicting file manifests for ${manifest.path‿ar}!`)
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
	path‿ar: MultiRepoRelativeFilePath,
	node?: Immutable<Node> | undefined,
): AbsolutePath {
	const first_segment = path‿ar.split('/')[0]
	assert(
		!!first_segment && first_segment.startsWith('$') && first_segment.endsWith('$'),
		`Invalid arpath NOT starting with a $PATHVAR$: "${path‿ar}"!`,
	)

	if (node && (first_segment === PATHVARⵧROOTⵧNODE || node.path‿ar.startsWith(first_segment))) {
		// easy, the node is the one we need
		return path.resolve(node.path‿abs, path‿ar.slice(first_segment.length + 1))
	}

	// need to find the correct node by walking up the tree
	throw new Error(`_resolveꓽarpath(): not implemented!`)
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

function _getJsonType(a: JSON): 'object' | 'array' | 'primitive' | 'undef' {
	if (a === undefined) {
		return 'undef'
	}

	if (Array.isArray(a)) {
		return 'array'
	}

	if (a === null) return 'primitive'
	if (['string', 'number', 'boolean'].includes(typeof a)) return 'primitive'

	if (isꓽobjectⵧliteral(a)) {
		return 'object'
	}

	throw new Error('Incorrect JSON!')
}

function _mergeJson(a: JSON, b: JSON): JSON {
	const ta = _getJsonType(a)
	const tb = _getJsonType(b)
	if (ta === undefined) {
		return b
	}
	if (tb === undefined) {
		return a
	}
	if (ta !== tb) {
		throw new Error(`Cannot merge different JSON types: ${ta} vs ${tb}!`)
	}
	switch (ta) {
		case 'primitive':
			if (a === b) return a
			throw new Error(`Cannot merge conflicting primitive JSON values: ${a} vs ${b}!`)
		case 'array':
			// TODO set for uniqueness!
			return [...(a as JSON[]), ...(b as JSON[])].sort()
		case 'object': {
			const result: JSONObject = {}
			const k1 = Object.keys(a as JSONObject)
			const k2 = Object.keys(b as JSONObject)
			const all_keys = Array.from(new Set([...k1, ...k2])).sort()
			for (const k of all_keys) {
				result[k] = _mergeJson((a as JSONObject)[k], (b as JSONObject)[k])
			}
			return result
		}
		default:
			throw new Error('Unexpected JSON type!')
	}
}

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
	candidate_spec: Immutable<FileOutputAbsent | FileOutputPresent>,
): Immutable<State> {
	const path‿ar =
		candidate_spec.path‿ar || (candidate_spec as any as FileOutputPresent)?.manifest?.path‿ar
	assert(!!path‿ar, `requestꓽfile_output(): should provide a path!`)
	const path‿abs = _resolveꓽarpath(state, path‿ar, candidate_spec.parent_node)

	let spec = candidate_spec
	const existing = state.output_files[path‿abs]
	if (existing) {
		assert(
			existing.intent === candidate_spec.intent,
			`Conflict! Multiple intents for file ${path‿abs}!`,
		)
		assert(
			(existing as any).manifest?.path‿ar === (candidate_spec as any).manifest?.path‿ar,
			`Conflict! Multiple manifests for file ${path‿abs}!`,
		)
		assert(
			(existing as any).manifest?.format === (candidate_spec as any).manifest?.format,
			`Conflict! Multiple manifests for file ${path‿abs}!`,
		)

		if (candidate_spec.intent === 'present--exact') {
			// check same content
			assert(false, 'Not implemented!')
		} else if (candidate_spec.intent === 'present--containing') {
			spec = {
				...candidate_spec,
				content: _mergeJson(existing.content, candidate_spec.content),
			}
			//console.log('TODO check')
		}
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
	onꓽspec_chain_loaded,
	registerꓽnode,
	reportꓽnodeⵧanalyzed,
	declareꓽfile_manifest,
	requestꓽfile_output,
}
