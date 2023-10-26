import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlMetaContentⳇContentSecurityPolicy, HtmlMetaContentⳇViewport, HtmlMetas, HtmlString } from './types'

/////////////////////////////////////////////////

function getꓽmetas(spec: Immutable<WebsiteEntryPointSpec>): HtmlMetas {

	const result: HtmlMetas = {
		charset: getꓽcha


		// document-level metadata
		// <meta name="<KEY>" content="<VALUE>">
		document: {

				viewport: HtmlMetaContentⳇViewport

				// https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
				'apple-mobile-web-app-capable'?: 'yes'
				'apple-mobile-web-app-status-bar-style'?:
			// see also https://medium.com/appscope/changing-the-ios-status-bar-of-your-progressive-web-app-9fc8fbe8e6ab
			| 'default' // the status bar appears normal                     → the web content is displayed below the status bar
			| 'black' // the status bar has a black background               →  the web content is displayed below the status bar
			| 'black-translucent' // the status bar is black and translucent → the web content is displayed on the entire screen, partially obscured by the status bar
		'format-detection'?: 'telephone=no'
	}

	// pragma directives, equivalent to http headers
	// <meta http-equiv="<KEY>" content="<VALUE>" />
	pragmas: {
		'content-security-policy'?: HtmlMetaContentⳇContentSecurityPolicy
		'content-type': string
		refresh?: unknown
		'application-name'?: unknown
		author?: unknown
		description: unknown
		generator: string
		keywords: string[]
		referrer?: 'no-referrer'
			| 'origin'
			| 'no-referrer-when-downgrade'
			| 'origin-when-cross-origin'
			| 'same-origin'
			| 'strict-origin'
			| 'strict-origin-when-cross-origin'
			| 'unsafe-URL',
			'theme-color': CssColor
		'color-scheme'?: unknown
	}

	// <meta property="<KEY>" content="<VALUE>"/>
	properties: {

	}

	// If the itemprop attribute is set, the <meta> element provides user-defined metadata.
	itemprops: {

	}
	}
}

/////////////////////////////////////////////////

export {
	getꓽmetas,
}
