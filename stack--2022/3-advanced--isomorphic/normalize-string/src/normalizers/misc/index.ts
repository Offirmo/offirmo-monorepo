
import { combine_normalizers, default_to } from '../../normalize.js'
import {
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	coerce_toꓽascii, convert_spaces_to_camel_case, convert_spaces_to_kebab_case,
	to_lower_case, to_upper_case,
	trim,
} from '../base/index.js'

/////////////////////////////////////////////////

const coerce_toꓽtokens = combine_normalizers(
	coerce_toꓽascii,
	to_lower_case,
	coerce_delimiters_to_space,
	trim,
	coerce_blanks_to_single_spaces,
)

const coerce_toꓽredeemable_code = combine_normalizers(
	coerce_toꓽtokens,
	convert_spaces_to_camel_case,
	to_upper_case,
)

const normalizeꓽIETFLanguageType = combine_normalizers(
	coerce_toꓽascii,
	to_lower_case,
	coerce_delimiters_to_space,
	trim,
	convert_spaces_to_kebab_case,
	default_to('en'),
	// that's all we can do, it's complicated https://en.wikipedia.org/wiki/IETF_language_tag
)

/////////////////////////////////////////////////

export {
	coerce_toꓽtokens,
	coerce_toꓽredeemable_code,
	normalizeꓽIETFLanguageType,
}
