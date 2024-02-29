/* PROMPT
 */

import { combine_normalizers } from '../../normalize.js'
import {
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	coerce_toꓽascii, convert_spaces_to_kebab_case,
	to_lower_case,
	trim,
} from '../base/index.js'

/////////////////////////////////////////////////

// for files safe from unicode, spaces & case sensitivity
const coerce_toꓽsafe_basenameⵧstrictest = combine_normalizers(
	coerce_toꓽascii,
	to_lower_case,
	coerce_delimiters_to_space,
	trim,
	coerce_blanks_to_single_spaces,
	convert_spaces_to_kebab_case,
)

/////////////////////////////////////////////////

export {
	coerce_toꓽsafe_basenameⵧstrictest,
}
