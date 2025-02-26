import { type StringNormalizer } from '../../l1-types/types.ts'

/////////////////////////////////////////////////

// nullish => empty string
// other => String()'ed
function ensure_string(s: any): string { return String(s ?? '') }

/////////////////////////////////////////////////

// https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
const coerce_toꓽascii: StringNormalizer = s => s
	.normalize('NFD') // D = Decompose = technique to remove non-ascii part
	.replace(/[\u0300-\u036f]/g, '')

// https://devdocs.io/javascript/global_objects/string/normalize
// https://withblue.ink/2019/03/11/why-you-need-to-normalize-unicode-strings.html
const RECOMMENDED_UNICODE_NORMALIZATION = 'NFC' // https://www.win.tue.nl/~aeb/linux/uc/nfc_vs_nfd.html
const normalize_unicode: StringNormalizer = s => {
	s = s.normalize(RECOMMENDED_UNICODE_NORMALIZATION)
	if ((s as any).toWellFormed)
		s = (s as any).toWellFormed() // https://devdocs.io/javascript/global_objects/string/iswellformed
	return s
}

/////////////////////////////////////////////////

// TODO more variants https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize#value
const capitalize: StringNormalizer = s => s.length === 0
	? s
	: s[0].toUpperCase() + s.slice(1)

const to_lower_case: StringNormalizer = s => s.toLowerCase()
const to_upper_case: StringNormalizer = s => s.toUpperCase()

/////////////////////////////////////////////////

// https://devdocs.io/javascript/global_objects/string/trim
const trim: StringNormalizer = s => s.trim()

/////////////////////////////////////////////////

// https://stackoverflow.com/a/1981366/587407
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
const ANY_BLANK_REGEXP = /\s+/g
const coerce_blanks_to_single_spaces: StringNormalizer = s => s.replace(ANY_BLANK_REGEXP, ' ')

// useful to fix autocomplete after typing "."
function remove_all_spaces(s: string): string {
	return s.split(' ').join('')
}

// https://stackoverflow.com/a/19313707/587407
const ANY_DELIMITER_REGEXP = new RegExp('[-+()*/:? _\.ⵧ]', 'g')
const coerce_delimiters_to_space: StringNormalizer = s => s.replace(ANY_DELIMITER_REGEXP, ' ')

const convert_spaces_to_camel_case: StringNormalizer = s =>
		s.split(' ')
		.filter(s => !!s)
		.map(capitalize)
		.join('')

const convert_spaces_to_kebab_case: StringNormalizer = s =>
		s.split(' ')
		.filter(s => !!s)
		.join('-')


/////////////////////////////////////////////////

export {
	ensure_string,

	coerce_toꓽascii,
	RECOMMENDED_UNICODE_NORMALIZATION,
	normalize_unicode,

	capitalize,
	to_lower_case,
	to_upper_case,

	trim,

	coerce_blanks_to_single_spaces,
	remove_all_spaces,
	coerce_delimiters_to_space,
	convert_spaces_to_camel_case,
	convert_spaces_to_kebab_case,
}
