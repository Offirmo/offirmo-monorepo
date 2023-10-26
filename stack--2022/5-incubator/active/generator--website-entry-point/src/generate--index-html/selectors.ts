import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import { LIB } from '../consts.js'
import {
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset
} from '../selectors.js'
import { HtmlMetaContentⳇContentSecurityPolicy, HtmlMetaContentⳇViewport, HtmlMetas } from './types.js'
import { DEFAULT_VIEWPORT_META } from './consts.js'

/////////////////////////////////////////////////

function getꓽmetas(spec: Immutable<WebsiteEntryPointSpec>): HtmlMetas {

	const result: HtmlMetas = {
		charset: getꓽcharset(spec),

		// document-level metadata
		// <meta name="<KEY>" content="<VALUE>">
		document: {
				viewport: {
					...DEFAULT_VIEWPORT_META
				},
		},

		// pragma directives, equivalent to http headers
		// <meta http-equiv="<KEY>" content="<VALUE>" />
		pragmas: {
			'content-security-policy': {},
			'content-type': `text/html;charset=${getꓽcharset(spec)}`,
			'content-language': getꓽlang(spec),

			//description: unknown
			generator: LIB,
			keywords: [],

			// TODO only if explicit?
			'theme-color': getꓽcolorⵧtheme(spec),
		},

		// <meta property="<KEY>" content="<VALUE>"/>
		properties: {

		},

		itemprops: {},
	}

	return result
}

/////////////////////////////////////////////////

export {
	getꓽmetas,
}
