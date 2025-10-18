import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type WorkspaceRelativePath,
	PATHVARⵧROOTⵧWORKSPACE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'
import { manifestꓽpackageᐧjson } from '@infinite-monorepo/plugin--npm'

/////////////////////////////////////////////////

const pnpmᝍworkspaceᐧyaml__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧWORKSPACE}/pnpm-workspace.yaml`
const manifestꓽpnpmᝍworkspaceᐧyaml: StructuredFsⳇFileManifest = {
	path‿ar: pnpmᝍworkspaceᐧyaml__path‿ar,
	doc: ['https://pnpm.io/settings', 'https://pnpm.io/pnpm-workspace_yaml'],
}

const ᐧpnpmfileᐧcjs__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧWORKSPACE}/.pnpmfile.cjs`
const manifestꓽᐧpnpmfileᐧcjs: StructuredFsⳇFileManifest = {
	path‿ar: ᐧpnpmfileᐧcjs__path‿ar,
	doc: ['https://pnpm.io/pnpmfile'],
}

/////////////////////////////////////////////////

const pluginꓽpnpm: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpnpmᝍworkspaceᐧyaml)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧpnpmfileᐧcjs)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>) {
		if (node.type !== 'workspace') return state

		state = StateLib.requestꓽfactsⵧabout_file(
			state,
			manifestꓽpnpmᝍworkspaceᐧyaml,
			node,
			(state, error, content) => {
				assert(!error) // possible?

				assert(!!content) // case not present?

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
		switch (node?.type) {
			// TODO 1D any node where parent node != current node
			case 'workspace': {
				const pnpm_config_output_spec: FileOutputPresent = {
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
					},
				}
				state = StateLib.requestꓽfile_output(state, pnpm_config_output_spec)

				const packageᐧjson_output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpackageᐧjson,
					intent: 'present--containing',
					content: {
						// TODO dynamic
						packageManager:
							'pnpm@10.18.2+sha512.9fb969fa749b3ade6035e0f109f0b8a60b5d08a1a87fdf72e337da90dcc93336e2280ca4e44f2358a649b83c17959e9993e777c2080879f3801e6f0d999ad3dd',
					},
				}
				state = StateLib.requestꓽfile_output(state, packageᐧjson_output_spec)
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

export default pluginꓽpnpm
export { manifestꓽpnpmᝍworkspaceᐧyaml, manifestꓽᐧpnpmfileᐧcjs, pluginꓽpnpm }
