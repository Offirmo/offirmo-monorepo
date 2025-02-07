import { expect } from 'chai'

import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { LIB } from '../consts.ts'

import { EXAMPLE } from '../model--book-stash/__fixtures/index.ts'

import { renderꓽBookStash } from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 03 BookStash -- 03 RichText`, function() {

	describe('renderꓽBookStash()', function () {

		it('should work', () => {
			const $doc = renderꓽBookStash(EXAMPLE)
			const str = to_terminal($doc)
			console.log(str)
		})
	})
})
