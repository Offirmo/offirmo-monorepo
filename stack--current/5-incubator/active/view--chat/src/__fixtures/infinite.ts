import * as RichText from '@offirmo-private/rich-text-format'

import {
	type StepIterator,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
} from '../loop/types.js'
import { getꓽInputStepⵧconfirmation } from '../steps/bases.js'

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

/////////////////////////////////////////////////

class ChatGenerator implements StepIterator<ContentType> {
	next(p: StepIteratorTNext<ContentType>) {
		const step = getꓽInputStepⵧconfirmation<string>({})
		return {
			value: step,
			done: false,
		} satisfies StepIteratorYieldResult<ContentType>
	}
}

/////////////////////////////////////////////////

export default ChatGenerator
