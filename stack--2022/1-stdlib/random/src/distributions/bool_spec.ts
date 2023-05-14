import { expect } from 'chai'

import {
	get_random_generator_ofꓽbool,
	get_random_generator_ofꓽboolⵧweighted,
} from './bool.js'
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
				it('should work -- randomness', () => {
					const count: any = {
						ROUNDS_COUNT,
						true: 0,
						false: 0,
					}
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const random_bool = generate(engine)
						count[String(random_bool)]++
					}

					const ratioⵧtrue  = count.true / ROUNDS_COUNT
					//console.log(count, ratioⵧtrue)
					expect(ratioⵧtrue).to.be.at.within(0.48, 0.52)
				})
			})

			describe('get_random_generator_ofꓽboolⵧweighted()', function () {

				it('should work -- limits -- 0', () => {
					const generate = get_random_generator_ofꓽboolⵧweighted(0)

					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const random_bool = generate(engine)
						expect(random_bool).to.equal(false)
					}
				})

				it('should work -- limits -- 1', () => {
					const generate = get_random_generator_ofꓽboolⵧweighted(1)

					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						const random_bool = generate(engine)
						expect(random_bool).to.equal(true)
					}
				})

				;[
					0.05,
					0.3, // not perfect representation on a binary
					1/3,
					0.5,
					3/4,
				].forEach((ratio: number) => {
					const TOLERANCE = 0.02 // TODO better math

					it(`should work -- ${ratio}`, () => {
						const generate = get_random_generator_ofꓽboolⵧweighted(ratio)

						const count: any = {
							ROUNDS_COUNT,
							true: 0,
							false: 0,
						}
						for(let i = 0; i < ROUNDS_COUNT; ++i) {
							const random_bool = generate(engine)
							expect(random_bool).to.be.a('boolean')
							count[String(random_bool)]++
						}

						const ratioⵧtrue  = count.true / ROUNDS_COUNT
						//console.log(count, ratio, ratioⵧtrue)
						expect(ratioⵧtrue).to.be.at.within(ratio - TOLERANCE, ratio + TOLERANCE)
					})
				})
			})
		})
	})
})
