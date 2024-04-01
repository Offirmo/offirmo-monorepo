#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints, { type WebPropertyEntryPointSpec } from '@offirmo-private/generator--website-entry-points'

import { SPEC as _SPEC } from '@offirmo-private/generator--website-entry-points/tbrpg'

/////////////////////////////////////////////////

const SPEC: WebPropertyEntryPointSpec = {
	..._SPEC,
	host: 'netlify',
	content: {
		..._SPEC.content,
		js: [ ...(_SPEC.content.js ?? []), `import '../index.ts'`]
	}
}

await generateꓽwebsiteᝍentryᝍpoints(
	SPEC,
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../entry-points'),
	//{rm: true},
)
