import { expect } from 'chai'
import * as RichText from '@offirmo-private/rich-text-format'

import { LIB } from '../consts.ts'

import {
	renderꓽcover__spine,
} from './index.ts'

import { COVERS } from '../book--model/__fixtures/index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- RichText`, function() {

	describe('renderꓽcover__spine', function () {

		it('should work', () => {
			COVERS.forEach(cover => {
				const $doc = renderꓽcover__spine(cover)
				const str = RichText.renderⵧto_text($doc)
				console.log(str)
			})
		})
	})
})
