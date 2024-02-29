
import { combine_normalizers } from '../../normalize.js'
import {
	normalize_unicode,
	remove_all_spaces,
} from '../base/index.js'
import { normalizeꓽemailⵧreasonable } from '../email/index.js'

/////////////////////////////////////////////////
// https://en.wikipedia.org/wiki/URL

function _normalize_per_scheme(url: string): string {
	let [ scheme, ...rest ] = url.split(':')
	scheme = scheme.toLowerCase()

	switch(scheme) {
		case 'mailto':
			rest = [ normalizeꓽemailⵧreasonable(url.slice('mailto:'.length)) ]
			break
		// TODO more schemes
		default:
			break
	}

	return [ scheme, ...rest ].join(':')
}

function _validate_url_structure(possible_url: string): string {

	// TODO

	return possible_url
}

const normalizeꓽurl = combine_normalizers(
	normalize_unicode,
	remove_all_spaces, // in case of typos
	_normalize_per_scheme,
	// TODO normalize URI encoding?
	_validate_url_structure,
)

/////////////////////////////////////////////////

export {
	normalizeꓽurl,
}
