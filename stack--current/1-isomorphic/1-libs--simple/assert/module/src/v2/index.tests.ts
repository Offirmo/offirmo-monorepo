import { expect } from 'chai'

import * as ǃ from './index.ts'

/////////////////////////////////////////////////

describe(`assert lib`, function() {

	it('sandbox', function() {
	})

	describe('assert()', function () {

		it('should work in simplest form', () => {
			const foo: number = 42
			expect(() => ǃ.assert(foo === 42, 'foo should eq 42')).not.to.throw()
			expect(() => ǃ.assert(foo === 43, 'foo should eq 43')).to.throw('Assertion failed: foo should eq 43!')
		})

		it('auto-create a message for all types of falsy values', () => {
			expect(() => ǃ.assert(false)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(undefined)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(null)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(0)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(-0)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(0n)).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert('')).to.throw('Assertion failed: should be true!')
			expect(() => ǃ.assert(NaN)).to.throw('Assertion failed: should be true!')
		})

		/*
		it('should work in slightly more complex form -- 1', () => {
			const foo: number = 42
			expect(() => ǃ.assert(foo).ꘌꘌꘌ(42)).not.to.throw()
			expect(() => ǃ.assert(foo).ꘌꘌꘌ(43)).to.throw()
		})

		it('should work in slightly more complex form -- 2', () => {
			const foo: number = 42
			expect(() => ǃ.assert({foo}).ꘌꘌꘌ(42)).not.to.throw()
			expect(() => ǃ.assert({foo}).ꘌꘌꘌ(43)).to.throw()
		})*/
	})

	describe('require()', function () {

		it('should work in simplest form', () => {
			const foo: number = 42
			expect(() => ǃ.require(foo === 42, 'foo should eq 42')).not.to.throw()
			expect(() => ǃ.require(foo === 43, 'foo should eq 43')).to.throw('Pre-condition failed: foo should eq 43!')
		})
	})

	describe('ensure()', function () {

		it('should work in simplest form', () => {
			const foo: number = 42
			expect(() => ǃ.ensure(foo === 42, 'foo should eq 42')).not.to.throw()
			expect(() => ǃ.ensure(foo === 43, 'foo should eq 43')).to.throw('Post-condition failed: foo should eq 43!')
		})
	})
})
