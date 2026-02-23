import type { Emoji, Basename, AnyPath } from '@monorepo-private/ts--types'
import type {
	Author,
	Contentⳇweb,
	CssⳇColor‿str,
	Thing,
	ThingWithOnlinePresence,
} from '@monorepo-private/ts--types--web'
import type { FeatureSnippets } from '@monorepo-private/generator--html'
import type { SVG } from '@monorepo-private/generator--svg'

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

interface IconSet {
	emoji?: Emoji // will be used as favicon if present
	svg?: SVG | AnyPath
	pngs?: {
		[resolution: string]: AnyPath
	}
}

interface WebProperty extends ThingWithOnlinePresence {
	title: Descriptionⳇtitle
	icon?: IconSet
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
	colorⵧbackground?: CssⳇColor‿str
	colorⵧforeground?: CssⳇColor‿str
	colorⵧtheme?: CssⳇColor‿str // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Customize_your_app_colors#define_a_theme_color
	// XXX if customizing colors, very likely you'll need to tweak the link colors as well!
	// TODO recognize a dark theme and include the theme file if offirmo framework
	// TODO one day themes
}

interface WebPropertyEntryPointSpec extends WebProperty {
	// must be flat for easy defaulting
	// optional '?:' = truly optional (can be easily derived)
	// TODO use zod? or tRPC?

	// meta selector that triggers different defaults
	preset?:
		| 'app--immersive' // webapp, uses full screen, no nav nor browser controls ex. game
		| 'blog' // content oriented
		| 'landing' // "rebound" page trying to promote the real content with a CTA: buy, install app... https://growth.design/case-studies/landing-page-ux-psychology
	// TODO more on-demand

	/////// SPA
	isꓽcatching_all_routes?: boolean // if true, we may NOT want a 404.html, ex. https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering

	/////// PWA
	app_categories?: Category[] // ??
	wantsꓽinstall?:
		| false // won't provide much benefit, no need to advertise it
		| 'partial' // not capable enough to be eligible for "prompt to install" so we may want to advertise it in JS
		| 'promotion-capable' // fully capable to the point the browser is expected to prompt https://web.dev/articles/install-criteria
		| 'redirect' // we want to redirect to an app store TODO clarify
	titleⵧapp?: Descriptionⳇtitle
	descriptionⵧapp?: string
	hasꓽown_navigation?: boolean
	supportsꓽscreensⵧwith_shape?: boolean // https://drafts.csswg.org/css-round-display/
	canꓽuse_window_controls_overlay?: boolean
	usesꓽpull_to_refresh?: boolean

	/////// JS SRC
	generatesꓽjsⵧscaffold?: 'offirmo--react' // TODO clarify generate JS/TS source code

	/////// META
	host?:
		| 'github-pages' // https://pages.github.com/  https://docs.github.com/en/pages
		| 'cloudflare--workers' // https://developers.cloudflare.com/workers/
		| 'cloudflare--pages' // still active but not recommended
		| 'netlify' // https://old.reddit.com/r/webdev/comments/1b14bty/netlify_just_sent_me_a_104k_bill_for_a_simple/
		| 'aws--cloudfront'
		| 'other'
	basename?: Basename // without extension. default to "index"
	env?: 'prod' | 'production' | string // default to env.NODE_ENV ?? dev
	isꓽpublic?: boolean // true = this website is public and robots are welcome to index it. Automatically disabled for non-prod builds = no need to index a staging site
	isꓽdebug?: boolean // true = want to debug those entry points, will add extra content to pinpoint which entry point is used
}

interface EntryPoints {
	[relpath: string]: string | Buffer
}

/////////////////////////////////////////////////

export {
	type Category,
	type IconSet,
	type WebProperty,
	type WebPropertyEntryPointSpec,
	type EntryPoints,
}
