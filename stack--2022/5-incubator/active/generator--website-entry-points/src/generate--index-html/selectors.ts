import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import { LIB } from '../consts.js'
import {
	prefersꓽorientation,
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset,
	isꓽuser_scalable,
	supportsꓽscreensⵧwith_shape,
	wantsꓽinstall,
} from '../selectors.js'
import {
	ifꓽdebug
} from '../utils.js'
import { HtmlMetaContentⳇContentSecurityPolicy, HtmlMetaContentⳇViewport, HtmlMetas } from './types.js'


/////////////////////////////////////////////////

function _getꓽmetasⵧviewport(spec: Immutable<WebsiteEntryPointSpec>): HtmlMetaContentⳇViewport {
	return {
		// which site is not mobile friendly those day?
		// and those who are not are obviously NOT using this tool ;)
		width: 'device-width',
		//height: 'device-height', NO this seems to be a default, no site use it
		'initial-scale': 1,

		// scalability
		// - either we explicitely don't want it
		// - or/and we support orientation change and if we don't lock the scale, the viewport doesn't fit on orientation change (cf. https://stackoverflow.com/a/12114397)
		// hence we're not afraid to lock user scaling
		...((!prefersꓽorientation(spec) || !isꓽuser_scalable(spec)) && {
			'user-scalable': 'no',
			'minimum-scale': 1,
			'maximum-scale': 1,
		}),

		'viewport-fit': supportsꓽscreensⵧwith_shape(spec) ? 'cover' : 'contain',

		// TODO 'interactive-widget'
	}
}

function getꓽmetas(spec: Immutable<WebsiteEntryPointSpec>): HtmlMetas {

	const result: HtmlMetas = {
		charset: getꓽcharset(spec),

		// document-level metadata
		// <meta name="<KEY>" content="<VALUE>">
		document: {
			viewport: _getꓽmetasⵧviewport(spec),


			...(wantsꓽinstall(spec) && {
				'apple-mobile-web-app-capable': 'yes',
				'apple-mobile-web-app-status-bar-style': supportsꓽscreensⵧwith_shape(spec)
					? 'black-translucent'
					: 'black',
			}),

			'format-detection': 'telephone=no', // TODO
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
			//TODO Open Graph & co

		},

		itemprops: {},
	}

	return result
}

/////////////////////////////////////////////////

export {
	getꓽmetas,
}