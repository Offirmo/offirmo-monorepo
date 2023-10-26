import { Immutable } from '@offirmo-private/ts-types'
import { PositiveIntegerInRange, RealInRange, Charset, CssColor } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////
// spec'ced types

// 1. already defined in Typescript "dom" lib
// CSSNumericType
// CSSStyleSheetInit
// FontFaceDescriptors
// FontFaceSet
// FontFaceSource
// FullscreenOptions
// ImportMeta
// PaymentCurrencyAmount
// PropertyDefinition
// SecurityPolicyViolationEventDisposition
// ShadowRootInit

// 2. manual definitions

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
interface HtmlMetaContentⳇContentSecurityPolicy {
	// TODO
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag
// See also https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
interface HtmlMetaContentⳇViewport {
	width?: 'device-width' | PositiveIntegerInRange<1, 10_000>
	height?: 'device-height' | PositiveIntegerInRange<1, 10_000>
	'initial-scale'?: RealInRange<0.1, 10>
	'minimum-scale'?: RealInRange<0.1, 10>
	'maximum-scale'?: RealInRange<0.1, 10>
	'user-scalable'?: 0 |  1 | 'yes' | 'no' // ignored by Safari mobile and nearly all other mobile browser. However will work if installed PWA

	'viewport-fit'?:
		// https://drafts.csswg.org/css-round-display/?ref=stephenradford.me#viewport-fit-descriptor
		| 'auto'    // [DEFAULT] safest
		| 'contain' // visual viewport set to the largest rectangle which is inscribed in the display of the device
		| 'cover'   // layout viewport and visual viewport are set to the circumscribed rectangle of the display of the device.

	// 2022 https://developer.chrome.com/blog/viewport-resize-behavior/
	// how to react to for ex. virtual keyboard open
	'interactive-widget'?:
		| 'resizes-visual'   // [DEFAULT] Resize only the Visual Viewport but not the Layout Viewport
		| 'resizes-content'  // Resize both the Visual Viewport and Layout Viewport
		| 'overlays-content' // Do not resize any viewport
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name
// TODO more from huge list https://wiki.whatwg.org/wiki/MetaExtensions
interface HtmlMetas {

	// <meta charset="utf-8" />
	charset: Charset


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

/////////////////////////////////////////////////

type HtmlString = string

/////////////////////////////////////////////////

export {
	type HtmlMetaContentⳇContentSecurityPolicy,
	type HtmlMetaContentⳇViewport,
	type HtmlMetas,

	type HtmlString,
}
