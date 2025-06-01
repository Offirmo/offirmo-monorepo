import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

import { SPEC } from './spec.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		...SPEC,

		// META
		isꓽpublic: false, // test site, no need to advertise
		host: 'cloudflare--workers',
	},
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), './output'),
	{ rm: true },
)
