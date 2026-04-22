import { type WebPropertyEntryPointSpec } from '@monorepo-private/generator--website-entry-points'

import { WEBSITE } from '@digital-hoarder/marketing'

/////////////////////////////////////////////////
const SPEC: WebPropertyEntryPointSpec = {
	...WEBSITE,

	/////// content
	content: {
		html: [ 'Loading...'], // opt out of default content
		js: [`import './index.tsx'`]
	},

	/////// SPA
	isꓽcatching_all_routes: true,

	/////// PWA

	/////// SRC
	host: 'github-pages',

	/////// META
	env: 'prod',
	isꓽpublic: true,
	isꓽdebug: false,
}

/////////////////////////////////////////////////

export { SPEC }
