import { expect } from 'chai'

import { renderⵧto_text } from '@offirmo-private/rich-text-format'
import renderⵧto_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { LIB } from '../consts.ts'

import { EXAMPLE } from '../model--book-stash/__fixtures/index.ts'

import { renderꓽBookStash } from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 03 BookStash -- 03 RichText`, function() {

	describe('renderꓽBookStash()', function () {

		it('should work', () => {
			const $doc = renderꓽBookStash(EXAMPLE)
			console.log(`--- txt:`)
			console.log(renderⵧto_text($doc))
			console.log(`--- terminal:`)
			console.log(renderⵧto_terminal($doc))
		})
	})
})
