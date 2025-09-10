import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	PATHVARⵧROOTⵧNODE,
	type StructuredFsⳇFileManifest,
	type Node,
	type NodeRelativePath,
} from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent } from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const ᐧnvmrc__path‿ar: NodeRelativePath = `${PATHVARⵧROOTⵧNODE}/.nvmrc`

const manifestꓽᐧnvmrc: StructuredFsⳇFileManifest = {
	path‿ar: ᐧnvmrc__path‿ar,
	format: 'single-value',
	doc: [
		/* Note: <version> refers to any version-like string nvm understands. This includes:
			- full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
			- default (built-in) aliases: node, stable, unstable, iojs, system
			- custom aliases you define with `nvm alias foo`
		 */
		'https://github.com/nvm-sh/nvm?tab=readme-ov-file#nvmrc',
		'https://www.npmjs.com/package/nvmrc',
	],
}

/////////////////////////////////////////////////

const pluginꓽnvm: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧnvmrc)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
		// TODO 1D
		//state = StateLib.ensureꓽfile_loading(state, node, ᐧnvmrc__path‿ar)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		const runtimeⵧlocal = StateLib.getꓽruntimeⵧlocal(state, node)
		if (runtimeⵧlocal.name !== 'node') return state // nvm doesn't apply

		const vmin = semver.minVersion(runtimeⵧlocal.versionsⵧacceptable)
		const major = semver.major(vmin)
		switch (node?.type) {
			// TODO 1D any node where parent node != current node
			case 'workspace': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧnvmrc,
					intent: 'present--exact',
					content: {
						value: major,
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			default:
				state = StateLib.requestꓽfile_output(state, {
					parent_node: node,
					path‿ar: ᐧnvmrc__path‿ar,
					intent: 'not-present',
				})
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default pluginꓽnvm
export { manifestꓽᐧnvmrc, pluginꓽnvm }
