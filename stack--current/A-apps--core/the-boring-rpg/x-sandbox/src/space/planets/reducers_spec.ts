import { expect } from 'chai'

import {
	create,
} from './reducers.js'

/////////////////////////////////////////////////

describe(`Planets`, function() {

	describe('create()', function () {

		it('should be stable and up to date', () => {
			console.log(create())
			console.log(create())
			console.log(create())
		})
	})
})
