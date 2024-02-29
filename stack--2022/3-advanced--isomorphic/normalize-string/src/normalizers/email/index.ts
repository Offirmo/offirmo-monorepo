import { combine_normalizers } from '../../normalize.js'
import {
	normalize_unicode,
	remove_all_spaces,
} from '../base/index.js'

////////////////////////////////////
// general infos: https://github.com/Offirmo-team/wiki/wiki/courriel
// credits to TODO ???


////////////////////////////////////
// fragments

// inspired by the spec of https://github.com/johno/normalize-email
function _remove_plus_fragment_from_local_part(email: string): string {
	const [ local_part, domain ] = email.split('@')

	return [ local_part.split('+')[0], domain ].join('@')
}
function _remove_dots_from_local_part(email: string): string {
	const [ local_part, domain ] = email.split('@')

	return [ local_part.split('.').join(''), domain ].join('@')
}
function _lowercase_domain(email: string): string {
	const [ local_part, domain = '' ] = email.split('@')

	return [ local_part, domain.toLowerCase() ].join('@')
}
function _normalize_domain(email: string): string {
	let [ local_part, domain = '' ] = email.split('@')

	domain = domain.toLowerCase()
	if (domain === 'googlemail.com') domain = 'gmail.com'

	return [ local_part, domain ].join('@')
}

interface EmailHandlingRules {
	local_part_case_sensitive?: boolean
	plus_fragment_sensitive?: boolean
	dots_sensitive?: boolean
}
const RULES: { [domain: string]: EmailHandlingRules } = {
	'gmail.com': {
		local_part_case_sensitive: false,
		plus_fragment_sensitive: false,
		dots_sensitive: false,
	},
	'hotmail.com': {
		local_part_case_sensitive: undefined,
		plus_fragment_sensitive: false,
		dots_sensitive: true,
	},
	'live.com': {
		local_part_case_sensitive: undefined,
		plus_fragment_sensitive: false,
		dots_sensitive: false,
	},
	'outlook.com': {
		local_part_case_sensitive: undefined,
		plus_fragment_sensitive: false,
		dots_sensitive: true,
	},
}

function _remove_plus_fragment_from_local_part_if_insensitive(email: string): string {
	const [ local_part, domain ] = email.split('@')
	//console.log('_remove_plus_fragment_from_local_part_if_insensitive', domain, RULES[domain])

	if (RULES[domain]?.plus_fragment_sensitive === false)
		return _remove_plus_fragment_from_local_part(email)

	return email
}
function _remove_dots_from_local_part_if_insensitive(email: string): string {
	const [ local_part, domain ] = email.split('@')

	if (RULES[domain]?.dots_sensitive === false)
		return _remove_dots_from_local_part(email)

	return email
}
function _lowercase_local_part_if_insensitive(email: string): string {
	const [ local_part, domain ] = email.split('@')

	if (!RULES[domain]?.local_part_case_sensitive) // default to true
		return email.toLowerCase()

	return email
}

/////////////////////
// extras from me

function _validate_email_structure(possible_email: string): string {
	const [ before, after, ...rest] = possible_email.split('@')
	//console.log({before, after, rest, ta: typeof after})

	if (rest.length)
		throw new Error('Invalid email: more than one @!')
	if (typeof after !== 'string')
		throw new Error('Invalid email: no @!')
	if (after.split('.').length < 2)
		throw new Error('Invalid email: bad domain!')
	if (!before.length || !after.length)
		throw new Error('Invalid email: bad structure!')

	return possible_email
}

////////////////////////////////////
// We need different levels of normalization
// for ex. using "+" foo+test@gmail.com is not known and very likely to be an attempt to double register
// however using "." foo.bar@gmail.com is well known and not all pp know it can be removed
// normalizing too hard prevents us from using gravatar
// ex. offirmo.net@gmail.com is not matching gravatar offirmonet@gmail.com

const normalizeꓽemailⵧsafe = combine_normalizers(
	normalize_unicode,
	remove_all_spaces,
	_validate_email_structure,
	_lowercase_domain,
)

const normalizeꓽemailⵧreasonable = combine_normalizers(
	normalize_unicode,
	remove_all_spaces,
	_validate_email_structure,
	_normalize_domain,
	_remove_plus_fragment_from_local_part_if_insensitive,
	_lowercase_local_part_if_insensitive,
)

const normalizeꓽemailⵧfull = combine_normalizers(
	normalize_unicode,
	remove_all_spaces,
	_validate_email_structure,
	_normalize_domain,
	_remove_plus_fragment_from_local_part_if_insensitive,
	_remove_dots_from_local_part_if_insensitive,
	_lowercase_local_part_if_insensitive,
)

/////////////////////////////////////////////////

export {
	normalizeꓽemailⵧsafe,
	normalizeꓽemailⵧreasonable,
	normalizeꓽemailⵧfull,
}
