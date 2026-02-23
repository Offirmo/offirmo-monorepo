import assert from 'tiny-invariant'
import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	type Node,
	type NodeⳇPackage,
	type NodeⳇWorkspaceLine,
	PATHVARⵧROOTⵧWORKSPACE,
	PATHVARⵧROOTⵧWORKSPACE__LINE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import { manifestꓽpackageᐧjson } from '@infinite-monorepo/plugin--npm'
import * as path from 'node:path'
import { lsDirsSync } from '@monorepo-private/fs--ls'
import { isꓽError } from '@offirmo/error-utils/v2'

/////////////////////////////////////////////////

const pluginꓽbolt: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
		if (node.type !== 'workspace') return state

		state = StateLib.requestꓽfactsⵧabout_file(
			state,
			manifestꓽpackageᐧjson,
			node,
			(state, result) => {
				if (!result) return state // no file = fact "not using bolt"

				if (isꓽError(result)) {
					// what to do?
					throw result
				}

				const bolt_stuff = result?.['bolt']
				if (!bolt_stuff) return state // not using bolt

				// discover new node
				const { workspaces } = bolt_stuff
				if (workspaces) {
					// TODO 1D use a glob lib

					const MONOREPO_WORKSPACES_RELPATHS = (workspaces as string[])
						.filter((p: RelPath) => {
							return !p.startsWith('#') && !p.startsWith('xx') // we allow "commenting" a workspace to help "progressive resurrection"
						})
						.map(p => p.slice(0, -2)) // slice to remove trailing "/*"
						.sort()

					MONOREPO_WORKSPACES_RELPATHS.forEach(path_rel => {
						const line_node: NodeⳇWorkspaceLine = {
							type: 'workspace__line',
							parent_id: node.path‿abs,
							path‿ar: `${PATHVARⵧROOTⵧWORKSPACE}/${path_rel}`,
							path‿abs: path.join(node.path‿abs, path_rel) + '/',
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
								type: 'package',
								parent_id: line_node.path‿abs,
								path‿ar: `${PATHVARⵧROOTⵧWORKSPACE__LINE}/${path_rel}/`,
								path‿abs: path.join(line_node.path‿abs, path_rel) + '/',
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

	// TODO on end of propagation?
}

/////////////////////////////////////////////////

export default pluginꓽbolt
export { pluginꓽbolt }
