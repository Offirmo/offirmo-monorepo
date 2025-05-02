import assert from 'tiny-invariant'
import type { Immutable} from "@offirmo-private/ts-types"

import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

import type {
	Uri‿x,
	SchemeSpecificURIPart,
	Hyperlink,
	Hyperlink‿x, Uri‿str,
} from './types.ts'
import type { OHALinkRelation } from '@offirmo-private/ohateoas/module/src/types/types.ts'
import { hasꓽemail_structure, normalize_unicode, normalizeꓽemailⵧreasonable, remove_all_spaces } from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function isꓽHyperlink(x: Immutable<any>): x is Hyperlink {
	if (!isꓽobjectⵧliteral(x))
		return false

	return Object.hasOwn(x, 'href')
}

/////////////////////////////////////////////////

const FAKE_ORIGIN = 'https://placeholder.fake'

function getꓽscheme_specific_partⵧfrom_URLObject(url‿obj: URL): SchemeSpecificURIPart {
	return {
		path: url‿obj.pathname,

		query: url‿obj.search,

		...(url‿obj.hash && { fragment: url‿obj.hash }),
	}
}

function getꓽscheme_specific_partⵧfrom_Uri_str(uri‿str: Uri‿str): SchemeSpecificURIPart {
	uri‿str ||= '/'

	const url‿obj = new URL(uri‿str, FAKE_ORIGIN)

	return getꓽscheme_specific_partⵧfrom_URLObject(url‿obj)
}

function getꓽscheme_specific_part(uri: Uri‿str | SchemeSpecificURIPart): SchemeSpecificURIPart {
	if (typeof uri === 'string') {
		return getꓽscheme_specific_partⵧfrom_Uri_str(uri)
	}

	return uri
}


function getꓽuriⵧnormalized‿str(link: Uri‿str | SchemeSpecificURIPart | Hyperlink | URL): Uri‿str {
	try {
		// TODO does it work for emails??
		let url‿obj: URL = (() => {
			if (link instanceof URL)
				return link

			let uri‿str: Uri‿str = (() => {
				if (typeof link === 'string')
					return link

				if (isꓽHyperlink(link))
					return link.href

				throw new Error(`Not implemented!`)
			})()

			uri‿str = remove_all_spaces(
				normalize_unicode(uri‿str)
			)

			if (!uri‿str.includes(':') && hasꓽemail_structure(uri‿str))
				uri‿str = `mailto:${uri‿str}`


			return new URL(uri‿str, FAKE_ORIGIN)
		})()

		if (url‿obj.origin === "null") {
			// using the fake origin may have yielded a bad scheme

		}

		let pathname = url‿obj.pathname // bc seen not assignable

		if (url‿obj.origin !== FAKE_ORIGIN) {
			if (url‿obj.protocol === 'http:') {
				// upgrade to https
				// YES I know it can break the link
				// but this upgrade is good more often than not
				url‿obj.protocol = 'https:'
			}
			if (url‿obj.protocol === 'mailto:') {
				pathname = normalizeꓽemailⵧreasonable(url‿obj.pathname)
			}
		}

		url‿obj.searchParams.sort()

		return (url‿obj.origin === FAKE_ORIGIN
				? ''
				: (url‿obj.origin === "null"
					? url‿obj.protocol // no origin, ex. email
					: url‿obj.origin))
			+ pathname
			+ url‿obj.search
			+ url‿obj.hash
	}
	catch (e) {
		throw e
	}

	throw new Error(`Not implemented!`)

	let result = path

	if (query) {
		result += '?' + query
	}

	if (fragment) {
		result += '#' + fragment
	}

	return result
}

// promote to the most expressive of "X"
function promote_toꓽhyperlink(link: Hyperlink‿x, hints: Partial<Omit<Hyperlink, 'href'>> = {}): Hyperlink {
	if (isꓽHyperlink(link))
		return {
			...hints,
			...link,
			rel: Array.from((new Set<OHALinkRelation>([
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

// semantic alias
// also useful to normalize = sort query params etc.
function normalizeꓽuri‿str(uri: Immutable<Uri‿x>): Uri‿str {
	return getꓽuriⵧnormalized‿str(uri)
}

/////////////////////////////////////////////////

export {
	getꓽscheme_specific_part,

	isꓽHyperlink,
	promote_toꓽhyperlink,

	getꓽuriⵧnormalized‿str,

	normalizeꓽuri‿str,
}
