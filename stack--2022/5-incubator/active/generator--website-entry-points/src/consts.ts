import { Immutable } from '@offirmo-private/ts-types'

import { Category, WebsiteEntryPointSpec } from './types.js'

/////////////////////////////////////////////////

const LIB = '@offirmo/generator--website-entry-points'

// safest possible defaults
const DEFAULT_SPEC: Immutable<WebsiteEntryPointSpec> = {
	isꓽpublic: false,

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
	DEFAULT_SPEC,
}
