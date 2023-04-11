import { expect } from 'chai'
import { get_RNGⵧISAAC32 } from '@offirmo/random'

import {
	UUID, WithUUID,
	generate_uuid,
	xxx_test_unrandomize_element,
} from './index.js'


interface Test extends WithUUID {
	another: UUID
}


describe('@offirmo-private/uuid - utils', function() {

	describe('xxx_test_unrandomize_element()', function() {

		context('when provided a uuid prop', function() {

			it('should turn it into a fixed value', function () {

				const rng = get_RNGⵧISAAC32().seed(123)

				const out: Readonly<Test> = {
					uuid: generate_uuid({rng}),
					another: generate_uuid({rng}),
				}

				const randomized: Readonly<Test> = xxx_test_unrandomize_element(out)

				expect(randomized.uuid).not.to.equal(out.uuid)
				expect(randomized.another).to.equal(out.another)
			})
		})
	})
})
