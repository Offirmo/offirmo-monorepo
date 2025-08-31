import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	NODE_TYPEⵧWORKSPACE,
	PATHVARⵧROOTⵧANY,
	type Plugin,
	type StructuredFsOutput,
	type StructuredFsⳇFileManifest,
	type StructuredFsOutputⳇFullFile,
	type Node,
	type NodeRelativePath,
} from '@infinite-monorepo/types'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const ᐧnvmrc__path: NodeRelativePath = `${PATHVARⵧROOTⵧANY}/.nvmrc`

const ᐧnvmrc__manifest: StructuredFsⳇFileManifest = {
	path‿ar: ᐧnvmrc__path,
	format: 'text',
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

const PLUGIN: Plugin = {

	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		state = StateLib.declareꓽfile_manifest(state, ᐧnvmrc__manifest)

		return state
	},

	onꓽnodeⵧdiscovered(
		state: Immutable<StateLib.State>,
		node: Immutable<Node>,
	): Immutable<StateLib.State> {

		// TODO 1D
		//state = StateLib.ensureꓽfile_loading(state, node, ᐧnvmrc__path)

		return state
	},

	onꓽapply(state: Immutable<StateLib.State>, node: Immutable<Node>) {
		const runtimeⵧlocal = StateLib.getꓽruntimeⵧlocal(state, node)

		if (runtimeⵧlocal.name !== 'node')
			return state // nvm doesn't apply

		switch (node.type) {
			// TODO 1D any node where parent node != current node
			case 'workspace':
				state = StateLib.requestꓽfile_output(state, {
					manifest: ᐧnvmrc__manifest,
					path: ᐧnvmrc__path,
					mode: 'replace',
					content: {
						value: semver.major(runtimeⵧlocal.versionsⵧacceptable)
					}
				})
				return state
			default:
				state = StateLib.requestꓽfile_output(state, {
					manifest: ᐧnvmrc__manifest,
					path: ᐧnvmrc__path,
					mode: 'delete',
				})
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
