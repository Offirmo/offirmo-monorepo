import assert from 'tiny-invariant'
import type { Immutable} from '@offirmo-private/ts-types'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

import {
	FAKE_ORIGIN,
	normalizeꓽurl,
} from '@offirmo-private/normalize-string'

import type {
	Uri‿x,
	SchemeSpecificURIPart,
	Hyperlink,
	Hyperlink‿x, Uri‿str,
	LinkRelation,
} from './types.ts'

/////////////////////////////////////////////////

function isꓽHyperlink(x: Immutable<any>): x is Hyperlink {
	if (!isꓽobjectⵧliteral(x))
		return false

	return Object.hasOwn(x, 'href')
}

/////////////////////////////////////////////////

function getꓽscheme_specific_partⵧfrom_URLObject(url‿obj: URL): SchemeSpecificURIPart {
	return {
		path: url‿obj.pathname,

		query: url‿obj.search,

		...(url‿obj.hash && { fragment: url‿obj.hash }),
	}
}

function getꓽscheme_specific_partⵧfrom_Uri_str(uri‿str: Uri‿str): SchemeSpecificURIPart {
	const url‿obj = new URL(uri‿str, FAKE_ORIGIN)

	return getꓽscheme_specific_partⵧfrom_URLObject(url‿obj)
}

function getꓽscheme_specific_part(uri: Uri‿str | SchemeSpecificURIPart): SchemeSpecificURIPart {
	if (typeof uri === 'string') {
		return getꓽscheme_specific_partⵧfrom_Uri_str(uri)
	}

	return uri
}

// note: superset of normalizeꓽurl()
function getꓽuriⵧnormalized‿str(link: Immutable<Uri‿str | SchemeSpecificURIPart | Hyperlink | URL>): Uri‿str {
	if (isꓽHyperlink(link))
		return getꓽuriⵧnormalized‿str(link.href)

	if (typeof link === 'string')
		return normalizeꓽurl(link)

	let url‿obj: URL = (() => {
		throw new Error(`Not implemented!`)
	})()
}

// semantic alias
function normalizeꓽuri‿str(uri: Immutable<Uri‿x>): Uri‿str {
	return getꓽuriⵧnormalized‿str(uri)
}

// promote to the most expressive of "X"
function promote_toꓽhyperlink(link: Hyperlink‿x, hints: Partial<Omit<Hyperlink, 'href'>> = {}): Hyperlink {
	if (isꓽHyperlink(link))
		return {
			...hints,
			...link,
			rel: Array.from((new Set<LinkRelation>([
					...(link.rel ?? []),
					...(hints.rel ?? [])
				])).values())
				.sort(),
		}

	return {
		rel: [],
		...hints,
		href: getꓽuriⵧnormalized‿str(link),
	}
}


/////////////////////////////////////////////////

export {
	getꓽscheme_specific_part,

	isꓽHyperlink,
	promote_toꓽhyperlink,

	getꓽuriⵧnormalized‿str,

	normalizeꓽuri‿str,
}
