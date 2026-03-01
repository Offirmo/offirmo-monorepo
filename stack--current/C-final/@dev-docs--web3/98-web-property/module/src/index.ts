import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url)) // TODO favicon?

import { type Contentⳇweb, PRESETꘌblog, type WebPropertyEntryPointSpec } from '@monorepo-private/generator--website-entry-points'

import { WEBSITE } from '@dev-docs--web3/marketing'

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,
	//...PRESETꘌblog,

	/////// content
	content: {
		html: [ 'Loading...'], // opt out of default content
		js: [`
import { start } from '@dev-docs--web3/web-core'
start()
`]
	},

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
