
import { StringNormalizer } from '../../types.js'
import { combine_normalizers } from '../../normalize.js'
import {
	coerce_blanks_to_single_spaces,
	normalize_unicode,
	trim,
} from '../base/index.js'

/////////////////////////////////////////////////

const normalize_textⵧsentence: StringNormalizer = combine_normalizers(
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	trim,
)

/////////////////////////////////////////////////

export {
	normalize_textⵧsentence,
}
