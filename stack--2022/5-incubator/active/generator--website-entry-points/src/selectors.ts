import * as path from 'node:path'

import assert from 'tiny-invariant'
import { Basename, Immutable, IETFLanguageType, CssColor‿str, Url‿str, RelativePath } from '@offirmo-private/ts-types'

import {
	normalize_unicode,
	coerce_to_safe_basenameⵧstrictest,
} from '@offirmo-private/normalize-string'

import { FeatureSnippets, WebsiteEntryPointSpec } from './types.js'

// Relpath should NOT feature ./ as it's up to the caller to decide if they want it or not
// always use safe defaults

/////////////////////////////////////////////////

function isꓽdebug(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.isꓽdebug ?? false
}

function getꓽENV(spec: Immutable<WebsiteEntryPointSpec>): string {
	return String((spec.env ?? process.env['NODE_ENV']) || 'development').toLowerCase()
}

function isꓽprod(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return getꓽENV(spec) === 'production' || getꓽENV(spec) === 'prod'
}

function isꓽpublic(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.isꓽpublic ?? isꓽprod(spec)
}

/////////////////////////////////////////////////

function wantsꓽinstall(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	if (typeof spec.wantsꓽinstall === 'string')
		return true

	if (spec.wantsꓽinstall === false)
		return false

	// not provided

	if (spec.preset === 'game')
		return true

	return false
}

function hasꓽown_navigation(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	if (typeof spec.hasꓽown_navigation === 'boolean')
		return spec.hasꓽown_navigation

	if (spec.preset === 'game')
		return true

	return false
}

function isꓽuser_scalable(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	// TODO improve, incorrect
	return hasꓽown_navigation(spec)
}

function needsꓽwebmanifest(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return wantsꓽinstall(spec)
}

function supportsꓽscreensⵧwith_shape(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.supportsꓽscreensⵧwith_shape ?? false
}

function canꓽuse_window_controls_overlay(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.canꓽuse_window_controls_overlay ?? false
}

function usesꓽpull_to_refresh(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.usesꓽpull_to_refresh ?? true
}

function prefersꓽorientation(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	// TODO
	return false
}

function getꓽfeatures(spec: Immutable<WebsiteEntryPointSpec>): FeatureSnippets[] {
	const features = new Set<FeatureSnippets>(spec.features ?? [])

	if (spec.preset === 'game')
		features.add('cssⳇviewport--full' as FeatureSnippets)

	return Array.from(features)
}

/////////////////////////////////////////////////

function getꓽauthor__name(spec: Immutable<WebsiteEntryPointSpec>): string {
	assert(spec.author, `should have an author`)
	return spec.author.name
}
function getꓽauthor__intro(spec: Immutable<WebsiteEntryPointSpec>): string | undefined {
	assert(spec.author, `should have an author`)
	return spec.author.intro
}

function getꓽcontactⵧgeneric(spec: Immutable<WebsiteEntryPointSpec>): Url‿str {
	const url = spec.contact || spec.author?.contact
	assert(url, 'should have at last a point of contact!')
	return url
}
function getꓽcontactⵧsecurity(spec: Immutable<WebsiteEntryPointSpec>): Url‿str {
	return spec.contactⵧsecurity || getꓽcontactⵧgeneric(spec)
}

/////////////////////////////////////////////////
// content

function getꓽlang(spec: Immutable<WebsiteEntryPointSpec>): IETFLanguageType {
	if (!spec.lang)
		return 'en'

	// TODO check format
	return normalize_unicode(spec.lang).toLowerCase()
}

function getꓽcharset(spec: Immutable<WebsiteEntryPointSpec>): IETFLanguageType {
	return 'utf-8'
}

function _getꓽtitle(spec: Immutable<WebsiteEntryPointSpec>): string {
	assert(!!spec.title)
	return normalize_unicode(spec.title).trim()
}
function getꓽtitleⵧpage(spec: Immutable<WebsiteEntryPointSpec>): string {
	return _getꓽtitle(spec)
}
function getꓽtitleⵧsocial(spec: Immutable<WebsiteEntryPointSpec>): string {
	return !!spec.titleⵧsocial
		? normalize_unicode(spec.titleⵧsocial).trim()
		: _getꓽtitle(spec)
}
function getꓽtitleⵧapp(spec: Immutable<WebsiteEntryPointSpec>): string {
	return !!spec.titleⵧapp
		? normalize_unicode(spec.titleⵧapp).trim()
		: _getꓽtitle(spec)
}
function getꓽtitleⵧappⵧshort(spec: Immutable<WebsiteEntryPointSpec>): string {
	// TODO
	return getꓽtitleⵧapp(spec)
}
function getꓽtitleⵧlib(spec: Immutable<WebsiteEntryPointSpec>): string {
	const base = getꓽtitleⵧappⵧshort({
		...spec,
		lang: 'en'
	})

	return coerce_to_safe_basenameⵧstrictest(base)
}

function _getꓽdescription(spec: Immutable<WebsiteEntryPointSpec>): string {
	assert(!!spec.description)
	return normalize_unicode(spec.description).trim()
}
function getꓽdescriptionⵧpage(spec: Immutable<WebsiteEntryPointSpec>): string {
	return _getꓽdescription(spec)
}

/////////////////////////////////////////////////

function _getꓽbasename_without_extension(spec: Immutable<WebsiteEntryPointSpec>): Basename {
	if (!spec.basename)
		return 'index'

	assert(path.extname(spec.basename) === '')
	const safe_version = coerce_to_safe_basenameⵧstrictest(spec.basename)
	assert(spec.basename === safe_version, `basename "${spec.basename}" is unsafe, it should be "${safe_version}"!`)
	return safe_version
}

function getꓽbasenameⵧindexᐧhtml(spec: Immutable<WebsiteEntryPointSpec>): Basename {
	return `${_getꓽbasename_without_extension(spec)}.html`
}

function getꓽbasenameⵧwebmanifest(spec: Immutable<WebsiteEntryPointSpec>): Basename {
	// the recommended extension is .webmanifest https://web.dev/learn/pwa/web-app-manifest/
	return `${_getꓽbasename_without_extension(spec)}.webmanifest`
}

function getꓽcolorⵧforeground(spec: Immutable<WebsiteEntryPointSpec>): CssColor‿str {
	return spec.colorⵧforeground ?? 'black'
}

function getꓽcolorⵧbackground(spec: Immutable<WebsiteEntryPointSpec>): CssColor‿str {
	return spec.colorⵧbackground ?? 'white'
}

function getꓽcolorⵧtheme(spec: Immutable<WebsiteEntryPointSpec>): CssColor‿str {
	return spec.colorⵧtheme ?? getꓽcolorⵧbackground(spec)
}

// TODO move to own file?
function getꓽicon__sizes(spec: Immutable<WebsiteEntryPointSpec>): Uint32Array {
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

function getꓽicon__basename(spec: Immutable<WebsiteEntryPointSpec>, size: number | null): Basename {
	if (size === null)
		return `icon.svg`

	return `icon-${size}.svg` // TODO PNG!!
}

function getꓽicon__path(spec: Immutable<WebsiteEntryPointSpec>, size: number | null): RelativePath {
	return `favicons/${getꓽicon__basename(spec, size)}`
}

function shouldꓽgenerateꓽsourcecode(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.sourcecode ?? false
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
	getꓽfeatures,

	needsꓽwebmanifest,

	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽcontactⵧgeneric,
	getꓽcontactⵧsecurity,

	// TODO move to own file?
	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,

	getꓽlang,
	getꓽcharset,

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
