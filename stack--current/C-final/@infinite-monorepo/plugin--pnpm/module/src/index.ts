import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type NodeRelativePath,
	type RepoRelativePath,
	type WorkspaceRelativePath,
	PATHVARⵧROOTⵧPACKAGE, PATHVARⵧROOTⵧWORKSPACE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

const pnpmᝍworkspaceᐧyaml__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧWORKSPACE}/pnpm-workspace.yaml`
const manifestꓽpnpmᝍworkspaceᐧyaml: StructuredFsⳇFileManifest = {
	path‿ar: pnpmᝍworkspaceᐧyaml__path‿ar,
	doc: [
		'https://pnpm.io/settings',
		'https://pnpm.io/pnpm-workspace_yaml'
	],
}

const ᐧpnpmfileᐧcjs__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧWORKSPACE}/.pnpmfile.cjs`
const manifestꓽᐧpnpmfileᐧcjs: StructuredFsⳇFileManifest = {
	path‿ar: ᐧpnpmfileᐧcjs__path‿ar,
	doc: [
		'https://pnpm.io/pnpmfile',
	],
}

/////////////////////////////////////////////////

const pluginꓽnpm: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpnpmᝍworkspaceᐧyaml)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧpnpmfileᐧcjs)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			// TODO 1D any node where parent node != current node
			case 'workspace': {
				const output_spec: FileOutputPresent = {
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
				state = StateLib.requestꓽfile_output(state, output_spec)
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

export default pluginꓽnpm
export {
	manifestꓽpnpmᝍworkspaceᐧyaml,
	manifestꓽᐧpnpmfileᐧcjs,
	pluginꓽnpm,
}
