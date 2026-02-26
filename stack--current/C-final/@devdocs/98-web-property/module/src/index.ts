import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url)) // TODO favicon?

import { PRESETꘌblog, type WebPropertyEntryPointSpec } from '@monorepo-private/generator--website-entry-points'

import { WEBSITE } from '@devdocs/marketing'

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,
	//...PRESETꘌblog,

	/////// SPA
	isꓽcatching_all_routes: true,

	/////// PWA

	/////// SRC
	host: 'cloudflare--workers',

	/////// META
	env: 'prod',
	isꓽpublic: true,
	isꓽdebug: false,
}

/////////////////////////////////////////////////

export { SPEC }
