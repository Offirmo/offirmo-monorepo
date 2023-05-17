/////////////////////

import { expect } from 'chai'

import { LIB } from './consts.js'
import { get_lib_SEC } from './sec.js'
import { DEMO_U_STATE, DEMO_T_STATE } from './examples.js'
import { migrate_to_latest } from './migrations.js'

/////////////////////

describe(`${LIB} - examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const [ migrated_u_state, migrated_t_state ] = migrate_to_latest(get_lib_SEC(), [ DEMO_U_STATE, DEMO_T_STATE ])
			expect(migrated_u_state).to.equal(DEMO_U_STATE)
			expect(migrated_t_state).to.equal(DEMO_T_STATE)
		})
	})
})
