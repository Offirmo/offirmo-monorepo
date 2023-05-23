import { expect } from 'chai'
import stripAnsi from 'strip-ansi'

import {
	create,
	play,
	get_achievements_snapshot,
} from '@tbrpg/state'

import rich_text_to_ansi from '@offirmo-private/rich-text-format--to-ansi'

import { render_achievements_snapshot } from './index.js'


describe('🔠  view to @offirmo-private/rich-text-format - achievements', function() {

	it('should render properly - demo', () => {
		const state = play(create())

		const $doc = render_achievements_snapshot(get_achievements_snapshot(state.u_state))
		//console.log(prettify_json($doc))
		const str = rich_text_to_ansi($doc)
		console.log(str)
		expect(str).to.be.a('string')
	})
})
