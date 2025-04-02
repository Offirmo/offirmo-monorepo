import { expect } from 'chai'

import { LIB, SCHEMA_VERSION } from '../consts.ts'
import {
	create,
} from './index.ts'
import { getꓽSXC } from '../utils/sec.ts'

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
