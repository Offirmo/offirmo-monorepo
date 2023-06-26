import { expect } from 'chai'

import { DEMO_STATE } from '@oh-my-rpg/state-meta'
import rich_text_to_ansi from '@offirmo-private/rich-text-format--to-ansi'

import {
	render_account_info,
} from './index.js'


describe('🔠  view to @offirmo-private/rich-text-format - meta', function() {

	describe('demo', function() {
		it('shows off', () => {
			const $doc = render_account_info(DEMO_STATE)
			//console.log(prettifyꓽjson($doc))
			const str = rich_text_to_ansi($doc)
			// should just not throw
		})
	})
})
