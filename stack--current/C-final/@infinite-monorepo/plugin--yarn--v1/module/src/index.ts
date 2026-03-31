// TODO
import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type NodePathⳇRelative,
	type RepoPathⳇRelative,
	type MonorepoPathⳇRelative,
	PATHVARⵧROOTⵧPACKAGE, PATHVARⵧROOTⵧMONOREPO,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'
import {manifestꓽᐧgitattributes, manifestꓽᐧgitignore} from '@infinite-monorepo/plugin--git'
import {manifestꓽpackageᐧjson} from '@infinite-monorepo/plugin--npm'

/////////////////////////////////////////////////

const yarnᝍlockᐧjson__path‿ar: MonorepoPathⳇRelative = `${PATHVARⵧROOTⵧMONOREPO}/yarn-lock.json`
const manifestꓽyarnᝍlockᐧjson: StructuredFsⳇFileManifest = {
	path‿ar: yarnᝍlockᐧjson__path‿ar,
	doc: [
		// TODO
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽyarnᝍlockᐧjson)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		if (StateLib.getꓽpackage_manager(state).name !== 'yarn'
	&& StateLib.getꓽpackage_manager(state).name !== 'bolt') return state

		switch (node?.type) {
			case 'monorepo': {
				const output_specꓽpackageᐧjson: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpackageᐧjson,
					intent: 'present--containing',
					content: {
						// https://docs.npmjs.com/cli/v11/configuring-npm/package-json
						engines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
							'yarn': '^1',
						},

						devEngines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines
							packageManager: {
								name: 'yarn',
								onFail: "error"
							}
						},
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽpackageᐧjson)

				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitattributes,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--yarn--v1`,
							`yarn-lock.json merge=ours`, // Merge strategy
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
