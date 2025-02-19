import { expect } from 'chai'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { LIB } from '../consts.ts'

import {
	renderꓽcover__spine,
} from './index.ts'

import { COVERS } from '../__fixtures/index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 01 Book -- 04 RichText`, function() {

	describe('renderꓽcover__spine', function () {

		it('should work', () => {
			COVERS.forEach(cover => {
				const $doc = renderꓽcover__spine(cover)
				console.log(to_terminal($doc))

				const str = RichText.renderⵧto_text($doc)
				expect(str).to.contain(cover.title)
			})
		})
	})
})
