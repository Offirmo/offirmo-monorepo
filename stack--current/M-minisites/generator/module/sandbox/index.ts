#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

import { SPEC } from './generate-entry-points/index.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,
		host: 'github-pages',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '~~output'),
	{rm: true},
)
