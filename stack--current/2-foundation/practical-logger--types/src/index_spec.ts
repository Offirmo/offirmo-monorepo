import { expect } from 'chai'

import * as lib from './index.js'


describe('@offirmo/practical-logger-types', function () {

	describe('types', function () {

		it('should compile with no errors', () => {
			// that's it
			expect(lib).not.to.have.any.keys
		})
	})
})
