import { expect } from 'chai'

import { ROUNDS_COUNT } from '../_test_helpers.js'
import { RNGEngine, Int32, PRNGEngine, PRNGState } from '../types.js'
import { Immutable } from '../embedded-deps/types/index.js'
import { assert } from '../embedded-deps/assert/index.js'

export const INT32_MIN = -0x8000_0000
export const INT32_MAX =  0x7fff_ffff


export function itᐧshouldᐧbeᐧaᐧvalidᐧengine(engine_ctor: () => RNGEngine) {
	let engine: RNGEngine | PRNGEngine = engine_ctor()

	describe('output', function () {

		it('should have the correct shape', () => {
			for(let i = 0; i < ROUNDS_COUNT; ++i) {
				const random_int32 = engine.get_Int32()
				//console.log(random_int32)
				expect(random_int32 % 1, 'output is integer').to.equal(0)
				expect(random_int32).to.be.at.least(INT32_MIN)
				expect(random_int32).to.be.at.most(INT32_MAX)
			}
		})

		it('should be decently balanced and spread', () => {
			let min = -0
			let max = 0
			let mean = 0
			let count = 0
			let spread = new Set<number>()

			for(let i = 0; i < ROUNDS_COUNT; ++i) {
				const random_int32 = engine.get_Int32()

				spread.add(random_int32)
				min = Math.min(min, random_int32)
				max = Math.max(max, random_int32)
				mean = (mean * count + random_int32) / (count + 1)
				count++
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
			expect(min, 'min upper bound').to.be.at.most(INT32_MIN * 0.9)

			// similarly, max should be ~close to the absolute maximum
			expect(max, 'max upper bound').to.be.at.most(INT32_MAX)
			expect(max, 'max lower bound').to.be.at.least(INT32_MAX * 0.9)

			// the mean should be ~close to 0
			expect(mean, 'mean lower bound').to.be.at.least(INT32_MIN * 0.1)
			expect(mean, 'mean upper bound').to.be.at.most(INT32_MAX * 0.1)

			// the values should not repeat too much
			expect(spread.size).to.be.at.least(ROUNDS_COUNT * 0.9)
		})
	})

	describe('internals', function () {

		it('should allow several instances to be used independently')

		if (engine.is_prng()) {
			assert(engine.is_prng(), 'temp')

			describe('seeding', function () {

				context('when no seed is provided', function () {

					it('should auto-seed properly (non repeatable, enough randomness)', function () {
						let e1 = engine_ctor()
						let e2 = engine_ctor()
						let e3 = engine_ctor()
						let p1: Int32 = -0

						let unexpected_equalities = 0
						for(let i = 0; i < ROUNDS_COUNT; ++i) {
							let i1 = e1.get_Int32()
							let i2 = e2.get_Int32()
							let i3 = e3.get_Int32()

							if (i2 === i1) unexpected_equalities++
							if (i3 === i1) unexpected_equalities++
							if (p1 !== -0) {
								if (i1 === p1) unexpected_equalities++
								if (i2 === p1) unexpected_equalities++
								if (i3 === p1) unexpected_equalities++
							}
							p1 = i1
						}

						//console.log(unexpected_equalities, ROUNDS_COUNT * 0.001 * 2.5)
						expect(unexpected_equalities, 'equal results between randomly seeded different engines').to.be.at.most(ROUNDS_COUNT * 0.001 * 2.5)
					})
				})

				context('when a seed is provided', function () {

					it('should affect the output', function() {
						const seed = 'Hello, world!'
						let e1 = engine_ctor() as PRNGEngine
						e1.seed([]) // no seed
						let e2 = engine_ctor() as PRNGEngine
						e2.seed(seed)
						let e3 = engine_ctor() as PRNGEngine
						e3.seed([...seed].reverse().join(''))

						let unexpected_equalities = 0
						for(let i = 0; i < ROUNDS_COUNT; ++i) {
							let i1 = e1.get_Int32()
							let i2 = e2.get_Int32()
							let i3 = e3.get_Int32()

							if (i2 === i1) unexpected_equalities++
							if (i3 === i1) unexpected_equalities++
						}

						expect(unexpected_equalities, 'unexpected equal results').to.be.at.most(ROUNDS_COUNT * 0.001)
					})

					it('should provide a stable, repeatable output', function () {
						const seed = 'Hello, world!'
						let e1 = engine_ctor() as PRNGEngine
						e1.seed(seed)
						let e2 = engine_ctor() as PRNGEngine
						e2.seed(seed)
						let e3 = engine_ctor() as PRNGEngine
						e3.seed(seed)
						let p1: Int32 = -0

						let expected_equalities = 0
						let unexpected_equalities = 0
						for(let i = 0; i < ROUNDS_COUNT; ++i) {
							let i1 = e1.get_Int32()
							let i2 = e2.get_Int32()
							let i3 = e3.get_Int32()

							if (i2 === i1) expected_equalities++
							if (i3 === i1) expected_equalities++
							if (p1 !== -0) {
								if (i1 === p1) unexpected_equalities++
								if (i2 === p1) unexpected_equalities++
								if (i3 === p1) unexpected_equalities++
							}
							p1 = i1
						}

						//console.log(expected_equalities, unexpected_equalities, ROUNDS_COUNT * 0.001 * 2.5)
						expect(expected_equalities, 'expected equal results between equally seeded different engines').to.equal(ROUNDS_COUNT * 2)
						expect(unexpected_equalities, 'unexpected equal results').to.be.at.most(ROUNDS_COUNT * 0.001 * 2.5)
					})

					it('should use the provided seed appropriately')
				})
			})

			describe('state save & restore', function () {
				const TEST_ROUNDS = 256*2 + 1 // ISAAC has a 256 entries buffer, we need twice that+1 to test the limits

				const TEST_STATE: Immutable<PRNGState> = {
					seed: 'From a small seed a mighty trunk may grow', // https://www.brainyquote.com/quotes/aeschylus_398833
					call_count: 1234,
				}

				it('should work by producing repeatable output', () => {
					let e1 = engine_ctor()
					let e2 = engine_ctor()
					;(e2 as PRNGEngine).set_state(TEST_STATE)
					let e3 = engine_ctor()
					;(e3 as PRNGEngine).set_state(TEST_STATE)

					let expected_equalities = 0
					let unexpected_equalities = 0
					for(let i = 0; i < ROUNDS_COUNT; ++i) {
						let i1 = e1.get_Int32()
						let i2 = e2.get_Int32()
						let i3 = e3.get_Int32()

						if (i2 === i1) unexpected_equalities++
						if (i3 === i1) unexpected_equalities++
						if (i2 === i3) expected_equalities++
					}

					//console.log(expected_equalities, unexpected_equalities, ROUNDS_COUNT * 0.001 * 2.5)
					expect(expected_equalities, 'expected equal results between equally seeded different engines').to.equal(ROUNDS_COUNT)
					expect(unexpected_equalities, 'unexpected equal results').to.be.at.most(ROUNDS_COUNT * 0.001 * 2)
				})

				describe('get_state', function () {

					it('should work', () => {
						const e = engine as PRNGEngine
						let { seed } = e.get_state()

						// TODO update number above to match other engines
						for (let i = 0; i < TEST_ROUNDS; ++i, e.get_Int32()) {
							const s = e.get_state()
							expect(s.call_count, String(i)).to.equal(i)
							expect(s.seed).to.deep.equal(seed)
						}
					})
				})

				describe('set_state', function () {

					it('should work', () => {
						const e_ref = engine as PRNGEngine
						e_ref.set_state({...TEST_STATE, call_count: 0})
						let { seed } = e_ref.get_state()

						const e_reused = engine_ctor() as PRNGEngine
						e_reused.set_state({...TEST_STATE, call_count: 0})

						for (let i = 0; i < TEST_ROUNDS; ++i) {
							const s = e_ref.get_state()
							e_reused.set_state(s)
							const e_new = (engine_ctor() as PRNGEngine).set_state(s)

							expect(e_reused.get_state()).to.deep.equal(e_ref.get_state())
							expect(e_new.get_state()).to.deep.equal(e_ref.get_state())

							expect(s.call_count, String(i)).to.equal(i)
							expect(s.seed).to.deep.equal(TEST_STATE.seed)

							let i_ref = e_ref.get_Int32()
							let i_reused = e_reused.get_Int32()
							let i_new = e_new.get_Int32()

							expect(i_reused).to.equal(i_ref)
							expect(i_new).to.equal(i_ref)
						}
					})
				})

				it('should be reflexive', () => {
					let e = engine as PRNGEngine

					// try limits
					e.set_state({...TEST_STATE, call_count: 0})
					expect(e.get_state(), '0').to.deep.equal({...TEST_STATE, call_count: 0})
					e.set_state({...TEST_STATE, call_count: 1})
					expect(e.get_state(), '1').to.deep.equal({...TEST_STATE, call_count: 1})
					e.set_state({...TEST_STATE, call_count: 255})
					expect(e.get_state(), '255').to.deep.equal({...TEST_STATE, call_count: 255})
					e.set_state({...TEST_STATE, call_count: 256})
					expect(e.get_state(), '256').to.deep.equal({...TEST_STATE, call_count: 256})
					e.set_state({...TEST_STATE, call_count: 257})
					expect(e.get_state(), '257').to.deep.equal({...TEST_STATE, call_count: 257})

					e.set_state(TEST_STATE)
					expect(e.get_state(), 'xyz').to.deep.equal(TEST_STATE)
				})


				it('should not take too much time to restore', function() {
					const OLD_STATE: Immutable<PRNGState> = {
							seed: 'From a small seed a mighty trunk may grow', // https://www.brainyquote.com/quotes/aeschylus_398833
							call_count: 0 * 365 // ten years…
								* 8 * 60 // …of 8h of daily play…
								* 1000, // …with ~1000 random number generations/minute
						}

					let e = engine as PRNGEngine

					e.set_state(OLD_STATE)
					expect(e.get_state()).to.deep.equal(OLD_STATE)
				})
			})
		}
	})
}
