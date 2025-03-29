import { expect } from 'chai'

import {
	create,
	play,
	getꓽachievements_snapshot,
} from '@tbrpg/state'

import rich_text_to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { render_achievements_snapshot } from './index.ts'


describe('🔠  view to @offirmo-private/rich-text-format - achievements', function() {

	it('should render properly - demo', () => {
		const state = play(create())

		const $doc = render_achievements_snapshot(getꓽachievements_snapshot(state.u_state))
		//console.log(prettifyꓽjson($doc))
		const str = rich_text_to_terminal($doc)
		//console.log(str)
		expect(str).to.be.a('string')
		expect(str).to.include('Achievements')
		expect(str).to.include('✔')
		expect(str).to.include('???')
	})
})
