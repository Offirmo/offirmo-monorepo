
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@monorepo-private/generator--website-entry-points'

import { SPEC } from './spec/index.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,
		host: 'github-pages',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'output'),
	{rm: true},
)
