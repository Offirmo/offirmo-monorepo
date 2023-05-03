import { expect } from 'chai'

import {
	get_random,
	get_engine,
} from './index.js' // TODO self-ref


describe('@offirmo/random', function() {

	describe('usage', function() {

		it('should provide a convenient API -- generators -- bool', () => {

			const gen = get_random.generator_of.bool()
			const engine = get_engine.good_enough()
			let rv = gen(engine)
			expect(rv).to.be.a('boolean')
			rv = gen(engine)
			expect(rv).to.be.a('boolean')
		})

		it('should provide a convenient API -- generators -- bool -- weighted', () => {

			const gen = get_random.generator_of.bool.weighted(1.0)
			const engine = get_engine.good_enough()
			let rv = gen(engine)
			expect(rv).to.equal(true)
			rv = gen(engine)
			expect(rv).to.equal(true)
		})

		it('should provide a convenient API -- generators -- integer', () => {

			const gen = get_random.generator_of.integer.between(1, 6)
			const engine = get_engine.good_enough()
			let rv = gen(engine)
			expect(rv).to.be.a('number')
			rv = gen(engine)
			expect(rv).to.be.a('number')
		})
	})
})
