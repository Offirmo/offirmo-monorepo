//////////////////////////////////////////////////////////////////////

import {expect} from 'chai'

import {LIB} from './consts.js'
import {getꓽSEC} from './sec.js'
import { DEMO_STATE } from './examples.js'
import { migrate_to_latest } from './migrations.js'

//////////////////////////////////////////////////////////////////////

describe(`${LIB} - examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_to_latest(getꓽSEC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})

//////////////////////////////////////////////////////////////////////
