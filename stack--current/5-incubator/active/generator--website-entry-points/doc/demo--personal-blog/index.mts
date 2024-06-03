#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

import { SPEC } from '../../src/__specs/__fixtures/specs--blog--personal.js'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,
		host: 'cloudflare-pages',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
	{rm: true},
)
