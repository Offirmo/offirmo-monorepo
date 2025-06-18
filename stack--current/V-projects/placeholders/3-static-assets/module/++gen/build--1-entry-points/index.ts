import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

import { SPEC } from './spec.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,

		// META
		isꓽpublic: true,
		host: 'cloudflare--workers',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src/public'),
	{ rm: true },
)
