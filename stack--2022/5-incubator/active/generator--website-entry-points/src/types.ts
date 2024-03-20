import {
	Immutable,
	Emoji,
	Basename,
} from '@offirmo-private/ts-types'
import {
	Author,
	Contentⳇweb,
	CssColor‿str,
	Thing,
	ThingWithOnlinePresence,
} from '@offirmo-private/ts-types-web'
import type { FeatureSnippets } from "@offirmo-private/generator--html"
import type { SVG } from "@offirmo-private/generator--svg"

/////////////////////////////////////////////////

type Descriptionⳇtitle = string

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

interface WebProperty extends ThingWithOnlinePresence {
	title: Descriptionⳇtitle
	icon?: Emoji | Immutable<SVG>
	keywords?: string[]

	content: Contentⳇweb
	features?: Array<FeatureSnippets>

	/////// SOCIAL
	// TODO full open graph type
	// TODO move to dedicated type
	//titleⵧsocial?: string;
	//descriptionⵧsocial?: string;

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
	// TODO one day themes
}


interface WebPropertyEntryPointSpec extends WebProperty {
	// must be flat for easy defaulting
	// optional '?:' = truly optional (can be easily derived)
	// TODO use zod? or tRPC?

	preset?:
		| 'game' // webapp, uses full screen, no nav nor browser controls
		| 'blog' // content oriented
 		| 'landing' // "rebound" page trying to promote the real content with a CTA: buy, install app... https://growth.design/case-studies/landing-page-ux-psychology
		// TODO more on-demand

	/////// PWA
	app_categories?: Category[] // ??
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


	/////// SRC
	sourcecode?: boolean // TODO clarify generate JS/TS source code

	/////// META
	host?: 'github-pages' | 'cloudflare-pages' | 'netlify' | 'cloudfront' | 'other'
	basename?: Basename // without extension. default to "index"
	env?: 'prod' | 'production' | string // default to env.NODE_ENV ?? dev
	isꓽpublic?: boolean // default: true if prod, false else
	isꓽdebug?: boolean // true = want to debug those entry points, will add extra content to pinpoint which entry point is used
}

interface EntryPoints {
	[relpath: string]: string | Buffer,
}

/////////////////////////////////////////////////

export {
	type Category,
	type WebPropertyEntryPointSpec as WebPropertyEntryPointSpec,
	type EntryPoints,
}

// for convenience
export {
	type Author,
	type Thing,
	type ThingWithOnlinePresence,
}
