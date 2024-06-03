import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Html‿str } from '../10-html/index.js'
import { Css‿str } from '../20-css/index.js'
import { JS‿str } from '../30-js/index.js'
import type { Contentⳇweb } from './types.js'

/////////////////////////////////////////////////

function getꓽhtml(spec: Immutable<Contentⳇweb>): Immutable<Html‿str[]> {
	return spec.html || []
}
function getꓽcss(spec: Immutable<Contentⳇweb>): Immutable<Css‿str[]> {
	return spec.css || []
}
function getꓽjs(spec: Immutable<Contentⳇweb>): Immutable<JS‿str[]> {
	return spec.js || []
}

// technicalities :-(
function getꓽcssⵧcritical(spec: Immutable<Contentⳇweb>, { includesꓽtop = false } = {}): Immutable<Css‿str[]> {
	const result = [ ...(spec.cssⵧcritical || []) ]
	if (includesꓽtop)
		result.unshift(...getꓽcssⵧtop(spec))
	return result
}
function getꓽcssⵧtop__layers(spec: Immutable<Contentⳇweb>): Immutable<string[]> {
	return spec.cssⵧtop__layers || []
}
function getꓽcssⵧtop__namespaces(spec: Immutable<Contentⳇweb>): Immutable<NonNullable<Contentⳇweb['cssⵧtop__namespaces']>> {
	return spec.cssⵧtop__namespaces || {}
}
// convenience
// should it be in @offirmo-private/generator--html instead?
function getꓽcssⵧtop(spec: Immutable<Contentⳇweb>): Css‿str[] {
	const namespaces: Css‿str[] = Object.entries(getꓽcssⵧtop__namespaces(spec)).length === 0
		? []
		: [
		`/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */`,
		...Object.entries(getꓽcssⵧtop__namespaces(spec)).map(([name, url]) => `@namespace ${name} url(${url});`),
		]
	const layer: Css‿str[] = getꓽcssⵧtop__layers(spec).length === 0
		? []
		: [
			`/* define layers order, needs to be a the top to properly enforce the intended order */`,
			`@layer ${getꓽcssⵧtop__layers(spec).join(', ')};`
		]

	return [
		...namespaces,
		...layer,
	]
}
function getꓽjsⵧcritical(spec: Immutable<Contentⳇweb>): Immutable<JS‿str[]> {
	return spec.jsⵧcritical || []
}

/////////////////////////////////////////////////

export {
	getꓽhtml,
	getꓽcss,
	getꓽjs,

	getꓽcssⵧcritical,
	getꓽcssⵧtop__layers,
	getꓽcssⵧtop__namespaces,
	getꓽcssⵧtop,

	getꓽjsⵧcritical,
}
