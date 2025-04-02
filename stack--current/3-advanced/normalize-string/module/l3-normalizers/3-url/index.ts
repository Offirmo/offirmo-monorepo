
import { combineꓽnormalizers } from '../../l2-core/normalize.ts'
import {
	normalize_unicode,
	remove_all_spaces,
} from '../1-base/index.ts'
import { normalizeꓽemailⵧreasonable, hasꓽemail_structure } from '../2-email/index.ts'

/////////////////////////////////////////////////
// https://en.wikipedia.org/wiki/URL

function _normalizeⵧschemeꘌhttpₓ(url: string): string {
	try {
		// TODO one day URL.canParse
		new URL(url)
	}
	catch(e) {
		throw new Error(`Invalid URL!`)
	}

	let [ raw_scheme, ...rest] = url.split(':')
	let scheme = (raw_scheme || '').toLowerCase()

	if (scheme === 'http') {
		// upgrade to https
		// YES I know it can break the link
		// but this upgrade is good more often than not
		scheme = 'https'
	}

	if (scheme !== 'https') {
		throw new Error(`Not a http(s) scheme "${scheme}"!`)
	}

	// TODO remove trackers?
	// TODO add trailing slash?
	// TODO more?

	return [scheme, ...rest].join(':')
}

function _normalize_per_scheme(url: string): string {
	// classic case of passing a raw email without the "mailto:" scheme
	if (!url.includes(':') && hasꓽemail_structure(url))
		url = `mailto:${url}`

	let [ raw_scheme, ...rest] = url.split(':')
	let scheme = (raw_scheme || '').toLowerCase()

	switch(scheme) {
		case 'mailto':
			rest = [ normalizeꓽemailⵧreasonable(url.slice('mailto:'.length)) ]
			break
		case 'http':
			/* falls through */
		case 'https': {
			url = _normalizeⵧschemeꘌhttpₓ([ scheme, ...rest ].join(':'))
			;[ scheme, ...rest ] = url.split(':') as [string, string]
			break
		}

		// TODO more schemes
		default:
			console.warn(`normalizeꓽurl: Unknown scheme "${scheme}"!`)
			break
	}

	return [ scheme, ...rest ].join(':')
}

function _validate_url_structure(possible_url: string): string {

	const url‿obj = new URL(possible_url)
	url‿obj.searchParams.sort()

	// TODO check forbidden domains
	// https://www.rfc-editor.org/rfc/rfc2606.html#section-2

	return (url‿obj.origin == 'null' ? url‿obj.protocol : url‿obj.origin) + url‿obj.pathname + url‿obj.search + url‿obj.hash
}

const normalizeꓽurl = combineꓽnormalizers(
	normalize_unicode,
	remove_all_spaces, // yes in theory we could encode them, but a space is more likely a typo, ex. mobile adding a " " after a .
	_normalize_per_scheme,
	_validate_url_structure,
	// TODO normalize URI encoding?
)

const normalizeꓽurlⵧhttpₓ = combineꓽnormalizers(
	normalizeꓽurl,
	_normalizeⵧschemeꘌhttpₓ,
)

/////////////////////////////////////////////////

export {
	normalizeꓽurl,
	normalizeꓽurlⵧhttpₓ,
}
