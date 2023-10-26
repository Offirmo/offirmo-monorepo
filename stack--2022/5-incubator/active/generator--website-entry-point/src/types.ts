import { Immutable } from '@offirmo-private/ts-types'
import { Basename, CssColor, IETFLanguageType, PositiveIntegerInRange, RealInRange, Charset } from '@offirmo-private/ts-types'

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

	basename: Basename // without extension

	lang: IETFLanguageType

	title: string
	titleⵧsocial?: string
	titleⵧapp?: string

	description?: string // displayed by google search, very useful for SEO
	descriptionⵧsocial?: string
	descriptionⵧapp?: string

	app_categories: Category[]
	keywords: string[]

	// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors
	// +++ https://css-tricks.com/meta-theme-color-and-trickery/
	//   should not be too close to the "traffic light buttons"
	// from: https://web.dev/learn/pwa/web-app-manifest/#recommended_fields
	//   Warning: Do not use transparency, CSS variables, gradient functions, or color functions with transparency (such as rgba())
	//   as they are not supported by most browsers. You will get inconsistent results.
	colorⵧbackground: CssColor
	colorⵧforeground: CssColor
	colorⵧtheme: CssColor // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors#define_a_theme_color

	semanticⳇisꓽpwa:
		| false
		| 'capable' // TODO clarify
		| 'installable' // https://web.dev/articles/install-criteria

	//semanticⳇsupportsꓽscreens:
	// https://drafts.csswg.org/css-round-display/

	// TODO one day themes
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
