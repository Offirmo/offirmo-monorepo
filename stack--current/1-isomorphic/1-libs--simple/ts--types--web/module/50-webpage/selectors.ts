import assert from '@monorepo-private/assert/v1'
import type { Immutable } from '@monorepo-private/ts--types'
import { normalizeꓽarrayⵧof_strings } from '@monorepo-private/normalize-string'

import type { Html‿str } from '../10-html/index.ts'
import type { Css‿str } from '../20-css/index.ts'
import type { JS‿str } from '../30-js/index.ts'
import type { Contentⳇweb } from './types.ts'

/////////////////////////////////////////////////
// accessors

function getꓽhtml(spec: Immutable<Contentⳇweb>): Html‿str[] {
	return normalizeꓽarrayⵧof_strings(spec.html ?? [])
}
function getꓽhtml__root__attributes(spec: Immutable<Contentⳇweb>): NonNullable<Contentⳇweb['html__root__attributes']> {
	return normalizeꓽarrayⵧof_strings(spec.html__root__attributes ?? [], { deduplicate: true, sort: true }) as any
}

function getꓽcss(spec: Immutable<Contentⳇweb>): Css‿str[] {
	return normalizeꓽarrayⵧof_strings(spec.css ?? [])
}
function getꓽcssⵧcritical(spec: Immutable<Contentⳇweb>): Css‿str[] {
	return normalizeꓽarrayⵧof_strings(spec.cssⵧcritical ?? [])
}
function getꓽcssⵧtop__layers(spec: Immutable<Contentⳇweb>): string[] {
	return normalizeꓽarrayⵧof_strings(spec.cssⵧtop__layers ?? []) // order is important, do not sort!
}
function getꓽcssⵧtop__namespaces(spec: Immutable<Contentⳇweb>): Immutable<NonNullable<Contentⳇweb['cssⵧtop__namespaces']>> {
	return spec.cssⵧtop__namespaces || {}
}

function getꓽjs(spec: Immutable<Contentⳇweb>): JS‿str[] {
	return normalizeꓽarrayⵧof_strings(spec.js ?? [])
}
function getꓽjsⵧcritical(spec: Immutable<Contentⳇweb>): JS‿str[] {
	return normalizeꓽarrayⵧof_strings(spec.jsⵧcritical ?? [])
}

/////////////////////////////////////////////////

export {
	getꓽhtml__root__attributes,
	getꓽhtml,

	getꓽcssⵧtop__layers,
	getꓽcssⵧtop__namespaces,
	getꓽcssⵧcritical,
	getꓽcss,

	getꓽjsⵧcritical,
	getꓽjs,
}
