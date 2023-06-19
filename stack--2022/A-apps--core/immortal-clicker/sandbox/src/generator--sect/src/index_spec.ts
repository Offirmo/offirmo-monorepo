
import { expect } from 'chai'
import { get_engine } from '@offirmo/random'

import { LIB } from './consts.js'

import {
	get_randomꓽsect,
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {
	let engine = get_engine.for_unit_tests()

	describe('get_randomꓽsect()', function () {

		it('should work -- no hints', () => {
			for(let i = 0; i < 10; ++i) {
				const n = get_randomꓽsect(engine)
				//console.log(n)
			}
		})

	})

})
