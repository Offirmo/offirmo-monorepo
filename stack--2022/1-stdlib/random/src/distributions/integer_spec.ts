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

			function itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(engine_ctor: () => RNGEngine, possible_output_count: number) {

				it(`should work -- range = 1 - ${possible_output_count} (0 - 0x${Number(possible_output_count - 1).toString(16)})`, () => {
					let engine: RNGEngine = engine_ctor()
					const generate = get_random_generator_ofꓽintegerⵧbetween(1, possible_output_count)

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
						expect(val).to.be.at.most(possible_output_count)

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
						mean_lb: (1 + possible_output_count) * 0.49,
						mean,
						mean_ub: (1 + possible_output_count) * 0.51,
						max,
						spread: spread.size,
					})
					// min should be ~close to the absolute minimum
					expect(min, 'min lower bound').to.be.at.least(1)
					expect(min, 'min upper bound').to.be.at.most(1 + possible_output_count * 0.05)

					// similarly, max should be ~close to the absolute maximum
					expect(max, 'max upper bound').to.be.at.most(possible_output_count)
					expect(max, 'max lower bound').to.be.at.least(possible_output_count * 0.95)

					// the mean should be ~close to 0
					expect(mean, 'mean lower bound').to.be.at.least((1 + possible_output_count) * 0.49)
					expect(mean, 'mean upper bound').to.be.at.most((1 + possible_output_count) * 0.51)

					// the buckets should be balanced
					// TODO refine the margin
					if (possible_output_count < ROUNDS_COUNT) {
						expect(spread.size).to.equal(possible_output_count)
					}
					else {
						expect(spread.size).to.equal(ROUNDS_COUNT)
					}
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
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 0x8000_0000)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 0xFFFF_FFFF)
				itᐧshouldᐧbeᐧaᐧvalidᐧintegerᐧgenerator(get_RNG, 0xFFFF_FFFF + 1) // power of 2

				it('should reject ranges > 32 bits', () => {
					expect(() => get_random_generator_ofꓽintegerⵧbetween(0, 0xFFFF_FFFF + 1)).to.throw('Range error')
				})
			})
		})
	})
})
