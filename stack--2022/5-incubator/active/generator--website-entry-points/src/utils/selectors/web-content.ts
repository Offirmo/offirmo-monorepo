import assert from 'tiny-invariant'
import { Immutable, Contentⳇweb, Css‿str, Html‿str, JS‿str, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function getꓽhtml(spec: Immutable<Contentⳇweb>): Immutable<Html‿str[]> {
	return spec.html || []
}
function getꓽcssⵧcritical(spec: Immutable<Contentⳇweb>): Immutable<Css‿str[]> {
	return spec.cssⵧcritical || []
}
function getꓽcss(spec: Immutable<Contentⳇweb>): Immutable<Css‿str[]> {
	return spec.css || []
}
function getꓽjsⵧcritical(spec: Immutable<Contentⳇweb>): Immutable<JS‿str[]> {
	return spec.jsⵧcritical || []
}
function getꓽjs(spec: Immutable<Contentⳇweb>): Immutable<JS‿str[]> {
	return spec.js || []
}

function getꓽlang(spec: Immutable<Contentⳇweb>): IETFLanguageType {
	if (!spec.lang)
		return 'en'

	// TODO check format
	return normalize_unicode(spec.lang).toLowerCase().trim()
}

function getꓽcharset(spec: Immutable<Contentⳇweb>): Charset {
	return 'utf-8'
}

function _getꓽtitle(spec: Immutable<Contentⳇweb>): string {
	assert(!!spec.title)
	return normalize_unicode(spec.title).trim()
}
function getꓽtitleⵧpage(spec: Immutable<Contentⳇweb>): string {
	return _getꓽtitle(spec)
}

/////////////////////////////////////////////////

export {
	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽjsⵧcritical,
	getꓽjs,

	getꓽlang,
	getꓽcharset,
	getꓽtitleⵧpage,
}
