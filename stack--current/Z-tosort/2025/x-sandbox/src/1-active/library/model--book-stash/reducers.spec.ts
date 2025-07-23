import { expect } from 'chai'

import to_terminal from '@offirmo-private/rich-text-format--to-terminal'
import { renderꓽstateⵧrich_text } from '../../../0-shared/view/offirmo-state/generic--to-rich-text.ts'

import { LIB } from '../consts.ts'

import { EXAMPLE } from './__fixtures/index.ts'

import { create } from './reducers.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 03 BookStash -- 03 reducers`, function() {

	describe('create()', function () {

		it('should work', () => {
			const $doc = renderꓽstateⵧrich_text(EXAMPLE)
			const str = to_terminal($doc)
			console.log(str)
		})
	})
})
