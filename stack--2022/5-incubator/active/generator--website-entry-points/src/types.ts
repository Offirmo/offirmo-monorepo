import { Immutable } from '@offirmo-private/ts-types'
import {
	Author,
	Basename,
	Contentⳇweb,
	CssColor‿str,
	Descriptionⳇtitle,
	Thing,
	ThingWithOnlinePresence,
} from '@offirmo-private/ts-types'

import { SVG } from './utils/svg'

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

interface WebPage extends ThingWithOnlinePresence {
	title: Descriptionⳇtitle
	icon?: Immutable<SVG>
	keywords?: string[]

	// Known HTML snippets:
	// Known CSS snippets:
	// - snippet:natural-box-layout
	// Known JS snippets:
	// - snippet:normalize-trailing-slash
	// - TODO google analytics etc.
	content: Contentⳇweb

	/////// SOCIAL
	titleⵧsocial?: string
	descriptionⵧsocial?: string
	// TODO open graph


	/////// POLISH
	// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors
	// +++ https://css-tricks.com/meta-theme-color-and-trickery/
	// - should not be too close to the "traffic light buttons"
	// from: https://web.dev/learn/pwa/web-app-manifest/#recommended_fields
	// - Warning: Do not use transparency, CSS variables, gradient functions, or color functions with transparency (such as rgba())
	// - as they are not supported by most browsers. You will get inconsistent results.
	colorⵧbackground?: CssColor‿str
	colorⵧforeground?: CssColor‿str
	colorⵧtheme?: CssColor‿str // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors#define_a_theme_color
}

interface WebsiteEntryPointSpec extends WebPage {
	// must be flat for easy defaulting
	// optional '?:' = truly optional (can be easily derived)
	// TODO use zod? or tRPC?

	preset?: 'game' | 'landing--app' // TODO clarify

	/////// PWA
	app_categories?: Category[]
	wantsꓽinstall?:
		| false     // won't provide much benefit, no need to advertise it
		| 'partial' // not enough to be automatically "prompted to install" so we may want to advertise it in JS
		| 'prompt'  // full to the point the browser is expected to prompt https://web.dev/articles/install-criteria
		| 'redirect' // we want to redirect to an app store TODO clarify
	titleⵧapp?: Descriptionⳇtitle
	descriptionⵧapp?: string
	hasꓽown_navigation?: boolean
	supportsꓽscreensⵧwith_shape?: boolean // https://drafts.csswg.org/css-round-display/
	canꓽuse_window_controls_overlay?: boolean
	usesꓽpull_to_refresh?: boolean

	// TODO one day themes

	/////// SRC
	sourcecode?: boolean

	/////// META
	basename?: Basename // without extension. default to "index"
	env?: 'prod' | 'production' | string // default to env.NODE_ENV ?? dev
	isꓽpublic?: boolean // default: true if prod, false else
	isꓽdebug?: boolean // true = want to debug those entry points, will add extra content to pinpoint which entry point is used
}

interface EntryPoints {
	[relpath: string]: string,
}

/////////////////////////////////////////////////

export {
	type Category,

	type WebsiteEntryPointSpec,
	type EntryPoints,
}

// for convenience
export {
	type Author,
	type Thing,
	type ThingWithOnlinePresence,
}
