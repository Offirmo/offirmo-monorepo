#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

import { SPEC } from '../../src/__fixtures/specs--game--tbrpg/index.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,
		host: 'netlify',
		generatesꓽjsⵧscaffold: 'offirmo--react',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
	{rm: true},
)
