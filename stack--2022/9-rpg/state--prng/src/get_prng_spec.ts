import { expect } from 'chai'

import { get_random } from '@offirmo/random'

import { LIB } from './consts.js'

import {
	create,
	update_use_count,
	get_prng,
	xxx_internal_reset_prng_cache,
} from './index.js'

describe(`${LIB} - get`, function() {
	beforeEach(xxx_internal_reset_prng_cache)
	const gen = get_random.generator_of.integer.between(0, 10)

	it('should return a working PRNG engine', function() {
		const state = create()

		const prng = get_prng(state)
		/*console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))
		console.log(gen(prng))*/

		expect(gen(prng), 'random 1').to.equal(3)
		expect(gen(prng), 'random 2').to.equal(5)
		expect(gen(prng), 'random 3').to.equal(10)
		expect(gen(prng), 'random 4').to.equal(10)
		expect(gen(prng), 'random 5').to.equal(4)
		expect(gen(prng), 'random 6').to.equal(0)
		expect(gen(prng), 'random 7').to.equal(6)
		expect(gen(prng), 'random 8').to.equal(9)
	})

	it('should return a repeatable PRNG engine', function() {
		let state = create()

		let prng = get_prng(state)
		expect(gen(prng), 'random 1').to.equal(3)
		expect(gen(prng), 'random 2').to.equal(5)
		expect(gen(prng), 'random 3').to.equal(10)
		state = update_use_count(state, prng)
		expect(gen(prng), 'random 4a').to.equal(10)
		expect(gen(prng), 'random 5a').to.equal(4)
		expect(gen(prng), 'random 6a').to.equal(0)

		xxx_internal_reset_prng_cache()
		prng = get_prng(state)
		expect(gen(prng), 'random 4b').to.equal(10)
		expect(gen(prng), 'random 5b').to.equal(4)
		expect(gen(prng), 'random 6b').to.equal(0)
	})
})
