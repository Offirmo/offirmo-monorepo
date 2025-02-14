import { expect } from 'chai'

import { LIB } from '../consts.ts'


import {
	getꓽpage,
} from './selectors.ts'

import { BOOK } from '../__fixtures/wow-alliance-of-lordaeron/content.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- Model: Book -- selectors`, function() {

	describe('getꓽpage', function () {

		it('should work', () => {
			const result = getꓽpage(BOOK)
			console.log(result)
		})
	})
})
