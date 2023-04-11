import { expect } from 'chai'

import { get_random_generator_ofꓽbool } from './bool.js'
import { RNGEngine } from '../types.js'
import { get_RNGⵧMathᐧrandom } from '../engines/MathRandom/index.js'
import { ROUNDS_COUNT } from '../_test_helpers.js'


describe('@offirmo/random', function() {
	let engine: RNGEngine = get_RNGⵧMathᐧrandom()
	
	describe('distributions', function() {

		describe('bool', function() {

			describe('basic: get_random_generator_ofꓽbool()', function() {
				const generate = get_random_generator_ofꓽbool()

				it('should work -- shape', () => {
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const random_bool = generate(engine)
						//console.log(random_bool)
						expect(random_bool).to.be.a('boolean')
					}
				})

				// how to properly test that?
				// TODO buckets
				it('should work -- randomness', () => {
					const count: any = {
						true: 0,
						false: 0,
					}
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const random_bool = generate(engine)
						count[String(random_bool)]++
					}

					const ratio = Math.abs(1 - count.false / count.true)
					//console.log(count, count.false / count.true, ratio)
					expect(ratio).to.be.at.most(0.25) // THE HORROR I know 😭
				})
			})
		})
	})
})
