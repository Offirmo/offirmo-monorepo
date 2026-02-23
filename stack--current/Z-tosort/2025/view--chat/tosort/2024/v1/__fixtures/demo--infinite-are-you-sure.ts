import * as RichText from '@monorepo-private/rich-text-format'

import {
	type StepIterator,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	getꓽInputStepⵧconfirmation,
} from '../index.js'

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
