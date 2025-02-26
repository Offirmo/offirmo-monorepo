import { expect } from 'chai'
import { Enum } from 'typescript-string-enums'

import { LIB } from '../consts.ts'

import { isꓽNode, _NODE_TYPE_to_DISPLAY_MODE } from './guards.ts'
import { NodeType } from './types.ts'

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

	describe('_NODE_TYPE_to_DISPLAY_MODE', function () {

		it('should be complete', () => {

			const keys = Object.keys(_NODE_TYPE_to_DISPLAY_MODE)
			expect(keys.sort().join(','))
				.to.equal(Enum.keys(NodeType).sort().join(','))
		})
	})
})
