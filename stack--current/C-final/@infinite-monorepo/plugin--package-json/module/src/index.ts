import type { Immutable } from '@monorepo-private/ts--types'
import {
	type PackagePathⳇRelative,
	type Plugin,
	type StructuredFsⳇFileManifest,
	type MonorepoPathⳇRelative,
} from '@infinite-monorepo/types-for-plugins'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

// TODO vs npm
const packageᐧjson__path: PackagePathⳇRelative = '$PACKAGE_ROOT$/package.json'
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
		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
