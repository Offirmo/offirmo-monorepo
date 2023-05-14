import { expect } from 'chai'

import { SCHEMA_VERSION } from './consts.js'
import {
	create,
} from './index.js'
import { get_lib_SEC } from './sec'

describe('@oh-my-rpg/state-engagement - reducer', function() {

	describe('🆕  initial state', function() {

		it('should have correct defaults', function() {
			const state = create(get_lib_SEC())
			expect(state).to.deep.equal({
				schema_version: SCHEMA_VERSION,
				revision: 0,

				queue: [],
			})
		})
	})
})
