import { getꓽRNGⵧMathᐧrandom } from './index.ts'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.ts'

/////////////////////////////////////////////////

describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('Math.random()', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(getꓽRNGⵧMathᐧrandom)
		})
	})
})
