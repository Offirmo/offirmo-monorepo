import * as path from 'node:path'
import assert from 'tiny-invariant'
import type {
	JSONObject,
	Immutable,
	AbsolutePath,
	JSON,
	AbsoluteDirPath,
} from '@offirmo-private/ts-types'
import { mergeꓽjson } from '@infinite-monorepo/read-write-any-structured-file'
import { loadꓽspecⵧchainⵧraw } from '@infinite-monorepo/load-spec'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'

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
	PATHVARⵧROOTⵧPACKAGE,
} from '@infinite-monorepo/types'
import { completeꓽspec } from '@infinite-monorepo/defaults'

import type {
	State,
	FileOutputAbsent,
	FileOutputPresent,
	AsyncCallbackReducer,
	SubStateⳇFactsFile,
} from './types.ts'

/////////////////////////////////////////////////
const DEBUG = true

function create(): Immutable<State> {
	DEBUG && console.debug('Creating state...')

	return {
		spec: completeꓽspec({}),

		file_manifests: {},

		graphs: {
			nodesⵧscm: {},
			nodesⵧworkspace: {},
		},

		facts: {
			files: {},
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
		parent_id: null, // bc root in its graph
		plugin_area: {},
	}
	const nodeⵧworkspace_root: NodeⳇWorkspace = {
		type: 'workspace',
		path‿abs: PENDING,
		path‿ar: `${PATHVARⵧROOTⵧWORKSPACE}/`,
		parent_id: null, // bc root in its graph
		plugin_area: {},
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
			topmost_spec_under_workspace = {
				...result.data as any, // TODO 1D schema validation
				_config_fileⵧroot: result.exact_file_path‿abs,
				root_path‿abs: result.parent_folder_path‿abs,
			}
			if (nodeⵧworkspace_root.path‿abs === PENDING) {
				assert(nodeⵧscm_root.path‿abs !== PENDING, `SCM root must be known before workspace!`)
				nodeⵧworkspace_root.path‿abs = result.parent_folder_path‿abs
				nodeⵧworkspace_root.spec = completeꓽspec(topmost_spec_under_workspace || {})
				state = registerꓽnode(state, nodeⵧworkspace_root)
			} else {
				// must be a subfolder modifier, ignore
				// TODO 1D handle config not at root of workspace
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
					nodeⵧworkspace_root.spec = completeꓽspec(topmost_spec_under_workspace || {})
					state = registerꓽnode(state, nodeⵧworkspace_root)
				} else {
					// must be a subfolder modifier, ignore
				}
			}
		})
	}
	assert(nodeⵧworkspace_root.path‿abs !== PENDING, `Workspace root must exist!`)

	// TODO review, duplicate??
	if (topmost_spec_under_workspace) { // TODO review can be falsy?
		state = {
			...state,
			spec: nodeⵧworkspace_root.spec
		}
	}

	return state
}

