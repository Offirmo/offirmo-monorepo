#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@offirmo-private/generator--website-entry-points'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints({
		// nothing
	} as any,
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
	{rm: true},
)
