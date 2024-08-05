import { StringNormalizer } from '../../types.js'
import { combineꓽnormalizers } from '../../normalize.js'
import {
	coerce_blanks_to_single_spaces,
	normalize_unicode,
	trim,
} from '../base/index.js'

/////////////////////////////////////////////////

const normalizeꓽtextⵧsentence: StringNormalizer = combineꓽnormalizers(
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	trim,
	// TODO split and reattach around punctuation
)

/////////////////////////////////////////////////

export {
	normalizeꓽtextⵧsentence,
}
