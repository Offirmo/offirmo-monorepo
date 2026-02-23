import { expect } from 'chai'

import { generate_random_demo_monster } from '@tbrpg/logic--monsters'
import rich_text_to_terminal from '@monorepo-private/rich-text-format--to-terminal'

import {
	render_monster,
} from './index.ts'
import { LIB } from './consts.ts'

/////////////////////////////////////////////////

describe(`🔠  ${LIB} - monster`, function() {

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
