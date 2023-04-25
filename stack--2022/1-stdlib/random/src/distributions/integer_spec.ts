import { expect } from 'chai'

import { RNGEngine } from '../types.js'
import { get_RNGⵧMathᐧrandom } from '../engines/MathRandom/index.js'
import { get_RNGⵧISAAC32 } from '../engines/ISAAC/index.js'
import { ROUNDS_COUNT } from '../_test_helpers.js'
import { get_random_generator_ofꓽintegerⵧbetween } from './integer.js'


describe('@offirmo/random', function() {
	const get_RNG = get_RNGⵧMathᐧrandom
	let engine: RNGEngine = get_RNG()

	describe('distributions', function() {

		describe('integer', function() {

			function itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(engine_ctor: () => RNGEngine, range_size: number) {

				it(`should work -- range size = ${range_size}`, () => {
					let engine: RNGEngine = engine_ctor()
					const generate = get_random_generator_ofꓽintegerⵧbetween(1, range_size)

					let min = Number.MAX_SAFE_INTEGER
					let max = Number.MIN_SAFE_INTEGER
					let mean = 0
					let count = 0
					let spread = new Set<number>()
					for (let i = 0; i < ROUNDS_COUNT; ++i) {
						const val = generate(engine)
						//console.log(val)

						// shape
						expect(Number.isInteger(val)).to.be.true
						expect(val).to.be.at.least(1)
						expect(val).to.be.at.most(range_size)

						// balance and spread
						min = Math.min(min, val)
						max = Math.max(max, val)
						mean = (mean * count + val) / (count + 1)
						spread.add(val) // TODO bucketing
						count++


						// pattern
					}

					console.log({
						count,
						min,
						mean_lb: (1 + range_size) * 0.45,
						mean,
						mean_ub: (1 + range_size) * 0.55,
						max,
						spread: spread.size,
					})
					// min should be ~close to the absolute minimum
					expect(min, 'min lower bound').to.be.at.least(1)
					expect(min, 'min upper bound').to.be.at.most(1 + range_size * 0.1)

					// similarly, max should be ~close to the absolute maximum
					expect(max, 'max upper bound').to.be.at.most(range_size)
					expect(max, 'max lower bound').to.be.at.least(range_size * 0.9)

					// the mean should be ~close to 0
					expect(mean, 'mean lower bound').to.be.at.least((1 + range_size) * 0.45)
					expect(mean, 'mean upper bound').to.be.at.most((1 + range_size) * 0.55)

					// the buckets should be balanced
					expect(spread.size).to.equal(range_size)
					// TODO
				})
			}

			describe('get_random_generator_ofꓽintegerⵧbetween()', function() {

				it('should work -- range size = 1 = constant', () => {
					const generate = get_random_generator_ofꓽintegerⵧbetween(-5, -5)

					expect(generate(engine)).to.equal(-5)
					expect(generate(engine)).to.equal(-5)
					expect(generate(engine)).to.equal(-5)
				})

				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 2)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 3)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 4)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 5)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 7)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 255) // -1
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 256) // power of 2
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 257) // +1
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 0xFFFFFFFF)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 0xFFFFFFFFFF)
/*
				it('should work -- range size = 2', () => {
					const generate = get_random_generator_ofꓽintegerⵧbetween(1, 2)

					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const val = generate(engine)
						expect(val === 1 || val === 2).to.be.true
					}
				})

				it.only('should work -- range size = 3', () => {
					const generate = get_random_generator_ofꓽintegerⵧbetween(1, 3)

					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const val = generate(engine)
						console.log(val)
						expect(val === 1 || val === 2|| val === 3).to.be.true
					}
				})*/

				// how to properly test that?
				// TODO buckets
				/*it('should work -- randomness', () => {
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
				})*/
			})
		})
	})
})
