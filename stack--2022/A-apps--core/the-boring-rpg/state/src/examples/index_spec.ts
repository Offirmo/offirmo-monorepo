/////////////////////

import { expect } from 'chai'

import { LIB } from '../consts.js'
import { getꓽSEC } from '../services/sec.js'
import { migrate_to_latest } from '../migrations/index.js'

import { DEMO_STATE } from './index.js'

/////////////////////

describe(`${LIB} - examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_to_latest(getꓽSEC(), DEMO_STATE)
			expect(migrated).to.deep.equal(DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE) // also, since immutable
		})
	})
})
