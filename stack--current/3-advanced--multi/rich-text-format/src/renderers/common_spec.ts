import { expect } from 'chai'

import { Enum } from 'typescript-string-enums'

import { LIB } from '../consts.js'
import { NodeType } from '../types/types.js'

import { NODE_TYPE_to_DISPLAY_MODE } from './common.js'

/////////////////////////////////////////////////

describe(`${LIB} -- common`, () => {

	describe('NODE_TYPE_to_DISPLAY_MODE', function () {

		it('should be complete', () => {

			const keys = Object.keys(NODE_TYPE_to_DISPLAY_MODE)
			expect(keys.sort().join(','))
				.to.equal(Enum.keys(NodeType).sort().join(','))
		})
	})
})