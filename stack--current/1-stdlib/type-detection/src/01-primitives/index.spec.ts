import { expect } from 'chai'

import {
	isꓽobjectⵧliteral,
	isꓽnegative_zero,
	isꓽstringified_number,
} from './index.ts'


describe('@offirmo-private/type-detection -- primitives', function() {

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

	describe('isꓽstringified_number()', function() {

		it('should work', () => {
			// completely unrelated types
			expect(isꓽstringified_number(null)).to.be.false
			expect(isꓽstringified_number(undefined)).to.be.false
			expect(isꓽstringified_number(NaN)).to.be.false
			expect(isꓽstringified_number(5)).to.be.false
			expect(isꓽstringified_number('foo')).to.be.false

			// closer types
			expect(isꓽstringified_number('01')).to.be.false
			expect(isꓽstringified_number('42b')).to.be.false
			expect(isꓽstringified_number('0.10')).to.be.false
			expect(isꓽstringified_number('NaN')).to.be.false // bc NOT a number


			// final
			expect(isꓽstringified_number('42')).to.be.true
			expect(isꓽstringified_number('0.1')).to.be.true
		})
	})
})
