import { expect } from 'chai'

import { RNGEngine } from '../../types.js'
import { get_RNGⵧMathᐧrandom } from './index.js'


describe('@offirmo/random', function() {
	let engine: RNGEngine = get_RNGⵧMathᐧrandom()

	describe('engines', function() {

		describe('Math.random()', function() {

			describe('randomness', function() {

				it('should work -- shape', () => {
					for(let i = 0; i < 100; ++i) {
						const { i: random_int32, next_engine} = engine.get_Int32()
						//console.log(random_int32)
						expect(random_int32 % 1, 'output is integer').to.equal(0)
						expect(random_int32).to.be.at.least(-0x80_000_000)
						expect(random_int32).to.be.at.most(0x7f_fff_fff)
						engine = next_engine
					}
				})

				it('should work -- randomness') // how to properly test that?
			})

			describe('immutability', function () {

				it('should work', () => {
					let immutable_random_int32 = -0 // never generated
					for(let i = 0; i < 100; ++i) {
						const { i: random_int32} = engine.get_Int32()
						if (immutable_random_int32 === -0)
							immutable_random_int32 = random_int32
						else
							expect(random_int32).to.equal(immutable_random_int32)
					}
				})
			})
		})
	})

})
