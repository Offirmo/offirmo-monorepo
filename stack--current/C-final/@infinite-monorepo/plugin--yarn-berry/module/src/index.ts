import type { Immutable } from '@monorepo-private/ts--types'
import {
	type Plugin,
	type StructuredFsⳇFileManifest,
	type WorkspaceRelativePath,
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
}

/////////////////////////////////////////////////

export default PLUGIN
