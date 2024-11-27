import { expect } from 'chai'

import {
	isꓽarrayⵧempty,
	isꓽobjectⵧliteral,
	isꓽnegative_zero,
	isꓽcontainerⵧempty,
	isꓽthenable
} from './index.js'


describe('@offirmo-private/type-detection', function() {

	describe('isꓽnegative_zero()', function() {

		it('should work', () => {
			// completely unrelated types
			// @ts-expect-error
			expect(isꓽnegative_zero(null)).to.be.false
			// @ts-expect-error
			expect(isꓽnegative_zero(undefined)).to.be.false
			// @ts-expect-error
			expect(isꓽnegative_zero('foo')).to.be.false
			// @ts-expect-error
			expect(isꓽnegative_zero(['foo'])).to.be.false
			// @ts-expect-error
			expect(isꓽnegative_zero({a: 1})).to.be.false

			// closer types
			expect(isꓽnegative_zero(NaN)).to.be.false
			expect(isꓽnegative_zero(5)).to.be.false
			expect(isꓽnegative_zero(0)).to.be.false

			// final
			expect(isꓽnegative_zero(-0)).to.be.true
		})
	})

	describe('isꓽarrayⵧempty()', function() {

		it('should work', () => {
			// completely unrelated types
			// @ts-expect-error
			expect(isꓽarrayⵧempty(null)).to.be.false
			// @ts-expect-error
			expect(isꓽarrayⵧempty(undefined)).to.be.false
			// @ts-expect-error
			expect(isꓽarrayⵧempty(NaN)).to.be.false
			// @ts-expect-error
			expect(isꓽarrayⵧempty(5)).to.be.false
			// @ts-expect-error
			expect(isꓽarrayⵧempty('foo')).to.be.false
			// @ts-expect-error
			expect(isꓽarrayⵧempty(new Boolean(1))).to.be.false

			// closer types
			expect(isꓽarrayⵧempty(['foo'])).to.be.false
			expect(isꓽarrayⵧempty([,])).to.be.false

			// final
			expect(isꓽarrayⵧempty([])).to.be.true
		})
	})

	describe('isꓽobjectⵧliteral()', function() {

		it('should work', () => {
			// completely unrelated types
			// @ts-expect-error
			expect(isꓽobjectⵧliteral(null)).to.be.false
			// @ts-expect-error
			expect(isꓽobjectⵧliteral(undefined)).to.be.false
			// @ts-expect-error
			expect(isꓽobjectⵧliteral(NaN)).to.be.false
			// @ts-expect-error
			expect(isꓽobjectⵧliteral(5)).to.be.false
			// @ts-expect-error
			expect(isꓽobjectⵧliteral('foo')).to.be.false


			// closer types
			expect(isꓽobjectⵧliteral(['foo'])).to.be.false
			expect(isꓽobjectⵧliteral(new Boolean(1)), 'primitive wrapper -- bool').to.be.false
			expect(isꓽobjectⵧliteral(new String('foo')), 'primitive wrapper -- string').to.be.false
			expect(isꓽobjectⵧliteral(/regex/), 'regex').to.be.false

			// final
			expect(isꓽobjectⵧliteral({})).to.be.true
			expect(isꓽobjectⵧliteral({ foo: 42 })).to.be.true
		})
	})

	describe('isꓽcontainerⵧempty()', function() {

		it('should work', () => {
			// completely unrelated types
			// @ts-expect-error
			expect(isꓽcontainerⵧempty(null)).to.be.false
			// @ts-expect-error
			expect(isꓽcontainerⵧempty(undefined)).to.be.false
			// @ts-expect-error
			expect(isꓽcontainerⵧempty(NaN)).to.be.false
			// @ts-expect-error
			expect(isꓽcontainerⵧempty(5)).to.be.false
			// @ts-expect-error
			expect(isꓽcontainerⵧempty('foo')).to.be.false


			// closer types
			expect(isꓽcontainerⵧempty(['foo']), 'non-empty array').to.be.false
			expect(isꓽcontainerⵧempty({ foo: 42 }), 'non-empty obj literal').to.be.false


			// final
			expect(isꓽcontainerⵧempty([])).to.be.true
			expect(isꓽcontainerⵧempty({})).to.be.true
		})
	})

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
