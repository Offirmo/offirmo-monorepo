import assert from 'tiny-invariant'
import type { Immutable} from "@offirmo-private/ts-types"

import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

import type {
	Uri‿x,
	SchemeSpecificURIPart,
	Hyperlink,
	Hyperlink‿x, Uri‿str,
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
	uri‿str ||= '/'

	const url‿obj = new URL(uri‿str, 'https://example.com')

	return getꓽscheme_specific_partⵧfrom_URLObject(url‿obj)
}

// promote to the most expressive of "X"
function promote_toꓽscheme_specific_part(uri: Uri‿x): SchemeSpecificURIPart {
	if (typeof uri === 'string') {
		return getꓽscheme_specific_partⵧfrom_Uri_str(uri)
	}

	return uri
}

// promote to the most expressive of "X"
function promote_toꓽhyperlink(link: Hyperlink‿x): Hyperlink {
	if (isꓽHyperlink(link))
		return link

	const href = promote_toꓽscheme_specific_part(link)

	return {
		href,
		rel: [],
	}
}

function getꓽuri‿str(link: Uri‿x | Hyperlink‿x): Uri‿str {
	const href = promote_toꓽhyperlink(link).href

	const { path, query, fragment } = promote_toꓽscheme_specific_part(href)

	let result = path

	if (query) {
		result += '?' + query
	}

	if (fragment) {
		result += '#' + fragment
	}

	return result
}

// semantic alias
// also useful to normalize = sort query params etc.
function normalizeꓽuri‿str(uri: Immutable<Uri‿x>): Uri‿str {
	// TODO sort query params!!
	// (but hard bc no standard on the query params...)
	return getꓽuri‿str(uri)
}

/////////////////////////////////////////////////

export {
	promote_toꓽscheme_specific_part,

	isꓽHyperlink,
	promote_toꓽhyperlink,

	getꓽuri‿str,

	normalizeꓽuri‿str,
}
