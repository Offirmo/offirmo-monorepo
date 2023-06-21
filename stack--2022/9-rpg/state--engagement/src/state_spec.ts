//////////////////////////////////////////////////////////////////////

import { expect } from 'chai'

import { SCHEMA_VERSION } from './consts.js'
import {
	create,
} from './index.js'
import { getꓽSEC } from './sec.js'

//////////////////////////////////////////////////////////////////////

describe('@oh-my-rpg/state-engagement - state', function() {

	describe('🆕  create()', function() {

		it('should have correct defaults', function() {
			const state = create(getꓽSEC())
			expect(state).to.deep.equal({
				schema_version: SCHEMA_VERSION,
				revision: 0,

				queue: [],
			})
		})
	})
})
