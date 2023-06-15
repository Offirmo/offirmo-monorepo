
import { expect } from 'chai'
import { get_engine } from '@offirmo/random'

import { LIB } from './consts.js'

import {
	get_randomꓽnuclear_family
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {
	let engine = get_engine.for_unit_tests()

	describe('get_randomꓽnuclear_family()', function () {

		it('should work -- no hints', () => {
			for(let i = 0; i < 10; ++i) {
				console.log(get_randomꓽnuclear_family(engine))
			}
		})

		it('should work -- hinted -- occupation')
	})
})
