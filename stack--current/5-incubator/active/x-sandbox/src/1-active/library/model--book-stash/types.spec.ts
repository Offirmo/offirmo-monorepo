import { expect } from 'chai'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { renderꓽstateⵧprettified_text } from '../../../0-shared/view/offirmo-state/generic--to-text.ts'
import { renderꓽstateⵧrich_text } from '../../../0-shared/view/offirmo-state/generic--to-rich-text.ts'

import { LIB } from '../consts.ts'

import { EXAMPLE } from './__fixtures/index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 03 BookStash -- 01 types`, function() {

	describe('generic render -- text', function () {

		it('should work', () => {
			const str = renderꓽstateⵧprettified_text(EXAMPLE)
			console.log(str)
		})
	})

	describe('generic render -- rich text', function () {

		it('should work', () => {
			const $doc = renderꓽstateⵧrich_text(EXAMPLE)
			const str = to_terminal($doc)
			console.log(str)
		})
	})
})
