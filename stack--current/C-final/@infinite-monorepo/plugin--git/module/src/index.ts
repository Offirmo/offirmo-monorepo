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

/////////////////////////////////////////////////

// about global gitignore https://gist.github.com/subfuzion/db7f57fff2fb6998a16c
const ᐧgitignore__path‿ar: NodePathⳇRelative = `${PATHVARⵧROOTⵧNODE}/.gitignore`
const manifestꓽᐧgitignore: StructuredFsⳇFileManifest = {
	path‿ar: ᐧgitignore__path‿ar,
	doc: [
		'https://git-scm.com/docs/gitignore',
		'https://www.atlassian.com/git/tutorials/saving-changes/gitignore#git-ignore-patterns',
	],
}

const ᐧgitattributes__path‿ar: NodePathⳇRelative = `${PATHVARⵧROOTⵧNODE}/.gitattributes`
const manifestꓽᐧgitattributes: StructuredFsⳇFileManifest = {
	path‿ar: ᐧgitattributes__path‿ar,
	doc: ['https://git-scm.com/docs/gitattributes', 'https://stackoverflow.com/a/73095814/31353119'],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitignore)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'repository': {
				const output_specꓽᐧgitattributes: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitattributes,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--git`,
							`## https://nesbitt.io/2026/02/05/git-magic-files.html`,
							`* text=auto eol=lf`, // ## Line ending normalization
							`*.png binary`, // Treat as binary
							`*.json diff=json`, // improved diff driver
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽᐧgitattributes)
				break
			}
			case 'monorepo': {
				const output_specꓽᐧgitignore: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing',
					content: {
						entries: [
							// IMPORTANT: we don't cargo cult a huge list
							// - up to each plugin to add their own entries
							// - OS-dependent files (ex. .DS_Store) should be in the user's gitignore

							`## https://www.atlassian.com/git/tutorials/saving-changes/gitignore#git-ignore-patterns`,
							`## contains auto-generated content from @infinite-monorepo/plugin--git`,

							// we target js and it's a standard
							'node_modules/',

							// generic clearly local-only
							'*.local',
							'*local.*', // ex. Claude settings.local.json

							// generic clearly temporary
							'tmp/',
							'tmp-*/',

							// generic clearly cache
							'.cache/',

							// "should I commit my env files? no" https://github.com/motdotla/dotenv?tab=readme-ov-file#faq
							// dotenv https://github.com/motdotla/dotenv
							'.env',
							'.env.*',
							// ??
							'*.vars',

							// generic logs
							`*.log`,
							`logs/`,

							// built
							'dist/',

							// security: source maps, if leaked, allow regenerating the original source code (cf. 2026/04/01 Claude code leak)
							`*.map`,
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
							`## contains auto-generated content from @infinite-monorepo/plugin--git`,
							`## https://nesbitt.io/2026/02/05/git-magic-files.html`,
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽᐧgitattributes)

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

export default PLUGIN
export { manifestꓽᐧgitignore, manifestꓽᐧgitattributes }
