import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

/////////////////////////////////////////////////

import { filter_in_last_quoted_sentence_if_any } from './index.js'

/////////////////////////////////////////////////

describe('AI utils', () => {

	describe('filter_in_last_quoted_sentence_if_any()', () => {

		it('should work -- actual quote', () => {
			const ai_answer = ` Affirmative and Reassuring Prompt:
"Certainly! Go ahead and proceed confidently. Your efforts and hard work will guide you to success."`
			const cleaned = filter_in_last_quoted_sentence_if_any(ai_answer)

			assert.deepEqual(
				cleaned,
				'Certainly! Go ahead and proceed confidently. Your efforts and hard work will guide you to success.',
			)
		})

		it('should work -- no quote', () => {
			const ai_answer = `You should not kill your friend.`
			const cleaned = filter_in_last_quoted_sentence_if_any(ai_answer)

			assert.deepEqual(
				cleaned,
				ai_answer,
			)
		})
	})
})
