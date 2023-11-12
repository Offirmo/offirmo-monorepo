import assert from 'tiny-invariant'
import { Immutable, CssColor, UrlString, IETFLanguageType } from '@offirmo-private/ts-types'

import { DisplayMode, DisplayOverrideMode, Category } from '../types.js'

/////////////////////////////////////////////////
// Home => https://github.com/w3c/manifest   https://www.w3.org/TR/manifest-app-info/
// +++ https://web.dev/learn/pwa/web-app-manifest/
// +++ https://developer.mozilla.org/en-US/docs/Web/Manifest
// IMPORTANT https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#installation_from_an_app_store

// https://developer.mozilla.org/en-US/docs/Web/Manifest/icons
interface Icon {
	src: UrlString
	type?: `image/${string}` // TODO dedicated type? https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
	sizes: string // representing an array of sizes TODO one day better type?
	purposes?: 'maskable' | 'monochrome' // ('any' is the default = absent)
}

interface WebManifest {
	// critical to be installable
	// cf. https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#required_manifest_members
	name: string
	icons: Icon[]
	start_url: UrlString // https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url // TODO auto add a query param!
	display: Exclude<DisplayMode, 'browser'> // https://developer.mozilla.org/en-US/docs/Web/Manifest/display
	                             // 'browser' would prevent the app from being installable cf. https://web.dev/articles/install-criteria

	// critical for good experience
	short_name: string
	theme_color: CssColor // https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color
	background_color: CssColor // https://developer.mozilla.org/en-US/docs/Web/Manifest/background_color
	lang: IETFLanguageType // https://github.com/w3c/manifest/blob/gh-pages/explainer.md#internationalization-lang-and-dir
	dir?: unknown // useful if not ltr https://github.com/w3c/manifest/blob/gh-pages/explainer.md#internationalization-lang-and-dir

	// nice to have
	id?: unknown // TODO https://developer.mozilla.org/en-US/docs/Web/Manifest/id  https://developer.chrome.com/articles/pwa-manifest-id/
	scope?: UrlString // https://developer.mozilla.org/en-US/docs/Web/Manifest/scope
	orientation?: // https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
		// https://www.w3.org/TR/screen-orientation/#the-current-screen-orientation-type-and-angle
		| 'any'
		| 'natural'
		| 'landscape'
		| 'portrait'
		| 'landscape-primary'
		| 'landscape-secondary'
		| 'portrait-primary'
		| 'portrait-secondary'
	// ⬇ AFAIK should only be used for feature overlay!!
	display_override?: DisplayOverrideMode[] // https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override


	// "Promotional fields" = app stores related
	// https://www.w3.org/TR/manifest-app-info/#supplementary-manifest-members
	description?: string
	categories?: Category[]
	screenshots?: unknown // TODO https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots  https://www.w3.org/TR/manifest-app-info/#screenshot-object-and-its-members
	iarc_rating_id?: unknown // https://web.dev/learn/pwa/web-app-manifest/#promotional_fields

	// OS integration
	file_handlers?: unknown[] // https://developer.mozilla.org/en-US/docs/Web/Manifest/file_handlers
	protocol_handlers?: unknown // https://developer.mozilla.org/en-US/docs/Web/Manifest/protocol_handlers
	launch_handler?: { // https://developer.mozilla.org/en-US/docs/Web/Manifest/launch_handler
		client_mode?: 'auto' | 'focus-existing' | 'navigate-existing' | 'navigate-new'
	}
	related_applications?: unknown // https://developer.mozilla.org/en-US/docs/Web/Manifest/related_applications
	// XXX prefer_related_applications can make an app uninstallable!
	prefer_related_applications?: never // https://developer.mozilla.org/en-US/docs/Web/Manifest/prefer_related_applications
	share_target?: unknown // https://developer.mozilla.org/en-US/docs/Web/Manifest/share_target
	shortcuts?: unknown // https://developer.mozilla.org/en-US/docs/Web/Manifest/shortcuts

	// other
	serviceworker?: never // non-standard, maybe related to payment?
}

/////////////////////////////////////////////////

export {
	type Icon,
	type WebManifest,
}
