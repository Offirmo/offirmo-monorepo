import { getꓽRNGⵧMathᐧrandom } from './index.js'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.js'

/////////////////////////////////////////////////

describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('Math.random()', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(getꓽRNGⵧMathᐧrandom)
		})
	})
})
