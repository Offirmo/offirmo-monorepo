import { expect } from 'chai'
import { Enum } from 'typescript-string-enums'

import { LIB } from '../consts.ts'

import { NodeType } from '../l1-types/index.ts'
import { _NODE_TYPE_to_DISPLAY_MODE } from './misc.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- internal utils`, function () {
	describe('_NODE_TYPE_to_DISPLAY_MODE', function () {
		it('should be complete', () => {
			const keys = Object.keys(_NODE_TYPE_to_DISPLAY_MODE)
			expect(keys.sort().join(',')).to.equal(Enum.keys(NodeType).sort().join(','))
		})
	})
})
