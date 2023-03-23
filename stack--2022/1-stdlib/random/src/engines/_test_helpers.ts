import { expect } from 'chai'

import { ROUNDS_COUNT } from '../_test_helpers.js'
import { RNGEngine } from '../types.js'

export const INT32_MIN = -0x80_000_000
export const INT32_MAX =  0x7f_fff_fff

export function itᐧshouldᐧbeᐧaᐧvalidᐧengine(engine_ctor: () => RNGEngine) {
	let engine = engine_ctor()

	describe(`interface variant: ${engine.is_mutating() ? 'mutating' : 'immutable'}`, function () {

		describe('output', function () {

			it('should have the correct shape', () => {
				for(let i = 0; i < ROUNDS_COUNT; ++i) {
					const { i: random_int32, next_engine} = engine.get_Int32()
					//console.log(random_int32)
					expect(random_int32 % 1, 'output is integer').to.equal(0)
					expect(random_int32).to.be.at.least(INT32_MIN)
					expect(random_int32).to.be.at.most(INT32_MAX)
					engine = next_engine
				}
			})

			it('should be decently random', () => {
				let min = -0
				let max = 0
				let mean = 0
				let count = 0
				let spread = new Set<number>()

				for(let i = 0; i < ROUNDS_COUNT; ++i) {
					const { i: random_int32, next_engine} = engine.get_Int32()

					spread.add(random_int32)
					min = Math.min(min, random_int32)
					max = Math.max(max, random_int32)
					mean = (mean * count + random_int32) / (count + 1)
					count++

					engine = next_engine
				}

				/*console.log({
					count,
					min,
					max,
					mean,
					spread: spread.size,
				})*/

				// min should be ~close to the absolute minimum
				expect(min, 'min lower bound').to.be.at.least(INT32_MIN)
				expect(min, 'min upper bound').to.be.at.most(INT32_MIN * 0.8)

				// similarly, max should be ~close to the absolute maximum
				expect(max, 'max upper bound').to.be.at.most(INT32_MAX)
				expect(max, 'max lower bound').to.be.at.least(INT32_MAX * 0.8)

				// the mean should be ~close to 0
				expect(mean, 'mean lower bound').to.be.at.least(INT32_MIN * 0.1)
				expect(mean, 'mean upper bound').to.be.at.most(INT32_MAX * 0.1)

				// the values should not repeat too much
				expect(spread.size).to.be.at.least(ROUNDS_COUNT * 0.9)
			})
		})

		describe(`immutability${engine.is_mutating() ? ' (NOT)' : ''}`, function() {

			it(`should work -- ${engine.is_mutating() ? 'always mutating' : 'mutating only on demand'}`, () => {
				let spread = new Set<number>()

				for(let i = 0; i < ROUNDS_COUNT / 10; ++i) {
					let immutable_random_int32 = -0 // never generated

					for(let j = 0; j < 10; ++j) {
						const { i: random_int32} = engine.get_Int32()
						spread.add(random_int32)

						if (immutable_random_int32 === -0)
							immutable_random_int32 = random_int32
						else {
							if (!engine.is_mutating())
								expect(random_int32).to.equal(immutable_random_int32)
						}
					}

					engine = engine.get_Int32().next_engine // accept the mutation
				}

				if (engine.is_mutating()) {
					// all values should be well spread
					expect(spread.size).to.be.at.most(ROUNDS_COUNT)
					expect(spread.size).to.be.at.least(ROUNDS_COUNT * 0.9)
				}
				else {
					// there should be 1/10 spread
					expect(spread.size).to.be.at.most(ROUNDS_COUNT / 10)
					expect(spread.size).to.be.at.least(ROUNDS_COUNT / 10 * 0.9)
				}
			})
		})
	})
}
