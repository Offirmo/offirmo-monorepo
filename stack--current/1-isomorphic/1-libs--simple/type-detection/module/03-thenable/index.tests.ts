import { expect } from 'chai'

import {
	isꓽthenable
} from './index.ts'


describe('@monorepo-private/type-detection -- thenable', function() {

	describe('isꓽthenable()', function() {

		it('should work', () => {
			// completely unrelated types
			expect(isꓽthenable(null)).to.be.false
			expect(isꓽthenable(undefined)).to.be.false
			expect(isꓽthenable(NaN)).to.be.false
			expect(isꓽthenable(5)).to.be.false
			expect(isꓽthenable('foo')).to.be.false

			// closer types
			expect(isꓽthenable([])).to.be.false
			expect(isꓽthenable({ foo: 42 })).to.be.false

			// final
			expect(isꓽthenable({ then: () => 42})).to.be.true
			expect(isꓽthenable(Promise.resolve(42))).to.be.true
		})
	})
})
