//////////////////////////////////////////////////////////////////////

import {expect} from 'chai'

import {LIB} from '../consts.js'
import {getꓽSXC} from '../sec.js'
import { DEMO_STATE } from './index.js'
import { migrate_toꓽlatest } from '../migrations/index.js'

//////////////////////////////////////////////////////////////////////

describe(`${LIB} - examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_toꓽlatest(getꓽSXC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})

//////////////////////////////////////////////////////////////////////
