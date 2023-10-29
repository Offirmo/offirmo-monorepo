import * as path from 'node:path'

import assert from 'tiny-invariant'
import { Basename, Immutable, IETFLanguageType, CssColor } from '@offirmo-private/ts-types'
import {
	capitalize,
	coerce_to_ascii,
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	coerce_to_safe_basenameⵧstrictest,

} from '@offirmo-private/normalize-string'

import { WebsiteEntryPointSpec } from './types.js'

/////////////////////////////////////////////////
// always use safe defaults

function isꓽdebug(spec: Immutable<WebsiteEntryPointSpec>): boolean {
	return spec.isꓽdebug ?? false
}

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

function getꓽcolorⵧforeground(spec: Immutable<WebsiteEntryPointSpec>): CssColor {
	return spec.colorⵧforeground ?? 'black'
}

function getꓽcolorⵧbackground(spec: Immutable<WebsiteEntryPointSpec>): CssColor {
	return spec.colorⵧbackground ?? 'white'
}

function getꓽcolorⵧtheme(spec: Immutable<WebsiteEntryPointSpec>): CssColor {
	return spec.colorⵧtheme ?? getꓽcolorⵧbackground(spec)
}

// keywords: todo dedupe, add categories, lowercase, etc.

/////////////////////////////////////////////////

export {
	isꓽdebug,
	wantsꓽinstall,
	isꓽuser_scalable,
	hasꓽown_navigation,
	prefersꓽorientation,

	supportsꓽscreensⵧwith_shape,
	canꓽuse_window_controls_overlay,
	usesꓽpull_to_refresh,

	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,

	getꓽlang,
	getꓽcharset,

	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,

	getꓽcolorⵧforeground,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme,
}
