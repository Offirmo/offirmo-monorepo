import { get_RNGⵧISAACⵧmutating } from './index.js'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.js'


describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('ISAAC', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(get_RNGⵧISAACⵧmutating)

			it('should pass the official unit tests -- randvec', () => {



			})

			it('should pass the official unit tests -- randseed', () => {


			})
		})
	})
})
