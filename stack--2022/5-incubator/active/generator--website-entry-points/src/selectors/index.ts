import * as path from 'node:path'

import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import { Basename, Immutable, RelativePath } from '@offirmo-private/ts-types'
import { getꓽtitle as Contentⳇwebᐧgetꓽtitle, getꓽdescription as _getꓽdescription } from '@offirmo-private/ts-types-web'
import { CssColor‿str } from '@offirmo-private/ts-types-web'
import { FeatureSnippets } from '@offirmo-private/generator--html'

import { normalize_unicode, coerce_toꓽsafe_basenameⵧstrictest, normalizeꓽtextⵧsentence } from '@offirmo-private/normalize-string'

import { WebPropertyEntryPointSpec } from '../types.js'

// Relpath should NOT feature ./ as it's up to the caller to decide if they want it or not
// always use safe defaults

/////////////////////////////////////////////////
// re-export some
export {
	getꓽlang,
	getꓽcharset,
	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽcontactⵧhuman,
	getꓽcontactⵧsecurity,

} from '@offirmo-private/ts-types-web';

/////////////////////////////////////////////////
// meta

function isꓽdebug(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.isꓽdebug ?? false
}

function getꓽENV(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return String((spec.env ?? process.env['NODE_ENV']) || 'development').toLowerCase()
}

function isꓽprod(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return getꓽENV(spec) === 'production' || getꓽENV(spec) === 'prod'
}

function isꓽpublic(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.isꓽpublic ?? isꓽprod(spec)
}

function shouldꓽgenerateꓽsourcecode(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.sourcecode ?? false
}

/////////////////////////////////////////////////
// features

function wantsꓽinstall(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	if (typeof spec.wantsꓽinstall === 'string')
		return true

	if (spec.wantsꓽinstall === false)
		return false

	// not provided

	if (spec.preset === 'game')
		return true

	return false
}

/* Does this site have it's own nav? (ex. app, game)
 * or does it needs the browser nav = back button?
 */
function hasꓽown_navigation(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	if (typeof spec.hasꓽown_navigation === 'boolean')
		return spec.hasꓽown_navigation

	if (spec.preset === 'game')
		return true

	return false
}

function isꓽuser_scalable(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	// by default, every site should be user-scalable
	// it's a basic accessibility feature https://moritzgiessmann.de/accessibility-cheatsheet/
	return !hasꓽown_navigation(spec)
}

function needsꓽwebmanifest(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return wantsꓽinstall(spec)
}

function supportsꓽscreensⵧwith_shape(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.supportsꓽscreensⵧwith_shape ?? false
}

function canꓽuse_window_controls_overlay(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.canꓽuse_window_controls_overlay ?? false
}

function usesꓽpull_to_refresh(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	return spec.usesꓽpull_to_refresh ?? true
}

function prefersꓽorientation(spec: Immutable<WebPropertyEntryPointSpec>): boolean {
	// TODO
	return false
}

function getꓽfeatures(spec: Immutable<WebPropertyEntryPointSpec>): FeatureSnippets[] {
	const features = new Set<FeatureSnippets>(spec.features ?? [])


	if (spec.preset === 'game') features.add('cssⳇviewport--full' as FeatureSnippets)

		features.add('cssⳇbox-layout--natural')

	if (!features.has('cssⳇfoundation--offirmo'))
		features.add('cssⳇframework--offirmo')

	return Array.from(features).filter(f => {
		assert(Enum.isType(FeatureSnippets, f), `Unknown feature "${f}"!`)
		return true
	})
}

/////////////////////////////////////////////////
// content

function _getꓽtitle(spec: Immutable<WebPropertyEntryPointSpec>): string {
	const candidate_own = normalizeꓽtextⵧsentence(spec.title ?? '')
	if (candidate_own)
		return candidate_own

	const candidate_content = Contentⳇwebᐧgetꓽtitle(spec.content)
	if (candidate_content)
		return candidate_content

	throw new Error(`Sorry, we need a title, I can't infer one!`)
}

function getꓽtitleⵧpage(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return _getꓽtitle(spec)
}
function getꓽtitleⵧsocial(spec: Immutable<WebPropertyEntryPointSpec>): string {
	// TODO
	return _getꓽtitle(spec)
	/*return !!spec.titleⵧsocial
		? normalize_unicode(spec.titleⵧsocial).trim()
		: _getꓽtitle(spec) */
}
function getꓽtitleⵧapp(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return !!spec.titleⵧapp
		? normalize_unicode(spec.titleⵧapp).trim()
		: _getꓽtitle(spec)
}
function getꓽtitleⵧappⵧshort(spec: Immutable<WebPropertyEntryPointSpec>): string {
	// TODO
	return getꓽtitleⵧapp(spec)
}
function getꓽtitleⵧlib(spec: Immutable<WebPropertyEntryPointSpec>): string {
	const base = getꓽtitleⵧappⵧshort({
		...spec,
		lang: 'en'
	})

	return coerce_toꓽsafe_basenameⵧstrictest(base)
}

