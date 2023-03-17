import { get_RNGⵧMathᐧrandomⵧimmutable, get_RNGⵧMathᐧrandomⵧmutating } from './index.js'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.js'


describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('Math.random()', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(get_RNGⵧMathᐧrandomⵧimmutable)

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(get_RNGⵧMathᐧrandomⵧmutating)
		})
	})
})
