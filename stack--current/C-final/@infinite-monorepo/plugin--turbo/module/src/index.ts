import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	PATHVARⵧROOTⵧNODE,
	type StructuredFsⳇFileManifest,
	type Node,
	type NodePathⳇRelative,
	type RepoPathⳇRelative,
	PATHVARⵧROOTⵧREPO,
	type MonorepoPathⳇRelative,
	PATHVARⵧROOTⵧMONOREPO,
} from '@infinite-monorepo/types-for-plugins'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import { manifestꓽᐧgitignore } from '@infinite-monorepo/plugin--git'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'monorepo': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--turbo`,
							`.turbo/`,
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

export default PLUGIN
//export { PLUGIN }
