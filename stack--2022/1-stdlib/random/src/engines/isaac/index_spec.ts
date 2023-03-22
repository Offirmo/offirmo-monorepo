import { get_RNGⵧISAAC32ⵧmutating } from './index.js'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.js'


describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('ISAAC-32', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(get_RNGⵧISAAC32ⵧmutating)

			it('should pass the official unit tests -- randvec', () => {



			})

			it('should pass the official unit tests -- randseed', () => {


			})
		})
	})
})