// XXX TODO link parent!
function registerꓽnode(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
	DEBUG && console.debug(`Registering "${node.type}" node...`, node.path‿abs)

	node = {
		plugin_area: {},
		...node,
	}

	//////////// SCM GRAPH ////////////
	if (node.type === 'repository') {
		assert(!node.spec, `SCM node should not have a spec!`)
		assert(
			state.graphs.nodesⵧscm[node.path‿abs] === undefined,
			`SCM node already registered: ${node.path‿abs}!`,
		)

		return {
			...state,
			graphs: {
				...state.graphs,
				nodesⵧscm: {
					...state.graphs.nodesⵧscm,
					[node.path‿abs]: {
						...node,
						status: 'new',
					},
				},
			},
		}
	}

	//////////// WORKSPACE GRAPH ////////////
	assert(
		state.graphs.nodesⵧworkspace[node.path‿abs] === undefined,
		`Semantic node already registered: ${node.path‿abs}!`,
	)

	node = {
		spec: {},
		...node,
	}

	switch (node.type) {
		case 'package': {
			node = {
				//details: c ??
				...node,
			}
		}
		default:
			break
	}

	return {
		...state,
		graphs: {
			...state.graphs,
			nodesⵧworkspace: {
				...state.graphs.nodesⵧworkspace,
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
		assert(!!state.graphs.nodesⵧscm[node.path‿abs], `Node expected: ${node.path‿abs}!`)
		assert(
			state.graphs.nodesⵧscm[node.path‿abs]?.status === 'new',
			`Node not new: ${node.path‿abs}!`,
		)

		return {
			...state,
			graphs: {
				...state.graphs,
				nodesⵧscm: {
					...state.graphs.nodesⵧscm,
					[node.path‿abs]: {
						...node,
						status: 'analyzed',
					},
				},
			},
		}
	}

	assert(!!state.graphs.nodesⵧworkspace[node.path‿abs], `Node expected: ${node.path‿abs}!`)
	assert(
		state.graphs.nodesⵧworkspace[node.path‿abs]?.status === 'new',
		`Node not new: ${node.path‿abs}!`,
	)

	return {
		...state,
		graphs: {
			...state.graphs,
			nodesⵧworkspace: {
				...state.graphs.nodesⵧworkspace,
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

	if (node) {
		if (first_segment === PATHVARⵧROOTⵧNODE) {
			// joker, matches any node
			return path.resolve(node.path‿abs, path‿ar.slice(first_segment.length + 1))
		}

		if (node.path‿ar.startsWith(first_segment)) {
			// the node is the one we need
			return path.resolve(node.path‿abs, path‿ar.slice(first_segment.length + 1))
		}

		if (first_segment === PATHVARⵧROOTⵧPACKAGE && node.type === 'workspace') {
			// special: the workspace root is also a package
			return path.resolve(node.path‿abs, path‿ar.slice(first_segment.length + 1))
		}
	}

	// need to find the correct node by walking up the tree
	throw new Error(`_resolveꓽarpath(): not implemented!`)
}

function requestꓽfactsⵧabout_file(
	state: Immutable<State>,
	manifest: StructuredFsⳇFileManifest,
	parent_node: Immutable<Node> | undefined,
	callback: AsyncCallbackReducer,
): Immutable<State> {
	DEBUG
		&& console.debug(
			`requestꓽfactsⵧabout_file("${manifest.path‿ar}" from "${parent_node?.path‿ar}")`,
		)

	const path_abs = _resolveꓽarpath(state, manifest.path‿ar, parent_node)
	const x: Immutable<SubStateⳇFactsFile> =
		state.facts.files[path_abs]
		|| ((): Immutable<SubStateⳇFactsFile> => {
			DEBUG && console.debug('New fact file request', path_abs)
			return {
				manifest,
				content: undefined,
				ↆretrieval: ↆreadꓽfile(path_abs, { format: manifest.format }),
				pending_callbacks: [],
			} as SubStateⳇFactsFile
		})()

	assert(x.manifest.format === manifest.format, `File manifest conflict!`)

	if (!x.ↆretrieval) {
		DEBUG && console.debug('Already read', path_abs)
		assert(x.content !== undefined, `File must have been read!`)
		return callback(state, null, x.content) // direct invocation
	}

	return {
		...state,
		facts: {
			...state.facts,
			files: {
				...state.facts.files,
				[path_abs]: {
					...x,
					pending_callbacks: [...(x.pending_callbacks || []), callback],
				},
			},
		},
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
			const merge_spec: Immutable<FileOutputPresent> = {
				...candidate_spec,
				content: mergeꓽjson(
					(existing as any as FileOutputPresent).content,
					(candidate_spec as any as FileOutputPresent).content!,
				) as any,
			}
			spec = merge_spec
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

// special async

async function resolveꓽasync(state: Immutable<State>): Promise<Immutable<State>> {
	const pending: Array<Promise<void>> = []

	Object.entries(state.facts.files).forEach(([path, substate]) => {
		if (substate.ↆretrieval) {
			const p: Promise<void> = substate.ↆretrieval.then(content => {
				DEBUG && console.debug('File read:', path)
				const new_substate: Immutable<SubStateⳇFactsFile> = {
					manifest: substate.manifest,
					content,
				}
				state = {
					...state,
					facts: {
						...state.facts,
						files: {
							...state.facts.files,
							[path]: new_substate,
						},
					},
				}
				state = (substate.pending_callbacks || []).reduce((state, acb) => {
					return acb(state, null, content)
				}, state)
			})
			pending.push(p)
		}
	})

	await Promise.all(pending)

	return state
}

/////////////////////////////////////////////////

export {
	create,
	onꓽspec_chain_loaded,
	registerꓽnode,
	reportꓽnodeⵧanalyzed,
	declareꓽfile_manifest,
	requestꓽfactsⵧabout_file,
	resolveꓽasync,
	requestꓽfile_output,
}
