import { expect } from 'chai'

import { get_random_generator_ofꓽbool } from './distributions.js'
import { RNGEngine } from './types.js'
import { get_RNGⵧMathᐧrandom } from './engines/MathRandom/index.js'
import { ROUNDS_COUNT } from './_test_helpers.js'


describe('@offirmo/random', function() {
	let engine: RNGEngine = get_RNGⵧMathᐧrandom()
	before(function () {

	})


	describe('distributions', function() {

		describe('bool', function() {

			describe('basic: get_random_generator_ofꓽbool()', function() {
				const generate = get_random_generator_ofꓽbool()

				it('should work -- shape', () => {
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const { result: random_bool, next_engine} = generate(engine)
						//console.log(random_bool)
						expect(random_bool).to.be.a('boolean')
						engine = next_engine
					}
				})

				// how to properly test that?
				it('should work -- randomness', () => {
					const count: any = {
						true: 0,
						false: 0,
					}
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const { result: random_bool, next_engine} = generate(engine)
						count[String(random_bool)]++
						engine = next_engine
					}

					const ratio = Math.abs(1 - count.false / count.true)
					//console.log(count, count.false / count.true, ratio)
					expect(ratio).to.be.at.most(0.25) // THE HORROR I know 😭
				})


				it('should work -- immutability', () => {
					let immutable_random_bool = generate(engine).result
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const { result: random_bool, next_engine} = generate(engine)
						expect(random_bool).to.equal(immutable_random_bool)
					}
				})
			})
		})
	})

})
