import { expect } from 'chai'

import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state--prng'
import * as RichText from '@offirmo-private/rich-text-format'

import { LIB } from './consts.js'
import { create } from './reducers.js'

import {
	getꓽrecap,
} from './selectors.js'


describe(`${LIB} - recap`, function() {
	beforeEach(() => xxx_internal_reset_prng_cache())

	describe('get recap', function() {

		context('when the user has just started a new game', function() {

			it('should return an intro'/*, () => {
				const state = create()
				const doc = getꓽrecap(state.u_state)
				const str = RichText.renderⵧto_text(doc)
				expect(str).to.include('Congratulations, you were chosen')
			}*/)
		})

		context('when the user has already played', function() {

			// TODO
			it('should recap current status')
		})
	})
})
