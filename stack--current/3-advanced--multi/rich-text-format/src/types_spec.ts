import { expect } from 'chai'

import { LIB } from './consts.js'

import {
	Node,
} from './types.js'

/////////////////////////////////////////////////

describe(`${LIB} -- types`, function() {

	describe('Node', function () {

		it('should be lax with properties', () => {
			const n1: Node = {}
			const n2: Node = { $content: 'foo' }
		})

		it('should not accept extra properties', () => {
			// @ts-expect-error TS2322
			const n: Node = { foo: 42 }
		})
	})
})
