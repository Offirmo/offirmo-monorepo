import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { getꓽSEC } from '../../services/sec.js'

import create from './index.js'

import { itᐧshouldᐧbeᐧaᐧstandardᐧstore } from '../_spec.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe.only('Store -- in-memory', function () {

		describe('creation', function() {

			it('should work', () => {
				const store = create(
					getꓽSEC(),
					(state, action) => state
				)
			})
		})

		describe('store interface', function() {

			itᐧshouldᐧbeᐧaᐧstandardᐧstore(() => create(
				getꓽSEC(),
				(state, action) => {
					return {
						...state,
						revision: state.revision + 1,
					}
				}
			))
		})
	})
})
