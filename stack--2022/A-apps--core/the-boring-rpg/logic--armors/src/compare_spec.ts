import { expect } from 'chai'

import { get_engine, RNGEngine } from '@offirmo/random'

import { LIB } from './consts.js'
import {
	generate_random_demo_armor,
	compare_armors_by_potential,
	get_ultimate_medium_damage_reduction,
} from './index.js'


describe(`${LIB} - compare`, function() {

	it('should sort properly by potential', () => {
		const rng = get_engine.for_unit_tests()
		const items = [
			generate_random_demo_armor(rng),
			generate_random_demo_armor(rng),
			generate_random_demo_armor(rng),
		].sort(compare_armors_by_potential)
		const [ s1, s2, s3 ] = items.map(get_ultimate_medium_damage_reduction)
		expect(s1).to.be.above(s2!)
		expect(s2).to.be.above(s3!)
	})

	// extremely rare cases, hard to compute, not even sure it's possible since quality impacts strength
	context('when potential is equal', function () {

		it('should take into account the quality')

		context('when quality is also equal', function () {

			it('should fallback to uuid')
		})
	})
})
