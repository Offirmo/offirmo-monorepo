import { expect } from 'chai'

import to_terminal from '@offirmo-private/rich-text-format--to-terminal'
import { renderꓽstateⵧrich_text } from '../../../0-shared/view/offirmo-state/generic--to-rich-text.ts'

import { LIB } from '../consts.ts'

import { COVERS } from '../model--book/__fixtures/index.ts'

import { addꓽbook, create } from './reducers.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- Stash -- reducers`, function() {

	describe('create()', function () {

		it('should work', () => {
			let stash = create({defaultAccessLevel: 'accessⵧyes'})

			COVERS.forEach(cover => {
				stash = addꓽbook(stash, cover)
			})

			const $doc = renderꓽstateⵧrich_text(stash)
			const str = to_terminal($doc)
			console.log(str)
		})
	})
})
