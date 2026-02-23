import { expect } from 'chai'

import { DEMO_STATE } from '@tbrpg/state--character'
import rich_text_to_terminal from '@monorepo-private/rich-text-format--to-terminal'

import {
	render_attributes,
	render_character_sheet,
} from './index.ts'
import { LIB } from './consts.ts'

/////////////////////////////////////////////////

describe(`🔠  ${LIB} - attributes`, function() {

	describe('full character sheet rendering', function() {

		describe('demo', function() {
			it('shows off', () => {
				const $doc = render_character_sheet(DEMO_STATE)
				const str = rich_text_to_terminal($doc)
				// should just not throw
			})
		})
	})
})
