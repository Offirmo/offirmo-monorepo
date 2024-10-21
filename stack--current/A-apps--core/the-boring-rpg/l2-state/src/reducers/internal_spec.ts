import { expect } from 'chai'

import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state--prng'


import { LIB } from '../consts.js'

import {
	getꓽavailable_energy‿float,
} from '../selectors/energy.js'

import {
	_lose_all_energy,
} from './internal.js'

import {
	create,
} from './index.js'


describe(`${LIB} -- reducers -- internal`, function() {
	beforeEach(() => xxx_internal_reset_prng_cache())

	describe('_lose_all_energy', function() {

		it('should work', () => {
			let state = create()

			expect(getꓽavailable_energy‿float(state.t_state)).to.equal(7.)

			state = _lose_all_energy(state)

			expect(getꓽavailable_energy‿float(state.t_state)).to.equal(0.)
		})
	})
})
