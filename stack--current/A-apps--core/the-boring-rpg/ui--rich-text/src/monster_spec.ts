import { expect } from 'chai'

import { generate_random_demo_monster } from '@tbrpg/logic--monsters'
import rich_text_to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import {
	render_monster,
} from './index.js'


describe('🔠  view to @offirmo-private/rich-text-format - monster', function() {

	describe('demo', function() {

		it('shows off', () => {
			for(let i = 0; i < 10; ++i) {
				const m = generate_random_demo_monster()
				const $doc = render_monster(m)
				//console.log(prettifyꓽjson($doc))
				const str = rich_text_to_terminal($doc)
				// should just not throw
			}
		})
	})
})
