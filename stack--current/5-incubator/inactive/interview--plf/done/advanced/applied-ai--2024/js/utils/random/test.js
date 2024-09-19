import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

/////////////////////////////////////////////////

import { getRandomIntInRange } from './index.js'

/////////////////////////////////////////////////

describe('Random utils', () => {

	describe('getRandomIntInRange()', () => {

		it('should work', () => {
			const distrib = {}
			const nb_samples = 1000
			for (let i = 0; i < nb_samples; i++) {
				const r = getRandomIntInRange(3, 7)
				distrib[r] = (distrib[r] || 0) + 1
			}

			assert.deepEqual(
				Object.keys(distrib).sort(),
				['3', '4', '5', '6', '7'],
			)
		})
	})
})
