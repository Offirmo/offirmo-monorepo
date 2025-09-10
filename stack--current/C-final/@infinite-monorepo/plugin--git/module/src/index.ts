import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	PATHVARⵧROOTⵧNODE,
	type StructuredFsⳇFileManifest,
	type Node,
	type NodeRelativePath,
	type RepoRelativePath,
	PATHVARⵧROOTⵧREPO,
	type WorkspaceRelativePath,
	PATHVARⵧROOTⵧWORKSPACE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'

/////////////////////////////////////////////////

// about global gitignore https://gist.github.com/subfuzion/db7f57fff2fb6998a16c
const ᐧgitignore__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧWORKSPACE}/.gitignore`
const manifestꓽᐧgitignore: StructuredFsⳇFileManifest = {
	path‿ar: ᐧgitignore__path‿ar,
	format: 'list',
	doc: ['https://git-scm.com/docs/gitignore'],
}

const ᐧgitattributes__path‿ar: RepoRelativePath = `${PATHVARⵧROOTⵧREPO}/.gitattributes`
const manifestꓽᐧgitattributes: StructuredFsⳇFileManifest = {
	path‿ar: ᐧgitattributes__path‿ar,
	format: 'text',
	doc: ['https://git-scm.com/docs/gitattributes'],
}

/////////////////////////////////////////////////

const pluginꓽgit: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
		// TODO 1D gitignore

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'repository': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitattributes,
					intent: 'present--exact',
					content: {
						// TODO
						text: `* text=auto eol=lf`,
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			case 'workspace': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing',
					content: {
						entries: [
							// each plugin is free to add their own entries, we don't cargo cult a huge list
							'node_modules/',
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			// TODO 1D any node where parent node != current node
			default:
				state = StateLib.requestꓽfile_output(state, {
					parent_node: node,
					path‿ar: ᐧgitattributes__path‿ar,
					intent: 'not-present',
				})
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default pluginꓽgit
export { manifestꓽᐧgitignore, pluginꓽgit }
