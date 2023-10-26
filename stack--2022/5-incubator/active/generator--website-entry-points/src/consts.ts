import { Immutable } from '@offirmo-private/ts-types'

import { Category, WebsiteEntryPointSpec } from './types.js'

/////////////////////////////////////////////////

const LIB = '@offirmo/generator--website-entry-points'

const DEFAULT_SPEC: Immutable<WebsiteEntryPointSpec> = {
	basename: 'index',
	lang: 'en',

	title: 'Hello, world!',
	//description: 'A hello world webpage',
	app_categories: [],
	keywords: [],

	colorⵧbackground: 'white',
	colorⵧforeground: 'black',
	colorⵧtheme: 'black',

	semanticⳇisꓽpwa: false,
}

/////////////////////////////////////////////////

export {
	LIB,
	DEFAULT_SPEC,
}
