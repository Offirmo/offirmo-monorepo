import { expect } from 'chai'

import { LIB } from './consts.js'

import { isꓽNode } from './type-guards.js'

/////////////////////////////////////////////////

describe(`${LIB} -- type guards`, function() {

	describe('isꓽNode()', function () {

		it('should work -- false', () => {
			expect(isꓽNode(null)).to.be.false
			expect(isꓽNode(undefined)).to.be.false
			expect(isꓽNode({})).to.be.false
			expect(isꓽNode('foo')).to.be.false
			expect(isꓽNode(42)).to.be.false
			expect(isꓽNode({ foo: 42 })).to.be.false
		})

		it('should work -- true', () => {
			expect(isꓽNode({ $v: 1 })).to.be.true
			expect(isꓽNode({ $content: 'foo' })).to.be.true
		})
	})
})
