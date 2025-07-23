import { expect } from 'chai'

import { DEMO_STATE } from '@oh-my-rpg/state--meta'
import rich_text_to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import {
	//render_account_info,
	render_game_info,
} from './index.ts'
import { LIB } from './consts.ts'

/////////////////////////////////////////////////

describe(`🔠  ${LIB} - meta`, function() {

	describe('game infos', function() {

		it('works', () => {
			const $doc = render_game_info()
			//console.log(prettifyꓽjson($doc))
			const str = rich_text_to_terminal($doc)
			// should just not throw
			//console.log(str)
		})
	})
})
