import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import type { WebPropertyEntryPointSpec } from '@offirmo-private/generator--website-entry-points'

import { WEBSITE } from '@devdocs/marketing'

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	preset: 'blog',

	/////// PWA
	// TODO refine

	/////// SRC
	// TODO refine

	/////// META
	isꓽpublic: true,
	isꓽdebug: false,
}

/////////////////////////////////////////////////

export { SPEC }
