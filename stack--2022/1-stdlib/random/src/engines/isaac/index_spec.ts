import { get_RNGⵧISAAC32ⵧmutating } from './index.js'
import { itᐧshouldᐧbeᐧaᐧvalidᐧengine } from '../_test_helpers.js'


describe('@offirmo/random', function() {

	describe('engines', function() {

		describe('ISAAC-32', function() {

			itᐧshouldᐧbeᐧaᐧvalidᐧengine(get_RNGⵧISAAC32ⵧmutating)


			it.only('should pass the official unit tests -- randvect', () => {

				const engine = get_RNGⵧISAAC32ⵧmutating('This is <i>not</i> the right mytext.')
				//engine.seed([1])
				//engine.seed('This is <i>not</i> the right mytext.')
				for(let i = 0; i < 10 ; ++i) {
					//console.log(engine.get_Int32().i.toString(16).padStart(8, '0'))
					console.log(toHex(engine.get_Int32().i))
				}




			})

			it('should pass the official unit tests -- randseed', () => {


			})
		})
	})
})
