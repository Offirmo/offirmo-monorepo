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
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const AGENTSᐧmd__path‿ar: NodePathⳇRelative = `${PATHVARⵧROOTⵧNODE}/AGENTS.md`
const manifestꓽAGENTSᐧmd: StructuredFsⳇFileManifest = {
	path‿ar: AGENTSᐧmd__path‿ar,
	doc: [
		'https://agents.md/'
	],
}
const CLAUDEᐧmd__path‿ar: NodePathⳇRelative = `${PATHVARⵧROOTⵧNODE}/.claude/CLAUDE.md`
const manifestꓽCLAUDEᐧmd: StructuredFsⳇFileManifest = {
	path‿ar: CLAUDEᐧmd__path‿ar,
	doc: [
		'https://claude.md/',
		'https://code.claude.com/docs/en/memory',
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽAGENTSᐧmd)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽCLAUDEᐧmd)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'repository':
			case 'monorepo': {
				const output_spec1: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽAGENTSᐧmd,
					intent: 'present--containing',
					content: {
						text: 'TODO AGENTS.md'
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec1)

				const output_spec2: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽCLAUDEᐧmd,
					intent: 'present--containing',
					content: {
						text: 'Read the [AGENTS.md](../AGENTS.md) file.'
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec2)
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
//export {  }
