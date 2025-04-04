import { getꓽRNGⵧMathᐧrandom } from './index.ts'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../__fixtures/_shared.ts'

/////////////////////////////////////////////////

describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('Math.random()', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(getꓽRNGⵧMathᐧrandom)
		})
	})
})
