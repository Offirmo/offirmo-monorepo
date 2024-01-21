import { StringNormalizer } from './types.js'
import { combine_normalizers, default_to } from './normalize.js'

/////////////////////////////////////////////////

const RECOMMENDED_UNICODE_NORMALIZATION = 'NFC' // https://www.win.tue.nl/~aeb/linux/uc/nfc_vs_nfd.html

const ensure_string: StringNormalizer = s => String(s)

const to_lower_case: StringNormalizer = s => s.toLowerCase()
const to_upper_case: StringNormalizer = s => s.toUpperCase()

// https://devdocs.io/javascript/global_objects/string/trim
const trim: StringNormalizer = s => s.trim()

// https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
const coerce_to_ascii: StringNormalizer = s => s
	.normalize('NFD') // D = Decompose = technique to remove non-ascii part
	.replace(/[\u0300-\u036f]/g, '')

// https://devdocs.io/javascript/global_objects/string/normalize
// https://withblue.ink/2019/03/11/why-you-need-to-normalize-unicode-strings.html
const normalize_unicode: StringNormalizer = s => {
	s = s.normalize(RECOMMENDED_UNICODE_NORMALIZATION)
	if ((s as any).toWellFormed)
		s = (s as any).toWellFormed() // https://devdocs.io/javascript/global_objects/string/iswellformed
	return s
}

// https://stackoverflow.com/a/1981366/587407
const ANY_BLANK_REGEXP = /\s+/g
const coerce_blanks_to_single_spaces: StringNormalizer = s => s.replace(ANY_BLANK_REGEXP, ' ')


const normalize_textⵧsentence: StringNormalizer = combine_normalizers(
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	trim,
)

/////////////////////////////////////////////////

export {
	RECOMMENDED_UNICODE_NORMALIZATION,

	ensure_string,

	to_lower_case,
	to_upper_case,
	trim,
	coerce_to_ascii,
	normalize_unicode,
	coerce_blanks_to_single_spaces,

	normalize_textⵧsentence,
}
