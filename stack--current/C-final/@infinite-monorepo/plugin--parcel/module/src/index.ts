import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	PATHVARⵧROOTⵧNODE,
	type StructuredFsⳇFileManifest,
	type Node,
	type NodePathⳇRelative,
	type RepoPathⳇRelative,
	PATHVARⵧROOTⵧREPO,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import { manifestꓽᐧgitignore } from '@infinite-monorepo/plugin--git'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

const pluginꓽparcel: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'workspace': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing', // TODO 1D "if requested by another" (in case not using git)
					content: {
						entries: [
							// caches
							// parcel 1
							'.parcel/',
							// parcel 2
							'.parcel-cache/',
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			default:
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default pluginꓽparcel
export { pluginꓽparcel }