function getꓽdescriptionⵧpage(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return _getꓽdescription(spec)
}

/////////////////////////////////////////////////
// polish

function getꓽcolorⵧforeground(spec: Immutable<WebPropertyEntryPointSpec>): CssColor‿str {
	return spec.colorⵧforeground ?? 'black'
}

function getꓽcolorⵧbackground(spec: Immutable<WebPropertyEntryPointSpec>): CssColor‿str {
	return spec.colorⵧbackground ?? 'white'
}

function getꓽcolorⵧtheme(spec: Immutable<WebPropertyEntryPointSpec>): CssColor‿str {
	return spec.colorⵧtheme ?? getꓽcolorⵧbackground(spec)
}

/////////////////////////////////////////////////

function _getꓽbasenameⵧwithout_extension(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	if (!spec.basename)
		return 'index'

	assert(path.extname(spec.basename) === '')
	const safe_version = coerce_toꓽsafe_basenameⵧstrictest(spec.basename);
	assert(spec.basename === safe_version, `basename "${spec.basename}" is unsafe, it should be "${safe_version}"!`)
	return safe_version
}

function getꓽbasenameⵧindexᐧhtml(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	return `${_getꓽbasenameⵧwithout_extension(spec)}.html`
}

function getꓽbasenameⵧcontactᐧhtml(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	return `contact.html`
}
function getꓽbasenameⵧerrorᐧhtml(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	return `error.html`
}
function getꓽbasenameⵧaboutᐧhtml(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	return `about.html`
}

function getꓽbasenameⵧwebmanifest(spec: Immutable<WebPropertyEntryPointSpec>): Basename {
	// the recommended extension is .webmanifest https://web.dev/learn/pwa/web-app-manifest/
	return `${_getꓽbasenameⵧwithout_extension(spec)}.webmanifest`
}


// TODO move to own file?
function getꓽicon__sizes(spec: Immutable<WebPropertyEntryPointSpec>): Uint32Array {
	// TODO if no PWA, no need for big ones!

	const sizes = new Set<number>()

	// https://web.dev/learn/pwa/web-app-manifest/#icons
	// "If you need to pick only one icon size, it should be 512 by 512 pixels" (TODO date)
	sizes.add(512)
	// However, providing more sizes is recommended including…
	// TODO one day customize per size
	sizes.add(1024)
	sizes.add(384)
	sizes.add(192)

	// iOs
	// https://developer.apple.com/design/human-interface-guidelines/app-icons#iOS-iPadOS-app-icon-sizes
	// "You need to provide a large version of your app icon, measuring 1024x1024"
	sizes.add(1024)
	// You can let the system automatically scale down your large app icon to produce all other sizes,
	// or — if you want to customize the appearance of the icon at specific sizes — you can supply multiple versions.
	// (TODO one day customize per size, for now it's always the same icon)

	// macOs
	// https://developer.apple.com/design/human-interface-guidelines/app-icons#macOS-app-icon-sizes
	// create a 1024x1024 px version of your macOS app icon
	sizes.add(1024)
	// In addition, you also need to supply the icon in the following sizes...
	// (TODO one day customize per size)

	// TODO add other stores / oses specifications

	return Uint32Array.from(sizes.values()).sort().reverse()
}

function getꓽicon__basename(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): Basename {
	if (size === null)
		return `icon.svg`

	return `icon-${size}.png`
}

function getꓽicon__path(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): RelativePath {
	return `icons/${getꓽicon__basename(spec, size)}`
}

// keywords: todo dedupe, add categories, lowercase, etc.

/////////////////////////////////////////////////

export {
	isꓽdebug,
	getꓽENV,
	isꓽprod,
	isꓽpublic,

	wantsꓽinstall,
	isꓽuser_scalable,
	hasꓽown_navigation,
	prefersꓽorientation,
	supportsꓽscreensⵧwith_shape,
	canꓽuse_window_controls_overlay,
	usesꓽpull_to_refresh,

	needsꓽwebmanifest,
	// TODO move to own file?
	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧcontactᐧhtml,
	getꓽbasenameⵧerrorᐧhtml,
	getꓽbasenameⵧaboutᐧhtml,
	getꓽbasenameⵧwebmanifest,

	getꓽfeatures,
	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽtitleⵧlib,

	getꓽdescriptionⵧpage,

	getꓽcolorⵧforeground,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme,

	getꓽicon__sizes,
	getꓽicon__path,

	shouldꓽgenerateꓽsourcecode,
}
