
import { expect } from 'chai'
import { getꓽengine } from '@offirmo/random'

import { LIB } from './consts.js'

import {
	get_randomꓽnuclear_family
} from './index.js'
import * as console from 'console'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {
	let engine = getꓽengine.for_unit_tests()

	describe('get_randomꓽnuclear_family()', function () {

		it('should work -- no hints', () => {
			for(let i = 0; i < 10; ++i) {
				const n = get_randomꓽnuclear_family(engine)
				//console.log(n)
			}
		})

		it('should work -- hinted -- occupation')
	})
})
