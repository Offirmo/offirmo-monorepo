import { expect } from 'chai'

import { LIB, SCHEMA_VERSION } from '../consts.js'
import {
	create,
} from './index.js'
import { getꓽSXC } from '../sec.js'

//////////////////////////////////////////////////////////////////////

describe(`${LIB} - reducers`, function() {

	describe('🆕  create()', function() {

		it('should have correct defaults', function() {
			const state = create(getꓽSXC())
			expect(state).to.deep.equal({
				schema_version: SCHEMA_VERSION,
				revision: 0,

				queue: [],
			})
		})
	})

	// TODO test other reducers
})
