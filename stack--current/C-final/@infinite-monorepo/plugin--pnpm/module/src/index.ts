import * as semver from 'semver'
import type { Immutable, JSONObject } from '@monorepo-private/ts--types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type MonorepoPathⳇRelative,
	PATHVARⵧROOTⵧMONOREPO,
	type NodeⳇWorkspaceLine,
	type NodeⳇPackage,
	PATHVARⵧROOTⵧWORKSPACE__LINE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'
import { manifestꓽpackageᐧjson } from '@infinite-monorepo/plugin--npm'
import { isꓽError } from '@offirmo/error-utils/v2'
import path from 'node:path'
import { lsDirsSync } from '@monorepo-private/fs--ls'

import type { ProjectManifest } from '@pnpm/types' // https://github.com/pnpm/pnpm/blob/main/core/types/src/index.ts
import { WORKSPACE_MANIFEST_FILENAME, WANTED_LOCKFILE } from '@pnpm/constants' // https://github.com/pnpm/pnpm/blob/main/core/constants/src/index.ts
import { type WorkspaceManifest } from '@pnpm/workspace.workspace-manifest-reader'
import {manifestꓽᐧgitignore, manifestꓽᐧgitattributes} from "@infinite-monorepo/plugin--git";

/////////////////////////////////////////////////

const pnpmᝍworkspaceᐧyaml__path‿ar: MonorepoPathⳇRelative = `${PATHVARⵧROOTⵧMONOREPO}/${WORKSPACE_MANIFEST_FILENAME}`
const manifestꓽpnpmᝍworkspaceᐧyaml: StructuredFsⳇFileManifest = {
	path‿ar: pnpmᝍworkspaceᐧyaml__path‿ar,
	doc: ['https://pnpm.io/settings', 'https://pnpm.io/pnpm-workspace_yaml'],
}

const ᐧpnpmfileᐧcjs__path‿ar: MonorepoPathⳇRelative = `${PATHVARⵧROOTⵧMONOREPO}/.pnpmfile.cjs`
const manifestꓽᐧpnpmfileᐧcjs: StructuredFsⳇFileManifest = {
	path‿ar: ᐧpnpmfileᐧcjs__path‿ar,
	doc: ['https://pnpm.io/pnpmfile'],
}

/////////////////////////////////////////////////

const PLUGIN_ENTRY = Symbol('pnpm')

type Spec = JSONObject

interface NodeState {
	spec: Spec
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpnpmᝍworkspaceᐧyaml)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧpnpmfileᐧcjs)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>) {
		if (node.type !== 'monorepo') return state

		node.plugin_area[PLUGIN_ENTRY] = {
			spec: {
				// strictest 2025/10
				hoist: false,
				hoistWorkspacePackages: false,
				autoInstallPeers: false,
				strictPeerDependencies: true,
				resolvePeersFromWorkspaceRoot: false,
				strictDepBuilds: true,
				preferWorkspacePackages: true, // avoid some attacks
				savePrefix: '', // safer
				saveWorkspaceProtocol: 'rolling',
				disallowWorkspaceCycles: true,
				resolutionMode: 'time-based',
				catalogMode: 'strict',
				minimumReleaseAge: 10080, // https://pnpm.io/supply-chain-security
			}
		} satisfies NodeState

		state = StateLib.requestꓽfactsⵧabout_file(
			state,
			manifestꓽpnpmᝍworkspaceᐧyaml,
			node,
			(state, result) => {
				if (!result) return state // no file = fact "not using pnpm"

				if (isꓽError(result)) {
					// file present but problem reading it
					throw result
				}

				// XXX are we using pnpm?
				//if (StateLib.getꓽpackage_manager(state).name !== 'pnpm') return


				// discover new node
				const { packages } = result
				if (packages) {
					// TODO 1D use a glob lib

					const MONOREPO_WORKSPACES_RELPATHS = (packages as string[])
						.filter((p: RelPath) => {
							return !p.startsWith('#') && !p.startsWith('xx') // we allow "commenting" a workspace to help "progressive resurrection"
						})
						.map(p => p.slice(0, -2)) // slice to remove trailing "/*"
						.sort()

					MONOREPO_WORKSPACES_RELPATHS.forEach(path_rel => {
						const line_node: NodeⳇWorkspaceLine = {
							type: 'workspace__line',
							parent_id: node.path‿abs,
							path‿ar: `${PATHVARⵧROOTⵧMONOREPO}/${path_rel}`,
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
						package_manager: 'pnpm', // TODO confirm version from file?
					},
				}
			},
		)
		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		if (StateLib.getꓽpackage_manager(state).name !== 'pnpm') return state

		switch (node?.type) {
			case 'monorepo': {

				const output_specꓽpnpmᝍworkspaceᐧyaml: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpnpmᝍworkspaceᐧyaml,
					intent: 'present--containing',
					content: {
						// strictest 2025/10
						hoist: false,
						hoistWorkspacePackages: false,
						autoInstallPeers: false,
						strictPeerDependencies: true,
						resolvePeersFromWorkspaceRoot: false,
						strictDepBuilds: true,
						preferWorkspacePackages: true, // avoid some attacks
						savePrefix: '', // safer
						saveWorkspaceProtocol: 'rolling',
						disallowWorkspaceCycles: true,
						resolutionMode: 'time-based',
						catalogMode: 'strict',
						minimumReleaseAge: 10080, // https://pnpm.io/supply-chain-security

						// https://github.com/pnpm/pnpm.io/issues/667
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽpnpmᝍworkspaceᐧyaml)

				const output_specꓽpackageᐧjson: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpackageᐧjson,
					intent: 'present--containing',
					content: {
						// TODO dynamic
						engines: {
							'pnpm': '>=10',
						},
						packageManager:
							'pnpm@10.32.1+sha512.a706938f0e89ac1456b6563eab4edf1d1faf3368d1191fc5c59790e96dc918e4456ab2e67d613de1043d2e8c81f87303e6b40d4ffeca9df15ef1ad567348f2be',
							//'pnpm@10.18.2+sha512.9fb969fa749b3ade6035e0f109f0b8a60b5d08a1a87fdf72e337da90dcc93336e2280ca4e44f2358a649b83c17959e9993e777c2080879f3801e6f0d999ad3dd',
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽpackageᐧjson)

				const output_specꓽᐧgitignore: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--pnpm`,

							'node_modules/',
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽᐧgitignore)

				const output_specꓽᐧgitattributes: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitattributes,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--pnpm`,
							`${WANTED_LOCKFILE} merge=ours`, // Merge strategy
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽᐧgitattributes)

				break
			}
			default:
				/* NO! what if graphs overlaps?
				state = StateLib.requestꓽfile_output(state, {
					parent_node: node,
					path‿ar: ᐧnvmrc__path‿ar,
					intent: 'not-present',
				})
				*/
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
export { manifestꓽpnpmᝍworkspaceᐧyaml, manifestꓽᐧpnpmfileᐧcjs }
