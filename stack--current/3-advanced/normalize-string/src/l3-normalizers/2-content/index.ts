import { StringNormalizer } from '../../l1-types/types.ts'
import { combineꓽnormalizers } from '../../l2-core/normalize.ts'
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
