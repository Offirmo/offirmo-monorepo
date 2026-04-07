import assert from '@monorepo-private/assert/v1'
import * as semver from 'semver'
import type { Immutable, PathⳇRelative } from '@monorepo-private/ts--types'
import {
	type Node, NODE_TYPEⵧPACKAGE, NODE_TYPEⵧWORKSPACES__LINE,
	type NodeⳇPackage,
	type NodeⳇWorkspaceLine,
	PATHVARⵧROOTⵧMONOREPO,
	PATHVARⵧROOTⵧWORKSPACE__LINE,
} from '@infinite-monorepo/types-for-plugins'
import type {State, Plugin, FileOutputPresent} from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import { manifestꓽpackageᐧjson } from '@infinite-monorepo/plugin--npm'
import * as path from 'node:path'
import { lsDirsSync } from '@monorepo-private/fs--ls'
import { isꓽError } from '@offirmo/error-utils/v2'

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
		if (node.type !== 'monorepo') return state

		state = StateLib.requestꓽfactsⵧabout_file(
			state,
			manifestꓽpackageᐧjson,
			node,
			(state, result) => {
				if (!result) return state // no file = fact "not using bolt"
				if (isꓽError(result)) throw result

				const bolt_stuff = result.dataⵧjson['bolt']
				if (!bolt_stuff) return state // not using bolt

				// discover new node
				const { workspaces: workspacesⵧraw } = bolt_stuff
				if (workspacesⵧraw) {
					// TODO 1D follow https://github.com/boltpkg/bolt/blob/master/src/utils/globs.js
					// or use node integrated glob

					const workspaces = (workspacesⵧraw as string[])
						.filter((p: PathⳇRelative) => {
							return !p.startsWith('#') && !p.startsWith('xx') // we allow "commenting" a workspace to help "progressive resurrection"
						})
						.sort()

					const MONOREPO_WORKSPACES_RELPATHS = workspaces
						.map(p => p.slice(0, -2)) // slice to remove trailing "/*"
						.sort()

					MONOREPO_WORKSPACES_RELPATHS.forEach(path_rel => {
						const line_node: NodeⳇWorkspaceLine = {
							type: NODE_TYPEⵧWORKSPACES__LINE,
							parent_id: node.path‿abs,
							path‿ar: `${PATHVARⵧROOTⵧMONOREPO}/${path_rel}`,
							path‿abs: `${path.join(node.path‿abs, path_rel)}/`,
							plugin_area: {},
						}
						state = StateLib.registerꓽnode(state, line_node)

						const candidate_package_dirs = lsDirsSync(line_node.path‿abs, {
							full_path: false,
						}).filter(relpath => {
							// TODO 1D check if package.json BUT I recall that Bolt isn't checking that and fails, so no
							return true
						})

						candidate_package_dirs.forEach(path_rel => {
							const pkg_node: NodeⳇPackage = {
								type: NODE_TYPEⵧPACKAGE,
								parent_id: line_node.path‿abs,
								path‿ar: `${PATHVARⵧROOTⵧWORKSPACE__LINE}/${path_rel}/`,
								path‿abs: `${path.join(line_node.path‿abs, path_rel)}/`,
								spec: {},
								plugin_area: {},
							}
							state = StateLib.registerꓽnode(state, pkg_node)
						})
					})
				}

				return {
					...state,
					spec: {
						...state.spec,
						package_manager: 'bolt',
					},
				}
			},
		)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
	if (StateLib.getꓽpackage_manager(state).name !== 'bolt') return state

	switch (node?.type) {
		case 'monorepo': {
			const output_specꓽpackageᐧjson: FileOutputPresent = {
				parent_node: node,
				manifest: manifestꓽpackageᐧjson,
				intent: 'present--containing',
				content: {
					"// @infinite-monorepo/plugin--bolt": "auto generated some content in this file",
					bolt: {
						"//": "https://github.com/boltpkg/bolt",
						workspaces: [
							...state.spec.workspaces,
						]
					},
				},
			}
			state = StateLib.requestꓽfile_output(state, output_specꓽpackageᐧjson)
			break
		}
		default:
			break
	}

	return state
},
}

/////////////////////////////////////////////////

export default PLUGIN
//export { PLUGIN }
