import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import {
	normalizeꓽIETFLanguageType,
	normalizeꓽtextⵧsentence,
} from '@offirmo-private/normalize-string'

import { Html‿str } from '../10-html/index.js'
import { Css‿str } from '../20-css/index.js'
import { JS‿str } from '../30-js/index.js'
import type { Contentⳇweb } from './types.js'

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

/*function getꓽlang(spec: Immutable<Contentⳇweb>): IETFLanguageType {
	return normalizeꓽIETFLanguageType(spec.lang ?? '')
}

function getꓽcharset(spec: Immutable<Contentⳇweb>): Charset {
	return 'utf-8'
}*/

function getꓽtitle(spec: Immutable<Contentⳇweb>): string {
	return normalizeꓽtextⵧsentence(spec.title ?? 'Index')
}

/////////////////////////////////////////////////

export {
	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽjsⵧcritical,
	getꓽjs,

	//getꓽlang,
	//getꓽcharset,

	getꓽtitle,
}
