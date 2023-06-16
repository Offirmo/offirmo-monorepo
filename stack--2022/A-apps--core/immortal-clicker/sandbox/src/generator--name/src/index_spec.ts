
import { expect } from 'chai'
import { get_engine } from '@offirmo/random'

import { LIB } from './consts.js'

import {
	get_randomꓽfirstname,
	get_randomꓽlastname,
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {
	let engine = get_engine.for_unit_tests()

	describe('getꓽlastname()', function () {

		it('should work -- no hints', () => {
			for(let i = 0; i < 10; ++i) {
				const n = get_randomꓽlastname(engine)
				//console.log(n)
			}
		})

		it('should work -- hinted -- occupation')
	})

	describe('getꓽfirstname()', function () {

		it('should work -- no hints', () => {
			for(let i = 0; i < 10; ++i) {
				const n = get_randomꓽfirstname(engine)
				//console.log(n)
			}
		})

		it('should work -- gender -- female', () => {
			for(let i = 0; i < 10; ++i) {
				const n = get_randomꓽfirstname(engine, { gender: 'female'})
				//console.log(n)
			}
		})

		it('should work -- gender -- male')
		it('should work -- gender -- neutral')
	})

})
