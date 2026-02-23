import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
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
	doc: [
		'https://git-scm.com/docs/gitignore',
		'https://www.atlassian.com/git/tutorials/saving-changes/gitignore#git-ignore-patterns',
	],
}

const ᐧgitattributes__path‿ar: RepoRelativePath = `${PATHVARⵧROOTⵧREPO}/.gitattributes`
const manifestꓽᐧgitattributes: StructuredFsⳇFileManifest = {
	path‿ar: ᐧgitattributes__path‿ar,
	format: 'text',
	doc: ['https://git-scm.com/docs/gitattributes', 'https://stackoverflow.com/a/73095814/31353119'],
}

/////////////////////////////////////////////////

const pluginꓽgit: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
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
							// generic clearly local-only
							'*.local',
							// generic clearly temp
							'tmp-*/',
							'.cache/',
							// for security: dotenv, Vercel https://nextjs.org/docs/app/guides/environment-variables#environment-variable-load-order
							'.env',
							'.env.dev',
							'.env.staging',
							'*.env.staging',
							'.env.test',
							'.env.test.local',
							'.env.prod',
							'.env.production.local',
							'.env.local',
							// for security: ?
							'.*.vars',
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			// TODO 1D any node where parent node != current node
			default:
				// NO! what if overlapping nodes?
				/*
				state = StateLib.requestꓽfile_output(state, {
					parent_node: node,
					path‿ar: ᐧgitattributes__path‿ar,
					intent: 'not-present',
				})
				*/
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default pluginꓽgit
export { manifestꓽᐧgitignore, pluginꓽgit }
