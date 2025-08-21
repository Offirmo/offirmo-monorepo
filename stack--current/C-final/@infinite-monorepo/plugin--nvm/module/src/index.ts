import type { Immutable } from '@offirmo-private/ts-types'
import {
	NODE_TYPEⵧWORKSPACE,
	type Plugin,
	type StructuredFsOutput,
	type StructuredFsⳇFileManifest,
	type StructuredFsOutputⳇFullFile,
	type Node,
	type WorkspaceRelativePath,
	NODE_TYPEⵧPACKAGE,
} from '@infinite-monorepo/types'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const ᐧnvmrc__path: WorkspaceRelativePath = '$WORKSPACE_ROOT/.nvmrc'

const ᐧnvmrc__manifest: StructuredFsⳇFileManifest = {
	path‿ar: ᐧnvmrc__path,
	format: 'text',
	doc: [
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
		switch (node.type) {
			case NODE_TYPEⵧWORKSPACE:
				state = StateLib.ensureꓽfile_loading(state, node, ᐧnvmrc__path)
				break
			default:
				// don't care
				break
		}

		return state
	},

	onꓽapply(state: Immutable<StateLib.State>, node: Node) {
		const nvmrcⵧcontent: StructuredFsOutputⳇFullFile = {
			path‿abs: ᐧnvmrc__path,
			lines: ['TODO XXX'],
		}
		output.pushFile(nvmrcⵧcontent)
	},
}

/////////////////////////////////////////////////

export default PLUGIN
