import { Immutable } from '@offirmo-private/ts-types'

import { env } from 'node:process'

import { Category, WebsiteEntryPointSpec } from './types.js'

/////////////////////////////////////////////////

const LIB = '@offirmo/generator--website-entry-points'

const EOL = '\n'
const TAB = '	'

// safest possible defaults
// TODO move to selectors with ?? + assert criticals
const DEFAULT_SPEC: Immutable<WebsiteEntryPointSpec> = {
	env: env['NODE_ENV'] ?? 'dev',

	basename: 'index',
	lang: 'en',

	title: 'Hello, world!',
	app_categories: [],
	keywords: [],

	colorⵧbackground: 'white',
	colorⵧforeground: 'black',
	colorⵧtheme: 'black',

	supportsꓽscreensⵧwith_shape: false,
	hasꓽown_navigation: false,
	canꓽuse_window_controls_overlay: false,
	usesꓽpull_to_refresh: true,

	styles: [],

	wantsꓽinstall: 'partial',
}

/////////////////////////////////////////////////

export {
	LIB,
	EOL,
	TAB,
	DEFAULT_SPEC,
}
