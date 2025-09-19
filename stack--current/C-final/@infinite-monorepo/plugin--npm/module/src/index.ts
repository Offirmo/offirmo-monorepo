import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	type StructuredFsⳇFileManifest,
	type Node,
	type NodeRelativePath,
	type RepoRelativePath,
	type WorkspaceRelativePath,
	PATHVARⵧROOTⵧPACKAGE,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

const packageᐧjson__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧPACKAGE}/package.json`
const manifestꓽpackageᐧjson: StructuredFsⳇFileManifest = {
	path‿ar: packageᐧjson__path‿ar,
	doc: [
		'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
		'https://docs.npmjs.com/about-packages-and-modules',
	],
}

const packageᝍlockᐧjson__path‿ar: WorkspaceRelativePath = `${PATHVARⵧROOTⵧPACKAGE}/package-lock.json`
const manifestꓽpackageᝍlockᐧjson: StructuredFsⳇFileManifest = {
	path‿ar: packageᝍlockᐧjson__path‿ar,
	doc: [
		'https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json',
		'https://docs.npmjs.com/about-packages-and-modules',
	],
}

// TODO config if actually using npm https://docs.npmjs.com/cli/v11/using-npm/config#engine-strict

/////////////////////////////////////////////////

const pluginꓽnpm: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᝍlockᐧjson)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			// TODO 1D any node where parent node != current node
			case 'workspace': {
				const runtimeⵧlocal = StateLib.getꓽruntimeⵧlocal(state, node)

				const vmin‿obj = semver.minVersion(runtimeⵧlocal.versionsⵧacceptable)
				assert(!!vmin‿obj, 'semver issue')

				const relevant = [vmin‿obj.major, vmin‿obj.minor, vmin‿obj.minor]
				while (relevant.at(-1) === 0) {
					relevant.pop()
				}
				// examples features a ~^>= https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
				// HOWEVER not having a prefix helps other tools to parse it more easily
				const selector = `${relevant.join('.')}`

				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽpackageᐧjson,
					intent: 'present--containing',
					content: {
						// https://docs.npmjs.com/cli/v11/configuring-npm/package-json

						private: true, // why would we publish the workspace root?
						engines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
							[runtimeⵧlocal.name]: selector,
						},

						devEngines: {
							// https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines
							runtime: {
								name: 'node',
								onFail: 'error',
							},
							/* TODO
							"packageManager": {
								"name": "npm",
								"onFail": "error"
							}*/
						},
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
export { manifestꓽpackageᐧjson, manifestꓽpackageᝍlockᐧjson, pluginꓽnpm }
