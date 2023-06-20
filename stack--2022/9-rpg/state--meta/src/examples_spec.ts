/////////////////////

import { expect } from 'chai'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { getꓽlib_SEC } from './sec.js'
import { DEMO_STATE } from './examples.js'
import { migrate_to_latest } from './migrations.js'

/////////////////////

describe(`${LIB} - examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			expect(DEMO_STATE.schema_version).to.equal(SCHEMA_VERSION)
			const migrated = migrate_to_latest(get_lib_SEC(), DEMO_STATE)
			expect(migrated).to.deep.equal(DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})
