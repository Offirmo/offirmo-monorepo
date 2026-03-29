import type { Immutable } from '@monorepo-private/ts--types'
import {
	type Plugin,
	type StructuredFsⳇFileManifest,
	type MonorepoPathⳇRelative,
} from '@infinite-monorepo/types'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const READMEᐧmd__path‿ar: MonorepoPathⳇRelative = '$WORKSPACE_ROOT/README.md'

const READMEᐧmd__manifest: StructuredFsⳇFileManifest = {
	path‿ar: READMEᐧmd__path‿ar,
	//format: 'text',
	doc: [
		'https://openchangelog.com/blog/changelog-md',
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		state = StateLib.declareꓽfile_manifest(state, READMEᐧmd__manifest)

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
