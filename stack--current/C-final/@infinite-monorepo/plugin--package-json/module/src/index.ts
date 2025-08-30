import type { Immutable } from '@offirmo-private/ts-types'
import {
	type PackageRelativePath,
	type Plugin,
	type StructuredFsⳇFileManifest,
	type WorkspaceRelativePath,
} from '@infinite-monorepo/types'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

const packageᐧjson__path: PackageRelativePath = '$PACKAGE_ROOT$/package.json'
const packageᐧjson__manifest: StructuredFsⳇFileManifest = {
	path‿ar: packageᐧjson__path,
	format: 'json',
	$schema: 'https://www.schemastore.org/package.json',
	doc: [
		'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
		'https://docs.npmjs.com/cli/v11/using-npm/package-spec',
		'https://docs.npmjs.com/cli/v11/using-npm/scripts',
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		state = StateLib.declareꓽfile_manifest(state, packageᐧjson__manifest)
		state = StateLib.declareꓽfile_manifest(state, {
			...packageᐧjson__manifest,
			path‿ar: '$WORKSPACE_ROOT$/package.json',
		})

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
