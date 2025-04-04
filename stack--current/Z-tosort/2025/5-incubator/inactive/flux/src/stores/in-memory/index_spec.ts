import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { getꓽSXC } from '../../services/sec.js'

import create from './index.js'

import { itᐧshouldᐧbeᐧaᐧstandardᐧstore } from '../_spec.js'
import * as DemoStateLib from '../../_test/state-demo'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('Store -- in-memory', function () {
		function reduceꓽaction(state: any, action: any): any {
			return {
				...state,
				revision: state.revision + 1,
			}
		}

		describe('creation', function() {

			it('should work', () => {
				const store = create({
					SXC: getꓽSXC(),
					reduceꓽaction,
				})
			})
		})

		describe('store interface', function() {

			itᐧshouldᐧbeᐧaᐧstandardᐧstore((DemoStateLib) => create({
				SXC: getꓽSXC(),
				reduceꓽaction: DemoStateLib.reduceꓽaction,
			}))
		})
	})
})
