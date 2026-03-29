import * as semver from 'semver'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type NodePathⳇRelative,
	type RepoPathⳇRelative,
	type MonorepoPathⳇRelative,
	PATHVARⵧROOTⵧPACKAGE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'
import {manifestꓽᐧgitattributes, manifestꓽᐧgitignore} from '@infinite-monorepo/plugin--git'

/////////////////////////////////////////////////

const packageᐧjson__path‿ar: MonorepoPathⳇRelative = `${PATHVARⵧROOTⵧPACKAGE}/package.json`
const manifestꓽpackageᐧjson: StructuredFsⳇFileManifest = {
	path‿ar: packageᐧjson__path‿ar,
	doc: [
		'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
		'https://docs.npmjs.com/about-packages-and-modules',
	],
}

const packageᝍlockᐧjson__path‿ar: MonorepoPathⳇRelative = `${PATHVARⵧROOTⵧPACKAGE}/package-lock.json`
const manifestꓽpackageᝍlockᐧjson: StructuredFsⳇFileManifest = {
	path‿ar: packageᝍlockᐧjson__path‿ar,
	doc: [
		'https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json',
		'https://docs.npmjs.com/about-packages-and-modules',
	],
}

// TODO config if actually using npm https://docs.npmjs.com/cli/v11/using-npm/config#engine-strict

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᝍlockᐧjson)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧgitattributes)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		if (StateLib.getꓽpackage_manager(state).name !== 'npm') return state

		switch (node?.type) {
			case 'repository': {
					const output_spec: FileOutputPresent = {
						parent_node: node,
						manifest: manifestꓽᐧgitattributes,
						intent: 'present--containing',
						content: {
							entries: [
								`## contains auto-generated content from @infinite-monorepo/plugin--npm`,
								`package-lock.json merge=ours`, // Merge strategy
							],
						},
					}
					state = StateLib.requestꓽfile_output(state, output_spec)
					break
				}
			case 'monorepo': {
				const runtimeⵧlocal = StateLib.getꓽruntimeⵧlocal(state, node)
				const runtimeⵧlocal__selector = (() => {
					const vmin‿obj = semver.minVersion(runtimeⵧlocal.versionsⵧacceptable)
					assert(!!vmin‿obj, 'semver issue')

					const relevant = [vmin‿obj.major, vmin‿obj.minor, vmin‿obj.minor]
					while (relevant.at(-1) === 0) {
						relevant.pop()
					}
					// examples features a ~^>= https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
					// HOWEVER not having a prefix helps other tools to parse it more easily
					return `${relevant.join('.')}`
				})()

				const package_manager = StateLib.getꓽpackage_manager(state, node)
				const package_manager__selector = (() => {
					const vmin‿obj = semver.minVersion(package_manager.versionsⵧacceptable)
					assert(!!vmin‿obj, 'semver issue')

					const relevant = [vmin‿obj.major, vmin‿obj.minor, vmin‿obj.minor]
					while (relevant.at(-1) === 0) {
						relevant.pop()
					}
					// examples features a ~^>= https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
					// HOWEVER not having a prefix helps other tools to parse it more easily
					return `${relevant.join('.')}`
				})()

				const output_specꓽpackageᐧjson: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpackageᐧjson,
					intent: 'present--containing',
					content: {
						// https://docs.npmjs.com/cli/v11/configuring-npm/package-json
						name: `${state.spec.namespace}/monorepo`,
						version: '0.0.0',
						private: true, // why would we publish the workspace root?
						//sideEffects: false,
						type: 'module', // we're modern!
						engines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
							[runtimeⵧlocal.name]: runtimeⵧlocal__selector,
							[package_manager.name]: package_manager__selector,
						},

						devEngines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines
							runtime: {
								name: 'node',
								onFail: 'error',
							},
							packageManager: {
								name: package_manager.name,
								onFail: "error"
							}
						},
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽpackageᐧjson)

				const output_specꓽᐧgitignore: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧgitignore,
					intent: 'present--containing',
					content: {
						entries: [
							`## contains auto-generated content from @infinite-monorepo/plugin--npm`,

							'node_modules/',
						],
					},
				}
				state = StateLib.requestꓽfile_output(state, output_specꓽᐧgitignore)
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
export { manifestꓽpackageᐧjson, manifestꓽpackageᝍlockᐧjson }
