import { Immutable } from '@offirmo-private/ts-types'
import { Emoji, Basename, CssColor, IETFLanguageType, PositiveIntegerInRange, RealInRange, Charset } from '@offirmo-private/ts-types'
import { HtmlString } from './generate--index-html/types'

/////////////////////////////////////////////////

// https://github.com/w3c/manifest/wiki/Categories
// https://developer.mozilla.org/en-US/docs/Web/Manifest/categories
// MUST be lc
// TODO copy them in keywords
type Category =
	| 'books'
	| 'business'
	| 'education'
	| 'entertainment'
	| 'finance'
	| 'fitness'
	| 'food'
	| 'games'
	| 'government'
	| 'health'
	| 'kids'
	| 'lifestyle'
	| 'magazines'
	| 'medical'
	| 'music'
	| 'navigation'
	| 'news'
	| 'personalization'
	| 'photo'
	| 'politics'
	| 'productivity'
	| 'security'
	| 'shopping'
	| 'social'
	| 'sports'
	| 'travel'
	| 'utilities'
	| 'weather'

// https://developer.mozilla.org/en-US/docs/Web/Manifest/display#values
type DisplayMode =
	| 'fullscreen' // All the available display area is used and no user agent chrome is shown.
	| 'standalone' // The application will look and feel like a standalone application (...) but can include other UI elements such as a status bar.
	| 'minimal-ui' // The application will look and feel like a standalone application, but will have a minimal set of UI elements for controlling navigation.
	| 'browser'    // XXX this is the default, setting it explicitly can prevent the app from being installable! cf. https://web.dev/articles/install-criteria

// https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override#values
type DisplayOverrideMode = DisplayMode | 'window-controls-overlay'


interface WebsiteEntryPointSpec {
	// must be flat for easy defaulting
	// optional '?:' = truly optional (can be easily derived)

	env?: 'prod' | 'production' | string // default to env.NODE_ENV ?? dev
	isꓽpublic?: boolean // default: true if prod, false else
	preset?: 'game' | 'landing--app' // TODO

	basename?: Basename // without extension. default to "index"

	lang?: IETFLanguageType // default to en

	title: string
	titleⵧsocial?: string
	titleⵧapp?: string
	favicon?: Emoji // TODO extend

	description?: string // displayed by google search, very useful for SEO
	descriptionⵧsocial?: string
	descriptionⵧapp?: string

	app_categories?: Category[]
	keywords?: string[]

	// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors
	// +++ https://css-tricks.com/meta-theme-color-and-trickery/
	//   should not be too close to the "traffic light buttons"
	// from: https://web.dev/learn/pwa/web-app-manifest/#recommended_fields
	//   Warning: Do not use transparency, CSS variables, gradient functions, or color functions with transparency (such as rgba())
	//   as they are not supported by most browsers. You will get inconsistent results.
	colorⵧbackground?: CssColor
	colorⵧforeground?: CssColor
	colorⵧtheme?: CssColor // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors#define_a_theme_color

	supportsꓽscreensⵧwith_shape?: boolean
	hasꓽown_navigation?: boolean
	canꓽuse_window_controls_overlay?: boolean
	usesꓽpull_to_refresh?: boolean

	wantsꓽinstall?:
		| false     // won't provide much benefit
		| 'partial' // TODO clarify (we may want to manually prompt the user)
		| 'prompt'  // to the point the browser is expected to prompt https://web.dev/articles/install-criteria
		// TODO link to app store?

	//semanticⳇsupportsꓽscreens:
	// https://drafts.csswg.org/css-round-display/

	styles?: Array<string
		| 'snippet:natural-box-layout'
		>,

	html?: HtmlString // TODO refine

	scripts?: Array<string
		| 'snippet:normalize-trailing-slash'
		// TODO google analytics etc.
	>,

	// TODO one day themes

	isꓽdebug?: boolean // true = want to debug those entry points, will add extra content to pinpoint which entry point is used
}

interface EntryPoints {
	[basename: string]: string,
}

/////////////////////////////////////////////////

export {
	type Category,
	type DisplayMode, type DisplayOverrideMode,

	type WebsiteEntryPointSpec,
	type EntryPoints,
}
