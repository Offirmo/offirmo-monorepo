import { StringNormalizer } from './types.js'

import {
	default_to_empty,
	ensure_string,
	capitalize,
	to_lower_case,
	to_upper_case,
	trim,
	coerce_to_ascii,
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	convert_spaces_to_camel_case,
	convert_spaces_to_snake_case,
	coerce_to_safe_nickname,
	coerce_to_redeemable_code,
	coerce_to_safe_basenameⵧstrictest,
} from './normalizers--base.js'

import {
	normalizeꓽemailⵧsafe,
	normalizeꓽemailⵧreasonable,
	normalizeꓽemailⵧfull,
} from './normalizer--email.js'

/////////////////////

// TODO refactor this ugly mistyped thing
// we should use import * from instead
export const NORMALIZERS: Readonly<{ [key: string]: StringNormalizer }> = {
	default_to_empty,
	ensure_string,
	capitalize,
	to_lower_case,
	to_upper_case,
	trim,
	coerce_to_ascii,
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	convert_spaces_to_camel_case,
	convert_spaces_to_snake_case,
	coerce_to_safe_nickname,
	coerce_to_redeemable_code,
	coerce_to_safe_basenameⵧstrictest,
	normalizeꓽemailⵧsafe,
	normalizeꓽemailⵧreasonable,
	normalizeꓽemailⵧfull,
}

export * from './normalizers--base.js'
export * from './normalizer--email.js'

/////////////////////
