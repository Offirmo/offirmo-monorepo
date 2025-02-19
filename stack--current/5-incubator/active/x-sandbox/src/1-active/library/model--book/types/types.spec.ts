import { expect } from 'chai'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { LIB } from '../../consts.ts'

import { renderꓽstateⵧprettified_text } from '../../../../0-shared/view/offirmo-state/generic--to-text.ts'
import { renderꓽstateⵧrich_text } from '../../../../0-shared/view/offirmo-state/generic--to-rich-text.ts'

import { COVERS } from '../../__fixtures/index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 01 Book -- 01 types`, function() {

	describe('generic render -- text', function () {

		it('should work', () => {
			COVERS.forEach(cover => {
				const str = renderꓽstateⵧprettified_text(cover)
				//console.log(str)
			})
		})
	})

	describe('generic render -- rich text', function () {

		it('should work', () => {
			COVERS.forEach(cover => {
				const $doc = renderꓽstateⵧrich_text(cover)
				const str = to_terminal($doc)
				//console.log(str)
			})
		})
	})
})
