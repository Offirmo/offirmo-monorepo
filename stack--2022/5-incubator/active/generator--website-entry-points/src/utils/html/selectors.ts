import assert from 'tiny-invariant'
import { Immutable, Contentⳇweb, Css‿str, Html‿str, JS‿str, IETFLanguageType } from '@offirmo-private/ts-types'

import { HtmlDocumentSpec } from './types.js'
import { WebsiteEntryPointSpec } from '../../types'

import * as ThingSelectors from '../../selectors/thing.js'

/////////////////////////////////////////////////
// Contentⳇweb

function getꓽhtml(spec: Immutable<Contentⳇweb>): Html‿str[] {
	return spec.html || []
}
function getꓽcssⵧcritical(spec: Immutable<Contentⳇweb>): Css‿str[] {
	return spec.cssⵧcritical || []
}
function getꓽcss(spec: Immutable<Contentⳇweb>): Css‿str[] {
	return spec.css || []
}
function getꓽjsⵧcritical(spec: Immutable<Contentⳇweb>): JS‿str[] {
	return spec.jsⵧcritical || []
}
function getꓽjs(spec: Immutable<Contentⳇweb>): JS‿str[] {
	return spec.js || []
}

/////////////////////////////////////////////////
// HtmlDocumentSpec

function getꓽlang(thing: Immutable<HtmlDocumentSpec>): IETFLanguageType {
	return ThingSelectors.getꓽlang(thing)
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

/////////////////////////////////////////////////

export {
	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽjsⵧcritical,
	getꓽjs,
}
